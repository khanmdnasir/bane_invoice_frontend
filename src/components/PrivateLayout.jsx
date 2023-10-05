import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { APICore } from "../helper/AxiosConfig";

const api = new APICore();

console.log(api.isUserAuthenticated());

const PrivateLayout = () => {
   
    return (
        <div>
            {api.isUserAuthenticated() ? <Outlet /> : "Please Login First"}
        </div>
    )
}

export default PrivateLayout;