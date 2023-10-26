
import React, { useState, useEffect } from "react";
import TextInput from "../../components/TextInput";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../redux/roles/actions";
import Image from '../../assets/images.jpeg'
import { updateUser } from "../../redux/user/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const UserDetailsPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFormData, setEditedFormData] = useState('');
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    const location = useLocation();
    const { state } = location;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));
    const navigate = useNavigate();

    useEffect(() => {
        setEditedFormData(state.user_details);
    }, [state]);

    const Handlefalse = () => {
        setIsEditing(false);
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };


    const isValidEmail = (email) => {
        return email.includes('@');
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        const newErrors = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
        };

        if (!editedFormData.first_name) {
            newErrors.first_name = 'First name is required';
        }
        if (!editedFormData.last_name) {
            newErrors.last_name = 'Last name is required';
        }

        if (!editedFormData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(editedFormData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!editedFormData.phone) {
            newErrors.phone = 'Phone number is required';
        }
        setErrors(newErrors);
        if (!newErrors.first_name && !newErrors.last_name && !newErrors.email && !newErrors.phone) {
            dispatch(updateUser(editedFormData));
            navigate('/app/user');
        }  
    };
    const clearError = (fieldName) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: '',
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedFormData({
            ...editedFormData,
            [name]: value,
        });
    };
    useEffect(() => {
        dispatch(getRoles(null, null));
    }, [])

    const handleRoleChange = (selectedOption) => {

        setEditedFormData({
            ...editedFormData,
            groups: selectedOption,
        });
    };



    return (
        <>
            <div className="pb-20">


                <div className="max-w-7xl w-11/12 bg-white mx-auto mt-20 border border-red-200 rounded">
                    <div className="text-right mx-auto   w-11/12  sm:w-1/2">
                        <div className="flex justify-between items-center mb-4 px-4  py-4 sm:px-0">
                            <div className="flex self-center">
                                <h1 className="text-xl font-bold">Client Details</h1>
                                <span className="cursor-pointer h-4 w-4 ml-4 text-xs font-thin"><FontAwesomeIcon onClick={handleEditClick} icon={faEdit} /></span>
                            </div>
                            <div className=" border border-light_blue rounded-full  items-center" >
                                <img
                                    src={editedFormData.profile_image || Image}
                                    className={`items-center w-20 h-20 cursor-pointer p-1 rounded-full`}
                                    alt="Image preview"
                                />
                            </div>

                        </div>
                    </div>
                    <form className="py-4 w-11/12 sm:w-1/2   mx-auto mb-8 h-full" onSubmit={(e) => handleSaveClick(e)}>
                        <hr />

                        <div className="py-4 sm:flex justify-between">
                            <label htmlFor="email" className="block text-sm sm:w-1/2 font-medium leading-6 text-gray-900 ">
                                First Name
                            </label>
                            <div className="sm:w-1/2">
                                <TextInput
                                    type="text"
                                    name="first_name"
                                    value={editedFormData.first_name}
                                    onChange={(event) => handleInputChange(event)}
                                    disabled={!isEditing}
                                    error={errors.first_name}
                                    onFocus={() => clearError("first_name")}

                                />
                            </div>
                        </div>

                        <div className="py-4 sm:flex">
                            <label htmlFor="email" className="block w-1/2 text-sm font-medium leading-6 text-gray-900 ">
                                Last Name
                            </label>
                            <div className="sm:w-1/2">
                                <TextInput
                                    type="text"
                                    name="last_name"
                                    value={editedFormData.last_name}
                                    onChange={(event) => handleInputChange(event)}
                                    disabled={!isEditing}
                                    error={errors.last_name}
                                    onFocus={() => clearError("last_name")}
                                />
                            </div>
                        </div>
                        <div className="py-4 sm:flex">
                            <label htmlFor="email" className="block w-1/2 text-sm font-medium leading-6 text-gray-900 ">
                                E-mail
                            </label>
                            <div className="sm:w-1/2">
                                <TextInput
                                    type="text"
                                    name="email"
                                    value={editedFormData.email}
                                    onChange={(event) => handleInputChange(event)}
                                    disabled={!isEditing}
                                    error={errors.email}
                                    onFocus={() => clearError("email")}
                                />
                            </div>
                        </div>
                        <div className="py-4 sm:flex">
                            <label htmlFor="phone" className="block w-1/2 text-sm font-medium leading-6 text-gray-900 ">
                                Phone
                            </label>
                            <div className="sm:w-1/2">
                                <TextInput
                                    type="text"
                                    name="phone"
                                    value={editedFormData.phone}
                                    onChange={(event) => handleInputChange(event)}
                                    disabled={!isEditing}
                                    error={errors.phone}
                                    onFocus={() => clearError("phone")}
                                />
                            </div>
                        </div>
                        <div className="py-4 sm:flex">
                            <label htmlFor="joining_date" className="block w-1/2 text-sm font-medium leading-6 text-gray-900 ">
                                Joining Date
                            </label>
                            <div className="sm:w-1/2">
                                <TextInput
                                    type="date"
                                    name="date_joined"
                                    value={editedFormData.date_joined ? new Date(editedFormData.date_joined).toISOString().split('T')[0] : ''}
                                    onChange={(event) => handleInputChange(event)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className=" mt-4 sm:flex">
                            <label htmlFor="role" className="block w-1/2 text-sm font-medium leading-6 text-gray-900 ">
                                Role
                            </label>
                            <div className="sm:w-1/2">
                                <Select
                                    options={roleOptions}
                                    value={editedFormData.groups && Array.isArray(editedFormData.groups)
                                        ? editedFormData.groups.map((role) => ({ value: role.id, label: role.name }))
                                        : editedFormData.groups}
                                    className="border-0"
                                    name="groups"
                                    onChange={(event) => handleRoleChange(event)}
                                    isDisabled={!isEditing}

                                />
                            </div>
                        </div>
                        {!isEditing &&
                            <div className=" mt-4 flex">
                                <h6 className="mr-2 text-sm font-medium">Active Statue</h6>
                                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                    {editedFormData.is_active ? "Active" : "Deactived"}
                                </span>

                            </div>}
                        {
                            isEditing &&
                            <div className="mt-4 flex">
                                <label htmlFor="activeCheckbox" className="block text-sm font-medium px-2 text-gray-900 ">
                                    Active
                                </label>
                                <input
                                    type="checkbox"
                                    name="is_Active"
                                    checked={editedFormData.is_active}
                                    onChange={(event) => setEditedFormData({ ...editedFormData, is_active: event.target.checked })}
                                />
                                <label htmlFor="deactiveCheckbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                                    Deactive
                                </label>
                                <input
                                    type="checkbox"
                                    name="is_Active"
                                    checked={!editedFormData.is_active}
                                    onChange={(event) => setEditedFormData({ ...editedFormData, is_active: !event.target.checked })}
                                />
                            </div>
                        }
                        <div className="text-right space-y-10">
                            {isEditing && <><button className="px-8 py-1.5 bg-strong_blue text-white rounded mr-1" type="submit">Save</button>
                                <button className="px-8 py-1.5 bg-gray-400 text-white rounded mr-1" type="submit" onClick={Handlefalse} >Cancel</button></>}
                        </div>
                    </form>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetailsPage;