import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APICore } from "../../helper/AxiosConfig";
import Nav from "../Nav";
import Alert from "../Alert";







const api = new APICore();

const PrivateLayout = () => {
    const navigate = useNavigate();

    const alert = useSelector((state) => state.alert.error);
    const success = useSelector((state) => state.alert.success);

    useEffect(() => {
        const isAuthenticated = api.isUserAuthenticated();
        console.log('Private Route', isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate]);



    return (
        <div className="bg-light_blue min-h-screen max-h-full ">
            <Nav />
            {alert ?
                <div className="max-w-7xl py-2 mt-4  w-11/12 mx-auto">
                    {alert ? <Alert error={alert} /> : ''}
                </div> : ""}
                {success ?
                <div className="max-w-7xl py-2 mt-4  w-11/12 mx-auto">
                    {success ? <Alert error={success} /> : ''}
                </div> : ""}
            {api.isUserAuthenticated() && <Outlet />}
        </div>
    );
};

export default PrivateLayout;