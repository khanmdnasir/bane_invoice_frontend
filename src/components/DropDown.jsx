import React, { useState, useRef, useEffect } from "react";
import {
  faCaretDown,
  faCaretUp,
  faArrowUpRightFromSquare,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Image from "../assets/banelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [openBtn, setOpenBtn] = useState(false);
  const drodownButtonRef = useRef();

  useEffect(() => {
    const drodownClickOutside1 = (event) => {
      if (
        openBtn &&
        drodownButtonRef.current &&
        !drodownButtonRef.current.contains(event.target)
      ) {
        setOpenBtn(false);
      }
    };

    document.addEventListener("mousedown", drodownClickOutside1);

    return () => {
      document.removeEventListener("mousedown", drodownClickOutside1);
    };
  }, [openBtn]);
  return (
    <div>
      <div className=" md:bg-hoverColor md:text-white md:p-2 md:mr-4 md:rounded md:text-sm">
        <div onClick={() => setOpenBtn(!openBtn)} className="mr-6 px-3 py-1.5 rounded-full relative hover:bg-hoverColor md:hidden cursor-pointer">
          <FontAwesomeIcon className="text-white" icon={faBars} />
        </div>
        <button
          ref={drodownButtonRef}
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
        <div className="md:bg-white md:border-2 md:border-solid md:border-gray-300 md:rounded md:w-64 md:h-fit md:z-10 md:absolute md:top-[75px] md:pt-2 md:shadow-lg md:overflow-auto">
          <ul className="absolute left-0 top-0 bg-gray-100 h-screen z-10 md:text-sm md:h-fit">
            <li className="md:flex md:items-center md:justify-between md:p-3">
              <img src={Image} alt="bane-logo" className="md:w-16" />
              <p className=" md:font-medium md:text-base">Demo company</p>
            </li>
            <hr></hr>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-100">
              <p>Files</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-100">
              <p>Settings</p>
            </li>
            <hr></hr>
            <li className="md:px-4 md:py-3">
              <p className="md:text-xs md:text-gray-500">Do more with Xero</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-200">
              <p>Expense Claims</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-200">
              <p>Analytics Plus</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-200">
              <p>WorkFlowMax</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-200">
              <p>HubDoc</p>
            </li>
            <li className="md:px-4 md:py-3 md:hover:bg-gray-200">
              <p>App Store</p>
            </li>
            <hr></hr>
            <li className="md:flex md:bg-gray-100 md:items-center md:justify-between md:px-4 md:py-4 md:hover:bg-gray-200">
              <p>Bane Invoice</p>
              <Link to="/">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
