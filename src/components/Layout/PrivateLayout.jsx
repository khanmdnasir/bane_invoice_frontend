import React, { useEffect } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import { APICore } from "../../helper/AxiosConfig";
import Nav from "../Nav";


const api = new APICore();

const PrivateLayout = () => {

    const navigate = useNavigate();

 

    useEffect(() => {
        const isAuthenticated = api.isUserAuthenticated();
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate]);

   

    return (
        <div className="bg-light_blue min-h-screen">
            <Nav/>
            {api.isUserAuthenticated() && <Outlet />}
        </div>
    );
};

export default PrivateLayout;