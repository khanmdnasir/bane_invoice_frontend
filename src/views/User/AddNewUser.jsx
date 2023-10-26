import React, { useEffect } from "react";
import { useState } from "react";
import { getRoles } from "../../redux/roles/actions";
import TextInput from "../../components/TextInput";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserErrorAlert, setUserSuccessAlert } from "../../redux/user/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const AddNewUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        first_name: 'Arifuzzaman',
        last_name: 'Shoab',
        email: 'shoab@asl.aero',
        password: 'ghdrghdfh44',
        phone: '+8801687192510',
        groups: null,
        is_active: Boolean,
    });
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });

    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));


    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return email.includes('@');
    };

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

    const clearError = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
        };

        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
        }
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        if (!newErrors.first_name && !newErrors.last_name && !newErrors.email && !newErrors.password && !newErrors.phone) {
            console.log(formData);
            dispatch(addUser(formData));
            navigate('/app/user');
        }

    }

    return (
        <>
            <div className="max-w-7xl  h-full w-11/12 py-4 mt-8 bg-white mx-auto  border border-red-200 rounded">
                <form className="md:w-2/5 w-11/12 mx-auto" onSubmit={(e) => handleSubmit(e)}>
                    <div className="px-4">
                        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900 ">
                            First Name
                        </label>
                        <TextInput
                            type="text"
                            name="first_name"
                            placeholder="Enter your E-mail"
                            value={formData.first_name}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.first_name}
                            onFocus={() => clearError("first_name")}
                        />
                    </div>
                    <div className="px-4 mt-4">
                        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900 ">
                            Last Name
                        </label>
                        <TextInput
                            type="text"
                            name="last_name"
                            placeholder="Enter your E-mail"
                            value={formData.last_name}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.last_name}
                            onFocus={() => clearError("last_name")} />

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
                            onChange={(event) => handleInputChange(event)}
                            error={errors.email}
                            onFocus={() => clearError("email")} />
                    </div>
                    <div className="px-4 mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                            Password
                        </label>
                        <TextInput
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.password}
                            onFocus={() => clearError("password")} />
                    </div>
                    <div className="px-4 mt-4">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 ">
                            Phone
                        </label>
                        <TextInput
                            type="text"
                            name="phone"
                            placeholder="Enter your Phone Number"
                            value={formData.phone}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.phone}
                            onFocus={() => clearError("phone")} />
                    </div>
                    <div className="px-4 mt-4">
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 ">
                            Role
                        </label>
                        <Select options={roleOptions} className="border-0"
                            name="role"
                            onChange={(event) => handleRoleChange(event)} />
                    </div>
                    <div className="px-4 mt-4 flex">
                        <label htmlFor="activeCheckbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                            Active
                        </label>
                        <input
                            type="checkbox"
                            name="is_Active"
                            checked={formData.is_active}
                            
                            onChange={(event) => setFormData({ ...formData, is_active: event.target.checked })}
                        />
                        <label htmlFor="deactiveCheckbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                            Deactive
                        </label>
                        <input
                            type="checkbox"
                            name="is_Active"
                            checked={!formData.is_active}
                            onChange={(event) => setFormData({ ...formData, is_active: !event.target.checked })}
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-8 py-1.5 bg-strong_blue text-white rounded mr-1">Save</button>
                        <Link to='/app/user'><button className="px-6 py-1.5 bg-gray-400 text-white ml-1 rounded">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewUser;