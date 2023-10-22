import React, { Children } from "react";
import { useSelector } from "react-redux";

const Alert = ({error})=>{

    return (
        <div className=" border border-red-600 border-l-8 py-6 px-2 rounded  bg-white">{error}</div>
    )
}


export default Alert;