import React from 'react'

function EditForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        department: '',
        bloodGroup: '',
        address: '',
        contactNumbers: [''],
        addresses: ['']
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddContact = () => {
        setFormData(prevState => ({
            ...prevState,
            contactNumbers: [...prevState.contactNumbers, '']
        }));
    };

    const handleAddAddress = () => {
        setFormData(prevState => ({
            ...prevState,
            addresses: [...prevState.addresses, '']
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



    const handleSubmit = e => {
        e.preventDefault();
        addEmployee(formData);
    };

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
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' name='age' value={formData.age} onChange={handleChange} placeholder='Age' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='department' className='block text-gray-700 text-sm font-bold mb-2'>Department</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' type='text' name='department' value={formData.department} onChange={handleChange} placeholder='Department' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Blood Group</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ' type='text' name='bloodGroup' value={formData.bloodGroup} onChange={handleChange} placeholder='Blood Group' required />
                </div>

                {/* Contact Numbers */}
                <div className='mb-4 '>
                    <div htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Contacts</div>

                    {formData.contactNumbers.map((number, index) => (
                        <div key={index} className='mb-4 flex'>
                            <input className=' border rounded py-2 px-3 text-gray-700 leading-tight   mr-2' type='text' value={number} onChange={e => handleChangeContact(e, index)} placeholder='Contact Number' />
                            {index === formData.contactNumbers.length - 1 && <button className='py-1 px-3 rounded bg-green-600 text-white cursor-pointer' type='button' onClick={handleAddContact}>Add Contact</button>}
                        </div>
                    ))}
                </div>

                <div className='mb-4 '>
                    <div htmlFor='bloodGroup' className='block text-gray-700 text-sm font-bold mb-2'>Addresses</div>

                    {/* Addresses */}
                    {formData.addresses.map((address, index) => (
                        <div key={index} className='mb-4 flex'>
                            <input className=' border rounded py-2 px-3 text-gray-700 leading-tight mr-2' type='text' value={address} onChange={e => handleChangeAddress(e, index)} placeholder='Address' />
                            {index === formData.addresses.length - 1 && <button className='py-1 px-3 rounded bg-green-600 text-white cursor-pointer' type='button' onClick={handleAddAddress}>Add Address</button>}
                        </div>
                    ))}
                </div>

                <button className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ' type='submit'>Submit</button>
            </form>
        </main>
    );
}

export default EditForm