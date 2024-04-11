"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
const NewEmpForm = () => {
   const router=useRouter()
    const [formData, setFormData] = useState({
        empId:'',
        name: '',
        age: '',
        department: '',
        bloodGroup: '',
        contactNumbers: [''], //because we can have multiple contact numbers and addresses
        addresses: ['']  //because we can have multiple contact numbers and addresses
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddContact = () => {
        setFormData(prevState => ({
            ...prevState,
            contactNumbers: [...prevState.contactNumbers, '']   //when someone clicks on add Contact , it appends one more value as empty strings in contactNumbers array due to which length of contactNumbers array increases and we see one more input which is empty
        }));
    };

    const handleAddAddress = () => {
        setFormData(prevState => ({
            ...prevState,
            addresses: [...prevState.addresses, '']  //when someone clicks on add address , it appends one more value as empty strings in addresses array due to which length of adress array increases and we see one more input which is empty
        }));
    };

    const handleChangeContact = (e, index) => {
        const { value } = e.target;
        const updatedContacts = [...formData.contactNumbers];
        updatedContacts[index] = value;
        setFormData(prevState => ({ ...prevState, contactNumbers: updatedContacts }));
    };

    const handleChangeAddress = (e, index) => {
        const { value } = e.target;
        const updatedAddresses = [...formData.addresses];
        updatedAddresses[index] = value;  
        setFormData(prevState => ({ ...prevState, addresses: updatedAddresses }));
       
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmpId = uuidv4();
        const employeeData = { ...formData, empId: newEmpId };  //adding a unique id to each employee before adding it to local storage to be able to retrive it individually later
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        storedEmployees.push(employeeData);
        localStorage.setItem('employees', JSON.stringify(storedEmployees));
        setFormData({
            empId: '',
            name: '',
            age: '',
            department: '',
            bloodGroup: '',
            contactNumbers: [''],
            addresses: ['']
        })
        router.push('/')
        
        }
    
    return (
        <main className=' mx-auto w-fit p-4'>
            <h1 className='text-black text-center text-xl pt-10'>New Employee Registration</h1>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input className=' border rounded w-full py-2 px-3 text-gray-700 leading-tight ' type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='age' className='block text-gray-700 text-sm font-bold mb-2'>Age</label>
                    <input className='shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' name='age' value={formData.age} onChange={handleChange} placeholder='Age' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='department' className='block text-gray-700 text-sm font-bold mb-2'>Department</label>
                    <input className='shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' name='department' value={formData.department} onChange={handleChange} placeholder='Department' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Blood Group</label>
                    <input className='shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight ' type='text' name='bloodGroup' value={formData.bloodGroup} onChange={handleChange} placeholder='Blood Group' required />
                </div>

        
            {/* Contact Numbers */}
                <div  className='mb-4 '>
                    <div htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Contacts</div>

                {formData.contactNumbers.map((number, index) => (
                    <div key={index} className='mb-4 flex'>
                        <input className=' border rounded py-2 px-3 text-gray-700 leading-tight   mr-2' type='text' value={number} 
                        onChange={e => handleChangeContact(e, index)} 
                        //We pass the index too so that we can manipulate that specific contact number from the whole array of contactNumbers  
                        placeholder='Contact Number' />  
                       </div>
                ))}
                <button className='py-1 px-3 rounded bg-green-600 text-white cursor-pointer' type='button' onClick={handleAddContact}>Add Contact</button>
                </div>

                {/* Addresses */}
                <div  className='mb-4 '>
                    <div htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Addresses</div>

                {formData.addresses.map((address, index) => (
                    <div key={index} className='mb-4 flex'>
                        <input className=' border rounded py-2 px-3 text-gray-700 leading-tight mr-2' type='text' value={address} 
                        onChange={e => handleChangeAddress(e, index)} 
                    //We pass the index too so that we can manipulate that specific address from the whole array of addresses   
                        placeholder='Address' />
                    </div>
                ))}
                 <button className='py-1 px-3 rounded bg-green-600 text-white cursor-pointer' type='button' onClick={handleAddAddress}>Add Address</button>
                </div>

                <button className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ' type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default NewEmpForm;
