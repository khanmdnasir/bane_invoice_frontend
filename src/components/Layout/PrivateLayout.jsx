import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { APICore } from "../../helper/AxiosConfig";

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
        <div>
            {api.isUserAuthenticated() && <Outlet />}
        </div>
    );
};

export default PrivateLayout;