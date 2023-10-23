import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { APICore } from "../../helper/AxiosConfig";

const api = new APICore();

const GuestLayout = () => {
    const navigate = useNavigate();
    console.log("Public");
  

    useEffect(() => {
        const isAuthenticated = api.isUserAuthenticated();
        if (isAuthenticated) {
            navigate("/dashboard");
        }

    }, [navigate]);

    return (
        <div>
            {!api.isUserAuthenticated() && <Outlet />}

        </div>
    )
}

export default GuestLayout;

