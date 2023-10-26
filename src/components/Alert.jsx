import React, { Children, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { clearError } from "../redux/alert/actions";
import { useDispatch } from "react-redux";

const Alert = ({ error, success }) => {
    const dispatch = useDispatch();
    return (
        <>
            {error ? <div className="flex text-red-900 justify-between border border-red-600 border-l-8 py-6 px-2 rounded  bg-white">
                {error}
                <FontAwesomeIcon className="bg-red-600 text-white rounded-full border w-2.5 h-2.5 cursor-pointer p-2" icon={faXmark} onClick={() => dispatch(clearError())} />
            </div> : ''}
            {success ? <div className="flex justify-between border border-spanish_green border-l-8 py-6 px-2 rounded  bg-white">
                {success}
                <FontAwesomeIcon className="bg-spanish_green text-white rounded-full border w-2.5 h-2.5 cursor-pointer p-2" icon={faXmark} onClick={() => dispatch(clearError())} />
            </div> : ''}
        </>
    )
}


export default Alert;