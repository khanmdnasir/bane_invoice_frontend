import React, { useRef, useState, useEffect } from "react";
import {
  faPlus,
  faMagnifyingGlass,
  faBell,
  faCircleQuestion,
  faEllipsisVertical,
  faLock
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
  const [responsiveOpen, setResponsiveOpen] = useState(false);
  const [createresOpen, setCreateResOpen] = useState(false);
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

    let classes = "md:px-3.5 relative";
    if (type === subpage) {
      classes +=
        " md:after:block md:after:h-0.5 md:after:bg-gray-300 md:after:absolute md:after:top-[39px] md:after:right-0 md:after:left-auto md:after:w-full";
    } else {
      classes += "";
    }

    return classes;
  }


  const createButtonRef = useRef();
  const dropdownRef = useRef();
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
      if (responsiveOpen) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setResponsiveOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen, createOpen, searchOpen, notificationOpen, profileOpen, responsiveOpen]);


  return (
    <div>
      <div className="bg-nav_color flex justify-between items-center h-16 px-4">
        <DropDown navItems={navItems} />

        <div ref={navButtonRef} className="absolute z-10 left-0 top-[120px] md:top-0 md:relative md:flex md:grow md:justify-start md:text-white md:font-medium md:h-16 md:leading-custom">
          {navItems.map((item, index) => (
            <div className="hidden md:inline-block md:hover:bg-hoverColor" key={index}>
              {item.sublinks.length > 0 ? (
                <div className={`md:hover:bg-hoverColor ${navOpen ? "md:bg-hoverColor" : ""
                  }`}>
                  <Link
                    key={item.name}
                    className={`md:px-3.5 md:relative md:hover:bg-hoverColor ${navOpen ? "md:bg-hoverColor" : ""
                      }`}
                    to={item.path}

                    onClick={() => setNavOpen(!navOpen)}
                  >
                    {item.name}
                  </Link>
                  {navOpen && (
                    <ul
                      className="md:bg-white md:py-2 md:rounded md:border-2 md:border-solid md:border-gray-300 md:absolute md:left-[187px] md:top-[70px] md:shadow-lg md:leading-10 md:w-40"
                    >
                      {item.sublinks.map((sublink, subindex) => (
                        <li
                          key={subindex}
                          className="md:text-black md:font-normal md:px-4 md:hover:bg-gray-200"
                        >
                          <Link className="md:text-sm" to={sublink.path}>
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

        </div>

        {/* For Responsive */}
        <div ref={dropdownRef} className="md:hidden">
          <div>
            <button onClick={() => setResponsiveOpen(!responsiveOpen)}>
              <FontAwesomeIcon className="mr-4 px-4 py-2 rounded-full relative hover:bg-hoverColor md:hidden cursor-pointer text-white text-lg" icon={faEllipsisVertical} />
            </button>
            {responsiveOpen && (
              <ul className="bg-white py-2 rounded border-2 border-solid border-gray-300 absolute right-2 top-[70px] shadow-lg leading-10 w-60">
                <li className="px-4 py-2 text-sm hover:bg-gray-200">
                  <button onClick={() => { setCreateOpen(!createOpen); setResponsiveOpen(false) }}>
                    <FontAwesomeIcon className="mr-7 text-gray-600" icon={faPlus} />
                    Create New
                  </button>
                </li>
                <li className="px-4 py-2 text-sm hover:bg-gray-200">
                  <button onClick={() => { setSearchOpen(!searchOpen); setResponsiveOpen(false) }}>
                    <FontAwesomeIcon className="mr-7 text-gray-600" icon={faMagnifyingGlass} />
                    Search
                  </button>

                </li>
                <li className="px-4 py-2 text-sm hover:bg-gray-200">
                  <button onClick={() => { setNotificationOpen(!notificationOpen); setResponsiveOpen(false) }}>
                    <FontAwesomeIcon className="mr-7 text-gray-600" icon={faBell} />
                    Notification
                  </button>

                </li>
                <li className="px-4 py-2 text-sm hover:bg-gray-200">
                  <button>
                    <FontAwesomeIcon className="mr-7 text-gray-600" icon={faCircleQuestion} />
                    Help
                  </button>

                </li>
                <li className="px-2.5 py-2 text-sm hover:bg-gray-200">
                  <button onClick={() => { setProfileOpen(!profileOpen); setResponsiveOpen(false) }} className="bg-userBgColor p-1.5 rounded-full mr-4">
                    <p className="text-black font-medium">AM</p>
                  </button>
                  <span>Afroza Mukta</span>

                </li>
                <hr></hr>
                <li className='px-4 py-3 text-sm hover:bg-gray-200'>
                  <Link className='flex items-center' to="#">
                    <FontAwesomeIcon className='mr-7 text-gray-600' icon={faLock} />
                    <p>Log out</p>
                  </Link>
                </li>
              </ul>
            )}

          </div>
          {createOpen && (
            <ul ref={createButtonRef} className="bg-white py-2 rounded border-2 border-solid border-gray-300 absolute right-2 top-[70px] shadow-lg leading-10 w-48">
              <li className="text-xs font-normal py-2 px-4 text-gray-500">
                Create New
              </li>
              <li className="text-black font-normal px-4 hover:bg-gray-200">
                <Link className="text-sm" to="/invoice">
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

          {searchOpen && (
            <div ref={searchButtonRef} className="bg-gray-100 text-black absolute px-2 py-2 shadow-md rounded w-80 h-fit right-2 top-[70px]">
              <Search />
            </div>
          )}

          {notificationOpen && (
            <div ref={notificationButtonRef} className="bg-white text-black border-2 border-solid border-gray-300 absolute shadow-md rounded w-96 h-fit right-2 top-[70px]">
              <Notification setNotificationOpen={setNotificationOpen} />
            </div>
          )}
          {profileOpen && (
            <div ref={profileButtonRef} className="bg-white text-black border-2 border-solid border-gray-300 absolute shadow-md rounded w-60 h-fit right-2 top-[70px]">
              <ProfileDropDown />
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-8 md:text-white md:items-center">
          <div ref={createButtonRef}>
            <button
              className={`px-3 py-1.5 rounded-full hover:bg-hoverColor ${createOpen ? "bg-hoverColor" : ""
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
                  <Link className="text-sm" to="/invoice">
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
          <div ref={searchButtonRef}>
            <button
              className={`px-3 py-2 rounded-full hover:bg-hoverColor ${searchOpen ? "bg-hoverColor" : ""
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
          <div ref={notificationButtonRef}>
            <button

              className={`px-3 py-1.5 rounded-full hover:bg-hoverColor ${notificationOpen ? "bg-hoverColor" : ""
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
          <div ref={profileButtonRef} className="bg-userBgColor p-2 rounded-full">
            <button

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
