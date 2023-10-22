import React, { useEffect } from "react";
import { useState } from "react";
import { getRoles } from "../../redux/roles/actions";
import TextInput from "../../components/TextInput";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserErrorAlert, setUserSuccessAlert } from "../../redux/user/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Error from "./Alert";
import { setError } from "../../redux/error/actions";



const AddNewUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        first_name: 'Arifuzzaman',
        last_name: 'Shoab',
        email: 'shoab@asl.aero',
        password: 'ghdrghdfh44',
        phone: '+8801687192510',
        groups: null,
        is_Active: null,
    });
    const [errors, setErrors] = useState('');
    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);
    const success = useSelector((state) => state.user.success);
    const create_users = useSelector((state) => state.user.create_users);
    const [disable, setDisable] = useState(false);


    const navigate = useNavigate();

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
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const excludeValidationFields = ['groups', 'is_Active'];

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const field in formData) {
            if (!excludeValidationFields.includes(field) && !formData[field]?.toString().trim()) {
                setErrors(`${field.replace('_', ' ')} field is required`);
                return;
            }
        }
   
        dispatch(addUser(formData));
        dispatch(setError(error[1].msg));

        navigate('/app/user')
    }



    return (
        <>
            <div className="max-w-7xl  w-11/12 py-4  mx-auto mt-8 ">


                {errors && (
                    <Error
                        error={errors}
                        onClose={() => dispatch(setUserErrorAlert(""))}
                    // Dispatch an action to clear the error
                    />
                )}

            </div>

            <div className="max-w-7xl  w-11/12 py-4  bg-white mx-auto  border border-red-200 rounded">
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
                            onChange={(event) => handleInputChange(event)} />
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
                            onChange={(event) => handleInputChange(event)} />
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
                            onChange={(event) => handleInputChange(event)} />
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
                            onChange={(event) => handleInputChange(event)} />
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
                        <label htmlFor="checkbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                            Active
                        </label>
                        <input type="checkbox" name="is_Active" checked={formData.is_Active} onChange={(event) => handleCheckboxChange(event)} />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded mr-2">Save</button>



                        <Link to='/app/user'><button className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewUser;