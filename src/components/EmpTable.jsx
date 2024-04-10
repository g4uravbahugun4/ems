"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"; 
function EmpTable() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        console.log(localStorage.getItem("employees"))
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(storedEmployees);
    }, []);

    

    const deleteEmp=(empId)=>{
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        const updatedEmployees = storedEmployees.filter(emp=>emp.empId!==empId);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
    }
  return (
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
              {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{employee.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{employee.bloodGroup}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <ul>
                              {employee.addresses.map((address, addrIndex) => (
                                  <li className='py-2' key={addrIndex}>{address}</li>
                              ))}
                          </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <ul>
                              {employee.contactNumbers.map((number, numIndex) => (
                                  <li className='py-2' key={numIndex}>{number}</li>
                              ))}
                          </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><Link href={`/edit/${employee.empId}`}  className="text-blue-500 hover:text-blue-700" 
                      >Edit</Link></td>
                      <td className="px-6 py-4 whitespace-nowrap"><button onClick={deleteEmp(employee.empId)} className="text-red-500 hover:text-red-700" >Delete</button></td>
                  </tr>
              ))}
          </tbody>
      </table>
  )
}

export default EmpTable