import React, { Children } from "react";

const Error = ({error})=>{
    console.log(error)
    return (
        <div className=" border border-red-600 border-l-8 py-6 px-2 rounded  bg-white">{error}</div>
    )
}


export default Error;