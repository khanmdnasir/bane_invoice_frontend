
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Select from 'react-select'
import { useDispatch } from "react-redux";
import { getRoles } from "../../redux/roles/actions";
import Image from '../../assets/banelogo.png'
import { updateUser } from "../../redux/user/actions";


const UserDetailsPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFormData, setEditedFormData] = useState('');
    const [errors, setErrors] = useState('');
    const location = useLocation();
    const { state } = location;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));


    useEffect(() => {
        setEditedFormData(state.user_details);
    }, [state]);

    const Handlefalse = () => {
        setIsEditing(false);
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSaveClick = (e) => {
        e.preventDefault();
        console.log(editedFormData);
        dispatch(updateUser(editedFormData));
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
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setEditedFormData({
            ...setEditedFormData,
            [name]: checked,
        });
    };

    const handleImageChange = (event) => {
        console.log('event:', event); 
        const file = event.target.files[0];
        console.log('data:', file);
        if (file) {
            const data = {
                ...editedFormData,
                profile_image:  URL.createObjectURL(file),
            };

            setEditedFormData(data);
        }
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };




    return (
        <>
            <div className="pb-20">


                <div className="max-w-7xl w-11/12 bg-white mx-auto mt-20 border border-red-200 rounded">
                    <div className="text-right mx-auto  text-white w-11/12  sm:w-1/2">
                        <button className="my-4 py-1 px-6 bg-gray-400 text-white rounded mr-1" onClick={handleEditClick}>Edit</button>
                    </div>
                    <form className="py-4 w-11/12 sm:w-1/2   mx-auto mb-8 h-full" onSubmit={(e) => handleSaveClick(e)}>
                        <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
                            <h1 className="text-xl font-bold">Client Details</h1>
                            <div className=" bg-gray-400 rounded-full  items-center" >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={(event) => handleImageChange(event)}
                                    disabled={!isEditing}
                                />
                                <img
                                    src={editedFormData.profile_image || Image}
                                    className={`items-center w-20 h-20 cursor-pointer p-2 rounded-full bg-gray-500 ${isEditing && 'hover:bg-gray-300'}`}
                                    alt="Image preview"
                                    onClick={(event) => handleImageClick(event)}
                                />
                            </div>

                        </div>
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
                                    error={errors}

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
                        <div className=" mt-4 sm:flex">
                            <label htmlFor="checkbox" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Active
                            </label>
                            <input type="checkbox" name="is_Active" className="ml-2" value={editedFormData.is_Active} disabled={!isEditing} onChange={(event) => handleCheckboxChange(event)} />
                        </div>
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