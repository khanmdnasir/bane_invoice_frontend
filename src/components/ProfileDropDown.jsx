import React from 'react'
import { Link } from 'react-router-dom';
import {faLock} from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileDropDown = () => {
  return (
    <div>
      <ul>
        <li className='p-4'>
        <Link to="#">
        <h3 className='font-medium'>Afroza Akter</h3>
        <p className='text-sm text-gray-500 pt-2'>Edit profile</p>
        </Link>
        </li>
        <hr></hr>
        <li className='p-4'>
        <Link to="#">
        <p>Account</p>
        </Link>
        </li>
        <hr></hr>
        <li className='p-4'>
        <Link className='flex items-center' to="#">
        <FontAwesomeIcon className='mr-6 text-gray-600' icon={faLock}/>
        <p>Log out</p>
        </Link>
        </li>
      </ul>
    </div>
  )
}

export default ProfileDropDown
