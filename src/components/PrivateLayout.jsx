import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateLayout =()=>{
return(
    <div>
        <Outlet/>
    </div>
)
}

export default PrivateLayout;