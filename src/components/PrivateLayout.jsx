import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const PrivateLayout =()=>{
return(
    <div>
        <Nav/>
        <Outlet/>
    </div>
)
}

export default PrivateLayout;