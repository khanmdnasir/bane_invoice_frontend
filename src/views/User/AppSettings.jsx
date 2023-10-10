import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";


const UserSettings = () => {
    const path = useLocation();
    console.log(path.pathname);
    return (
        <>
            {path.pathname === "/app" ?
                <div className="sm:grid container mx-auto max-w-4xl w-3/4 py-10 md:grid-cols-2 ">
                    <div className="sm:mr-2 ">
                        <div className="py-3 px-4 ">
                            <span className="text-deep_gray text-13  ">General</span>
                        </div>
                        <div className="shadow-custom rounded">
                            <Link to='/app/company_settings'>
                                <div className="p-4 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">Organization Details</h4>
                                    <p className="text-13 text-deep_gray">Address, Logo & basic financial information </p>
                                </div>
                            </Link>
                            <Link to='/app/user'>
                                <div className="p-4 border-t border-red-200 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">User</h4>
                                    <p className="text-13 text-deep_gray">Add, Remove & modify users of this organisation</p>
                                </div>
                            </Link>
                            <Link to='/app/roles'>
                                <div className="p-4 border-t border-red-200 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">Roles</h4>
                                    <p className="text-13 text-deep_gray">Add,modify roles for users </p>
                                </div>
                            </Link>
                            <Link to='/app/currency'>
                                <div className="p-4 border-t border-red-200 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">Currencies</h4>
                                    <p className="text-13 text-deep_gray">Add, modify currency for this organisation </p>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className="md:ml-2 ">
                        <div className="py-3 px-4 ">
                            <span className="text-deep_gray text-13"> Features </span>
                        </div>
                        <div className="shadow-custom rounded">
                            <Link to='/app/chart_of_accounts'>
                                <div className="p-4 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">Chart of accounts</h4>
                                    <p className="text-13 text-deep_gray">Add chart of account of this organisation</p>
                                </div>
                            </Link>
                            <Link to='/app/key_account_manager'>
                                <div className="p-4 border-t border-red-200 hover:bg-light_blue cursor-pointer">
                                    <h4 className="text-15 text-navy_blue">Key account manager</h4>
                                    <p className="text-13 text-deep_gray">Add key account manager of this organisation</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                : <Outlet />
            }

        </>
    )
}

export default UserSettings;