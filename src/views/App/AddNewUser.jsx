import React, { useEffect } from "react";
import { useState } from "react";
import { getRoles } from "../../redux/roles/actions";
import TextInput from "../../components/TextInput";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/user/actions";

const AddNewUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', phone: '', groups: null, is_Active: null });
    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));

    useEffect(() => {
        dispatch(getRoles(null, null));
    }, [])
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleRoleChange = (selectedOption) => {
        setFormData({
            ...formData,
            groups: selectedOption.value,
        });
    };
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
    }





    return (
        <div className="max-w-7xl  w-11/12 py-4  bg-white mx-auto my-20 border border-red-200 rounded">
            <form className="w-2/5 mx-auto" onSubmit={(e) => handleSubmit(e)}>
                <div className="px-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        First Name
                    </label>
                    <TextInput
                        type="text"
                        name="first_name"
                        placeholder="Enter your E-mail"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="px-4 mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Last Name
                    </label>
                    <TextInput
                        type="text"
                        name="last_name"
                        placeholder="Enter your E-mail"
                        value={formData.last_name}
                        onChange={handleInputChange} />
                </div>
                <div className="px-4 mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Email Address
                    </label>
                    <TextInput
                        type="email"
                        name="email"
                        placeholder="Enter your E-mail"
                        value={formData.email}
                        onChange={handleInputChange} />
                </div>
                <div className="px-4 mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Password
                    </label>
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={handleInputChange} />
                </div>
                <div className="px-4 mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Phone
                    </label>
                    <TextInput
                        type="text"
                        name="phone"
                        placeholder="Enter your Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange} />
                </div>
                <div className="px-4 mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Role
                    </label>
                    <Select options={roleOptions} className="border-0"
                        name="role"
                        onChange={handleRoleChange} />
                </div>
                <div className="px-4 mt-4 flex">
                    <input type="checkbox" name="is_Active" checked={formData.is_Active} onChange={handleCheckboxChange} />
                    <label htmlFor="checkbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                        Is Active
                    </label>
                </div>
                <div className="text-right">
                    <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded mr-2">Save</button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewUser;