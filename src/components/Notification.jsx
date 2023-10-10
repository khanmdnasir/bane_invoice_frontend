import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Notification = ({setNotificationOpen}) => {
  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3">
        <p className="text-sm font-medium">Notifications</p>
        <FontAwesomeIcon className="text-gray-600 text-lg cursor-pointer" onClick={() => setNotificationOpen(false)} icon={faXmark} />
      </div>
      <hr></hr>
      <div className="pt-8 pr-3 pl-8 pb-3 bg-gray-100">
        <div className="flex justify-between items-center pb-4">
          <button className="bg-gray-300 text-sm px-1.5 font-normal rounded border-2 border-gray-400 border-solid">Info</button>
          <FontAwesomeIcon className="text-gray-400 text-xs" icon={faXmark} />
        </div>
        <p className="w-60 text-gray-600 pb-4">Failed to approve an expense for Demo Company </p>
        <p className="text-right text-sm text-gray-500">2 days ago - Demo Company</p>
      </div>
      <hr></hr>
      <div className="flex justify-between items-center px-3 py-3">
        <Link className="text-sm font-medium text-nav_color hover:bg-gray-200 p-2 rounded" to="#">Settings</Link>
        <Link className="text-sm font-medium" to="#">Mark all as read</Link>
      </div>
    </div>
  );
};

export default Notification;
