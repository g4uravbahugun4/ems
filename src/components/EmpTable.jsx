"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"; 
function EmpTable() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
        if (storedEmployees.length == 0) {
            
            // Populate the table with 20 records by default if it's empty
            const defaultEmployees = Array.from({ length: 20 }, (_, index) => ({
                empId: index + 1,
                name: `Employee ${index + 1}`,
                age: 30 + index,
                department: 'IT',
                bloodGroup: 'O+',
                addresses: ['Address 1', 'Address 2'],
                contactNumbers: ['12345678'],
            }));
            localStorage.setItem('employees', JSON.stringify(defaultEmployees));
            setEmployees(defaultEmployees);
        }
    }, []);


 

    

    const deleteEmp=(empId)=>{
        const storedEmployees = JSON.parse(localStorage.getItem("employees"));
        const updatedEmployees = storedEmployees.filter(emp=>emp.empId!==empId);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pno) => setCurrentPage(pno);
  return (
    <div className='mt-4'>
      <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Numbers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-slate-800">
                      <td className="px-6 py-4 ">{employee.name}</td>
                      <td className="px-6 py-4 ">{employee.age}</td>
                      <td className="px-6 py-4 ">{employee.department}</td>
                      <td className="px-6 py-4 ">{employee.bloodGroup}</td>
                      <td className="px-6 py-4 ">
                          <ul>
                              {employee.addresses.map((address, addrIndex) => (
                                  <li className='py-2' key={addrIndex}>{address}</li>
                              ))}
                          </ul>
                      </td>
                      <td className="px-6 py-4 ">
                          <ul>
                              {employee.contactNumbers.map((number, numIndex) => (
                                  <li className='py-2' key={numIndex}>{number}</li>
                              ))}
                          </ul>
                      </td>
                      <td className="px-6 py-4 "><Link href={`/edit/${employee.empId}`}  className="text-blue-500 hover:text-blue-700" 
                      >Edit</Link></td>
                      <td className="px-6 py-4 "><button onClick={()=>{deleteEmp(employee.empId)}} className="text-red-500 hover:text-red-700" >Delete</button></td>
                  </tr>
              ))}
          </tbody>
      </table>
      <div className="flex justify-center mt-4">
        
        {/* creating an array of length  total no of emps/ records at each page and then second argumen as a maping function to be able to show pagination buttons */}

                {Array.from({ length: Math.ceil(employees.length / recordsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
    </div>
  )
}

export default EmpTable