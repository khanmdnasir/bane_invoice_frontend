import React, { useState, useRef, useEffect } from "react";
import {
  faCaretDown,
  faCaretUp,
  faArrowUpRightFromSquare,
  faBars,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../assets/banelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const DropDown = ({ navItems }) => {
  const [openBtn, setOpenBtn] = useState(false);
  const [dropOpenBtn, setDropOpenBtn] = useState(false);
  const drodownButtonRef = useRef();
  let { pathname } = useLocation();
  let subpage = navItems
    .find((item) => item.path === pathname)
    ?.path?.split("/")?.[1];

  function ActiveLink(type = null) {
    if (subpage === "") {
      subpage = "dashboard";
    }

    let classes = "relative";
    if (type === subpage) {
      classes +=
        " after:block after:h-full after:bg-nav_color after:absolute after:top-0 after:right-auto after:left-0 after:w-1";
    } else {
      classes += "";
    }

    return classes;
  }

  useEffect(() => {
    const drodownClickOutside1 = (event) => {

      if (openBtn) {

        if (

          drodownButtonRef.current &&
          !drodownButtonRef.current.contains(event.target)
        ) {
          setOpenBtn(false);
        }
      }
    };

    document.addEventListener("mousedown", drodownClickOutside1);

    return () => {
      document.removeEventListener("mousedown", drodownClickOutside1);
    };
  }, [openBtn]);


  return (
    <div ref={drodownButtonRef}>
      <div className=" md:bg-hoverColor md:text-white md:p-2 md:mr-4 md:rounded md:text-sm">
        <div
          onClick={() => setOpenBtn(!openBtn)}
          className="mr-6 px-3 py-1.5 rounded-full relative hover:bg-hoverColor md:hidden cursor-pointer"
        >
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </div>
        <button

          className="md:hover:opacity-75 md:relative hidden md:inline-block "
          onClick={() => setOpenBtn(!openBtn)}
        >
          Demo Company
          {!openBtn ? (
            <FontAwesomeIcon className="md:ml-3" icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon className="md:ml-3" icon={faCaretUp} />
          )}
        </button>
      </div>

      {/* Open & Close Demo Company */}
      {openBtn && (
        <div className="md:bg-white md:border-2 md:border-solid md:border-gray-300 md:rounded md:w-64 md:h-fit md:z-10 md:absolute md:top-[75px] md:pt-2 md:shadow-lg">
          <div className="w-full">
            <div className="bg-gray-100 h-screen absolute left-0 top-0 w-80">
              <ul className="overflow-y-auto w-full md:w-auto bg-white h-fit md:bg-white z-10 md:relative md:text-sm md:h-fit">
                <li className="flex items-center p-4 md:flex md:items-center md:justify-between md:p-3">
                  <img
                    src={Image}
                    alt="bane-logo"
                    className="w-16 mr-6 md:mr-0 md:w-16"
                  />
                  <p className=" md:font-medium md:text-base">Demo company</p>
                </li>
                <hr className="md:hidden"></hr>
                {navItems.map((item, index) => (
                  <div className="md:hidden" key={index}>
                    {item.sublinks.length > 0 ? (
                      <div>
                        <Link
                          className={`hover:bg-gray-200 ${dropOpenBtn ? "bg-gray-200" : ""
                            } px-4 py-2 hover:bg-gray-200 flex justify-between items-center`}
                          key={item.name}
                          to={item.path}
                          onClick={() => setDropOpenBtn(!dropOpenBtn)}
                        >
                          {item.name}
                          {!dropOpenBtn ? (
                            <FontAwesomeIcon icon={faAngleDown} />
                          ) : (
                            <FontAwesomeIcon icon={faAngleUp} />
                          )}
                        </Link>
                        {dropOpenBtn && (
                          <ul>
                            {item.sublinks.map((sublink, subindex) => (
                              <li className="px-2 py-2 hover:bg-gray-200" key={subindex}>
                                <Link className="px-6" to={sublink.path}>{sublink.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <div className={`${ActiveLink(item.name)} px-4 py-2 hover:bg-gray-200`}>
                        <Link className="capitalize" key={item.name} to={item.path}>
                          {item.name}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                <hr className="pb-3"></hr>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-100">
                  <p>Files</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-100">
                  <p>Settings</p>
                </li>
                <hr className="pb-3"></hr>
                <li className="px-4 py-2 md:px-4 md:py-3">
                  <p className="text-xs text-gray-500 md:text-xs md:text-gray-500">Do more with Xero</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-200">
                  <p>Expense Claims</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-200">
                  <p>Analytics Plus</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-200">
                  <p>WorkFlowMax</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-200">
                  <p>HubDoc</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 md:px-4 md:py-3 md:hover:bg-gray-200">
                  <p>App Store</p>
                </li>
                <hr></hr>
                <li className="flex bg-gray-100 items-center justify-between px-4 py-4 hover:bg-gray-200 md:flex md:bg-gray-100 md:items-center md:justify-between md:px-4 md:py-4 md:hover:bg-gray-200">
                  <p>Bane Invoice</p>
                  <Link to="/invoice">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
