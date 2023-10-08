import React, { useRef, useState, useEffect } from "react";
import {
  faPlus,
  faMagnifyingGlass,
  faBell,
  faCircleQuestion,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./DropDown";
import Search from "./Search";
import Notification from "./Notification";
import ProfileDropDown from "./ProfileDropDown";

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navItems = [
    { name: "dashboard", path: "/", sublinks: [] },
    { name: "invoice", path: "/invoice", sublinks: [] },
    {
      name: "Contact",
      path: "#",
      sublinks: [
        { name: "All Contacts", path: "#" },
        { name: "Customers", path: "#" },
        { name: "Suppliers", path: "#" },
        { name: "Employees", path: "#" },
      ],
    },
  ];
  let { pathname } = useLocation();

  let subpage = navItems
    .find((item) => item.path === pathname)
    ?.path?.split("/")?.[1];

  function ActiveLink(type = null) {
    if (subpage === "") {
      subpage = "dashboard";
    }

    let classes = "px-3.5 relative";
    if (type === subpage) {
      classes +=
        " after:block after:h-0.5 after:bg-gray-300 after:absolute after:top-[39px] after:right-0 after:left-auto after:w-full";
    } else {
      classes += "";
    }

    return classes;
  }

  const createButtonRef = useRef();
  const searchButtonRef = useRef();
  const notificationButtonRef = useRef();
  const profileButtonRef = useRef();
  const navButtonRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navOpen &&
        navButtonRef.current &&
        !navButtonRef.current.contains(event.target)
      ) {
        setNavOpen(false);
      }
      if (
        createOpen &&
        createButtonRef.current &&
        !createButtonRef.current.contains(event.target)
      ) {
        setCreateOpen(false);
      }
      if (
        searchOpen &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
      if (
        notificationOpen &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
      if (
        profileOpen &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen,createOpen, searchOpen, notificationOpen, profileOpen]);
  // useEffect(() => {
  //   const createClickOutside1 = (event) => {
  //     if (
  //       createOpen &&
  //       createButtonRef.current &&
  //       !createButtonRef.current.contains(event.target)
  //     ) {
  //       setCreateOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", createClickOutside1);

  //   return () => {
  //     document.removeEventListener("mousedown", createClickOutside1);
  //   };
  // }, [createOpen]);

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current && e.target !== linkRef.current) {
  //     setNavOpen(false);
  //   }
  // });

  // useEffect(() => {
  //   const searchClickOutside1 = (event) => {
  //     if (
  //       searchOpen &&
  //       searchButtonRef.current &&
  //       !searchButtonRef.current.contains(event.target)
  //     ) {
  //       setSearchOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", searchClickOutside1);

  //   return () => {
  //     document.removeEventListener("mousedown", searchClickOutside1);
  //   };
  // }, [searchOpen]);

  // useEffect(() => {
  //   const notificationClickOutside1 = (event) => {
  //     if (
  //       notificationOpen &&
  //       notificationButtonRef.current &&
  //       !notificationButtonRef.current.contains(event.target)
  //     ) {
  //       setNotificationOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", notificationClickOutside1);

  //   return () => {
  //     document.removeEventListener("mousedown", notificationClickOutside1);
  //   };
  // }, [notificationOpen]);

  // useEffect(() => {
  //   const profileClickOutside1 = (event) => {
  //     if (
  //       profileOpen &&
  //       profileButtonRef.current &&
  //       !profileButtonRef.current.contains(event.target)
  //     ) {
  //       setProfileOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", profileClickOutside1);

  //   return () => {
  //     document.removeEventListener("mousedown", profileClickOutside1);
  //   };
  // }, [profileOpen]);

  return (
    <div>
      <div className="bg-nav_color flex justify-between items-center h-16 px-4">
        <DropDown/>
        
        <div className="flex grow justify-start text-white font-medium h-16 leading-custom">
          {navItems.map((item, index) => (
            <div className="hover:bg-hoverColor" key={index}>
              {item.sublinks.length > 0 ? (
                <div className={`hover:bg-hoverColor ${
                      navOpen ? "bg-hoverColor" : ""
                    }`}>
                  <Link
                    key={item.name}
                    className={`px-3.5 relative hover:bg-hoverColor ${
                      navOpen ? "bg-hoverColor" : ""
                    }`}
                    to={item.path}
                    ref={navButtonRef}
                    onClick={() => setNavOpen(!navOpen)}
                  >
                    {item.name}
                  </Link>
                  {navOpen && (
                    <ul
                      className="bg-white py-2 rounded border-2 border-solid border-gray-300 absolute left-[357px] top-[70px] shadow-lg leading-10 w-40"
                    >
                      {item.sublinks.map((sublink, subindex) => (
                        <li
                          key={subindex}
                          className="text-black font-normal px-4 hover:bg-gray-200"
                        >
                          <Link className="text-sm" to={sublink.path}>
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  className={`${ActiveLink(item.name)}`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          {/* <Link
            className={`${ActiveLink("dashboard")} hover:bg-hoverColor`}
            to="/"
          >
            Dashboard
          </Link>
          <Link
            className={`${ActiveLink("invoice")} hover:bg-hoverColor`}
            to="/invoice"
          >
            Invoice
          </Link> */}
          {/* <Link
            className={`px-3.5 relative hover:bg-hoverColor ${
              navOpen ? "bg-hoverColor" : ""
            }`}
            to="#"
            ref={linkRef}
            onClick={() => setNavOpen(!navOpen)}
          >
            Contact
          </Link> */}

          {/* {navOpen && (
            <ul
              ref={menuRef}
              className="bg-white py-2 rounded border-2 border-solid border-gray-300 absolute left-[357px] top-[70px] shadow-lg leading-10 w-40"
            >
              <li className="text-black font-normal px-4 hover:bg-gray-200">
                <Link className="text-sm" to="#">
                  All Contacts
                </Link>
              </li>
              <li className="text-black font-normal px-4 hover:bg-gray-200">
                <Link className="text-sm" to="#">
                  Customers
                </Link>
              </li>
              <li className="text-black font-normal px-4 hover:bg-gray-200">
                <Link className="text-sm" to="#">
                  Suppliers
                </Link>
              </li>
              <li className="text-black font-normal px-4 hover:bg-gray-200">
                <Link className="text-sm" to="#">
                  Emloyees
                </Link>
              </li>
            </ul>
          )} */}
        </div>
        <div className="flex gap-8 text-white items-center">
          <div>
            <button
              ref={createButtonRef}
              className={`px-3 py-1.5 rounded-full hover:bg-hoverColor ${
                createOpen ? "bg-hoverColor" : ""
              }`}
              onClick={() => setCreateOpen(!createOpen)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {createOpen && (
              <ul className="bg-white py-2 rounded border-2 border-solid border-gray-300 absolute right-[200px] top-[70px] shadow-lg leading-10 w-48">
                <li className="text-black text-xs font-normal py-2 px-4 text-gray-500">
                  Create New
                </li>
                <li className="text-black font-normal px-4 hover:bg-gray-200">
                  <Link className="text-sm" to="#">
                    Invoice
                  </Link>
                </li>
                <li className="text-black font-normal px-4 hover:bg-gray-200">
                  <Link className="text-sm" to="#">
                    Bill
                  </Link>
                </li>
                <li className="text-black font-normal px-4 hover:bg-gray-200">
                  <Link className="text-sm" to="#">
                    Contact
                  </Link>
                </li>
                <li className="text-black font-normal px-4 hover:bg-gray-200">
                  <Link className="text-sm" to="#">
                    Purchase order
                  </Link>
                </li>
                <li className="text-black font-normal px-4 hover:bg-gray-200">
                  <Link className="text-sm" to="#">
                    Manual journal
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div>
            <button
              ref={searchButtonRef}
              className={`px-3 py-2 rounded-full hover:bg-hoverColor ${
                searchOpen ? "bg-hoverColor" : ""
              }`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {searchOpen && (
              <div className="bg-gray-100 text-black absolute px-2 py-2 shadow-md rounded w-80 h-fit right-[30px] top-[70px]">
                <Search />
              </div>
            )}
          </div>
          <div>
            <button
              ref={notificationButtonRef}
              className={`px-3 py-1.5 rounded-full hover:bg-hoverColor ${
                notificationOpen ? "bg-hoverColor" : ""
              }`}
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
            {notificationOpen && (
              <div className="bg-white text-black border-2 border-solid border-gray-300 absolute shadow-md rounded w-96 h-fit right-[125px] top-[70px]">
                <Notification setNotificationOpen={setNotificationOpen} />
              </div>
            )}
          </div>
          <div>
            <button>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </button>
          </div>
          <div className="bg-userBgColor p-2 rounded-full">
            <button
              ref={profileButtonRef}
              className="rounded-full text-black font-medium"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              AM
            </button>
            {profileOpen && (
              <div className="bg-white text-black border-2 border-solid border-gray-300 absolute shadow-md rounded w-60 h-fit right-[20px] top-[70px]">
                <ProfileDropDown />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
