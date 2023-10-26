import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/actions";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const User = () => {
    const path = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewButton, setViewButton] = useState('')
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.users);


    useEffect(() => {
        dispatch(getUser());
    }, []);

    const timeStampToDate = (timestamp) => {
        let dateObject = new Date(timestamp);
        return `${dateObject.getDate()}-${dateObject.getMonth() + 1
            }-${dateObject.getFullYear()}`;
    };

    const timeStampToMinute = (minute) => {
        let getMin = new Date(minute);
        let curMin = new Date();
        let last_login_time = curMin.getMinutes() - getMin.getMinutes();
        return last_login_time;
    }
    // Function to handle changes in the search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the users based on the search query
    const filteredUsers = user.filter((user, key) =>
        `$ ${user.first_name} ${user.last_name} ${user.email} ${user.groups[0]?.name} ${user.is_active} ${user.name} ${user.phone}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {
                path.pathname === "/app/user" ?
                    <div className="py-10">
                        <div className="max-w-7xl w-11/12 bg-white mx-auto  border border-red-200 rounded">
                            <div className="">
                                <div className="py-4 px-4 flex justify-between  ">
                                    <span className="text-15 font-semibold mr-4 ">Current Users {user.length}</span>
                                    <Link to='add_new_user'>
                                        <button className="text-white bg-spanish_green p-2 rounded text-13">Add New User</button>
                                    </Link>
                                </div>
                                <hr className="mb-2" />
                                <div className="px-4 mb-4 ">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        className=" w-full hover:outline-none  focus:outline-none py-2 bg-blue-300 bg-light_blue rounded pl-4"
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            {filteredUsers.length === 0 ? (
                                <div className="text-center py-4">
                                    No user Found
                                </div>
                            ) : (
                                filteredUsers.map((item) => {

                                    return (
                                        <div className="shadow-border" key={item.id}>
                                            <div className="p-2 h-20 sm:h-16  sm:flex justify-between">
                                                <div className="flex px-2 ">
                                                    <div className=" ">
                                                        <div className="text-black font-semibold bg-plum md:h-12 md:w-12  h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-4 relative">
                                                            <span className=" relative top-1 left-2 sm:top-2 md:top-3 md:left-3.5 text-xs sm:text-base md:text-15">
                                                                {item.first_name.split(" ").map((word, index) => (
                                                                    <span key={index}>
                                                                        {word.charAt(0).toUpperCase()}
                                                                    </span>
                                                                ))}
                                                                {item.last_name.split(" ").map((word, index) => (
                                                                    <span key={index}>
                                                                        {word.charAt(0).toUpperCase()}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="self-center ">
                                                        <ul className="flex " >
                                                            <li className="font-semibold text-xs sm:text-base md:text-15 mr-3">
                                                                <h5>
                                                                    {item.first_name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                                                    {" " + item.last_name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                                                </h5>
                                                            </li>
                                                            <li className="text-xs sm:text-base md:text-15">
                                                                <h6>{item.email}</h6>
                                                            </li>
                                                        </ul>

                                                        <ul className="flex font-normal" >

                                                            <li className="text-xs pt-1 sm:pt-0 sm:text-base md:text-13 mr-2"><h6>{item?.groups[0]?.name &&
                                                                item.groups[0].name
                                                                    .split(" ")
                                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(" ")}</h6></li>
                                                            <li>
                                                                <h6>{item.name}</h6>
                                                            </li>
                                                            <li className="text-xs sm:text-base md:text-13 mr-2 pt-1.5 sm:pt-0" >
                                                                <h6>{item.phone}</h6>
                                                            </li>
                                                            <li className="text-13 pt-1 mr-1">
                                                                <h6>{timeStampToDate(item.date_joined)}</h6>
                                                            </li>   

                                                            <li >
                                                                <h6 className={item.is_active? `bg-green-100 text-green-800 text-xs font-normal mr-2 px-2 py-1 rounded dark:bg-green-900 dark:text-green-300`: `bg-red-100 text-red-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}>{item.is_active ? "Active" : "Deactived"}</h6>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="self-center flex px-8 justify-between text-xs sm:text-base md:text-15 text-blue_charcoal ml-6 sm:ml-0">
                                                    <h6 >
                                                        Logged in {timeStampToMinute(item.last_login === null ? "0" : item.last_login)}
                                                        {" " + "minutes ago"}
                                                    </h6>
                                                    <div className="">
                                                        <span className="align-baseline ml-2 absolute">
                                                            <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setViewButton(item.id)}  />
                                                            {viewButton === item.id ?
                                                                <div className="relative bottom-1 right-3 border bg-white rounded text-black">
                                                                    <Link to='/app/user/user_details'
                                                                        state={{ "user_details": item }}
                                                                    >
                                                                        <button className="px-4">View</button>
                                                                    </Link>

                                                                </div> : ''}
                                                        </span>

                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                    );
                                })
                            )}
                        </div>
                    </div> : <Outlet />
            }
        </>

    )
}

export default User;