
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Select from 'react-select'
import { useDispatch } from "react-redux";
import { getRoles } from "../../redux/roles/actions";
import Image from '../../assets/banelogo.png'

const UserDetailsPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFormData, setEditedFormData] = useState('');
    console.log(editedFormData.groups);
    const location = useLocation();
    const { state } = location;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.role.roles);
    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));

    console.log(roles);
    useEffect(() => {
        setEditedFormData(state.user_details);
    }, [state]);

    const Handlefalse = () => {
        setIsEditing(false);
    }
    console.log(editedFormData)
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(user.user_details.first_name);
    };


    const handleSaveClick = (e) => {
        e.preventDefault();
        console.log(editedFormData);
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
    console.log("Form Data:", editedFormData.profile_image);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setEditedFormData((prevData) => ({
                    ...prevData,
                    profile_image: reader.result,
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {

        document.getElementById('fileInput').click();
    };


    // console.log("Updated Option:",UpdatedValue);

    return (
        <>
            <div className="pb-20">


                <div className="max-w-7xl w-11/12 bg-white mx-auto mt-20 border border-red-200 rounded">
                    <div className="text-right mx-auto  text-white w-1/2">
                        <button className="my-4 px-3 py-2 bg-gray-500 rounded" onClick={handleEditClick}>Edit</button>
                    </div>
                    <form className="py-4 w-1/2  mx-auto  h-full" onSubmit={(e) => handleSaveClick(e)}>
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">Client Details</h1>
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
                                    className={`items-center w-24 h-24 cursor-pointer p-2 rounded-full bg-gray-500 ${isEditing && 'hover:bg-gray-300'}`}
                                    alt="Profile"
                                    onClick={(event) => handleImageClick(event)}
                                />
                            </div>
                        </div>


                        <div className="py-4">
                            <hr className="py-2" />
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                                First Name
                            </label>
                            <TextInput
                                type="text"
                                name="first_name"
                                value={editedFormData.first_name} element select
                                onChange={(event) => handleInputChange(event)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="py-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Last Name
                            </label>
                            <TextInput
                                type="text"
                                name="last_name"
                                value={editedFormData.last_name}
                                onChange={(event) => handleInputChange(event)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="py-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                                E-mail
                            </label>
                            <TextInput
                                type="text"
                                name="email"
                                value={editedFormData.email}
                                onChange={(event) => handleInputChange(event)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="py-4">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Phone
                            </label>
                            <TextInput
                                type="text"
                                name="phone"
                                value={editedFormData.phone}
                                onChange={(event) => handleInputChange(event)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="py-4">
                            <label htmlFor="joining_date" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Joining Date
                            </label>
                            <TextInput
                                type="date"
                                name="date_joined"
                                value={editedFormData.date_joined ? new Date(editedFormData.date_joined).toISOString().split('T')[0] : ''}
                                onChange={(event) => handleInputChange(event)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className=" mt-4">
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Role
                            </label>
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
                        <div className=" mt-4 flex">
                            <label htmlFor="checkbox" className="block text-sm font-medium leading-6 text-gray-900 px-2">
                             Active
                            </label>
                            <input type="checkbox" name="is_Active" value={editedFormData.is_Active} disabled={!isEditing} onChange={(event) => handleCheckboxChange(event)} />
                        </div>
                        {isEditing && <><button className="px-3 py-2 bg-gray-400 rounded outline-none border-0 mr-2" type="submit">Save</button>
                            <button className="px-3 py-2 bg-gray-400 rounded outline-none border-0" type="submit" onClick={Handlefalse} >Cancel</button></>}
                    </form>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetailsPage;