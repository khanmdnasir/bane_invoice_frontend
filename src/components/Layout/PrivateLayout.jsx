import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APICore } from "../../helper/AxiosConfig";
import Nav from "../Nav";
import Alert from "../Alert";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/alert/actions";




const api = new APICore();

const PrivateLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.alert.error);
    const success = useSelector((state) => state.alert.success);

    useEffect(() => {
        const isAuthenticated = api.isUserAuthenticated();
        console.log('Private Route', isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (error || success) {
            const alertTimeout = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => {
                clearTimeout(alertTimeout);
            };
        }
    }, [error, success, dispatch]);

    return (
        <div className="bg-light_blue min-h-screen max-h-full ">
            <Nav />
            {error ?
                <div className="max-w-7xl py-2 mt-4  w-11/12 mx-auto">
                    {error ? <Alert error={error} /> : ''}
                </div> : ""}
            {success ?
                <div className="max-w-7xl py-2 mt-4  w-11/12 mx-auto">
                    {success ? <Alert success={success} /> : ''}
                </div> : ""}
            {api.isUserAuthenticated() && <Outlet />}
        </div>
    );
};

export default PrivateLayout;