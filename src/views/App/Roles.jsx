import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { getRoles, getUserRole } from "../../redux/role/action";
import {
  faPenToSquare,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withSwal } from "react-sweetalert2";
import { APICore } from "../../helper/AxiosConfig";

const api = new APICore();

const actionColumn = withSwal(({ row, swal }) => {
  const dispatch = useDispatch();
  const user_role = useSelector((state) => state.role.user_role);
  const DeleteRole = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28bb4b",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Yes, delete it!",
      })
      .then(function (result) {
        if (result.value) {
          api
            .delete(`/api/groups/${row.original.id}/`)
            .then((res) => {
              dispatch(getRoles(10, 1));
              swal.fire("Deleted!", "Item has been deleted.", "success");
            })
            .catch((err) => {
              swal.fire({
                title: err,
              });
            });
        } else if (result.dismiss === "cancel") {
          console.log("cancel");
        }
      });
  };

  return (
    <>
      {user_role.includes("change_group") ? (
        <Link to="/app/add_role" state={{ row: row.original }}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-base mr-3 text-gray-400"
          />
        </Link>
      ) : (
        <Link to="#">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      )}

      {user_role.includes("delete_group") ? (
        <Link to="#" onClick={() => DeleteRole(row.original.id)}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-base text-gray-400"
          />
        </Link>
      ) : (
        <Link to="#">
          <FontAwesomeIcon icon={faTrashAlt} />
        </Link>
      )}
    </>
  );
});

const columns = [
  {
    Header: "#",
    accessor: (row, index) => index + 1, // Index starts from 0, so add 1 to start from 1
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "action",
    sort: false,
    Cell: actionColumn,
  },
];

const Roles = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const user_role = useSelector((state) => state.role.user_role);
  const previous = useSelector((state) => state.role.previous);
  const next = useSelector((state) => state.role.next);
  const current_page = useSelector((state) => state.role.current_page);
  const total_page = useSelector((state) => state.role.total_page);
  const active = useSelector((state) => state.role.active);
  const loading = useSelector((state) => state.role.loading);
  const [pageSize, setPageSize] = useState(6);

  // const visitPage = (page) => {
  //   dispatch(getRoles(pageSize, page));
  // };

  // const previous_number = () => {
  //   if (previous !== null) {
  //     dispatch(getRoles(pageSize, previous));
  //   }
  // };

  // const next_number = () => {
  //   if (next !== null) {
  //     dispatch(getRoles(pageSize, next));
  //   }
  // };

  useEffect(() => {
    dispatch(getRoles(pageSize, 1));
    dispatch(getUserRole());
  }, [pageSize]);

  return (
    <div className="py-10">
      <div className="bg-white h-auto w-11/12 md:w-3/4 m-auto border border-gray-300 border-solid">
        <div className="flex justify-between items-center px-6 pt-6 pb-4">
          <h2 className="text-lg ">Roles</h2>
          {user_role.includes("add_group") ? (
            <Link
              to="/app/add_role"
              className="bg-strong_blue text-white text-sm p-2 rounded"
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Role
            </Link>
          ) : (
            ""
          )}
        </div>
        <hr />
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <>
              {roles?.data?.length > 0 ? (
                <Table
                  active={active}
                  pageSize={pageSize}
                  data={roles?.data}
                  columns={columns}
                  isSearchable={true}
                  useSortBy
                />
              ) : (
                <p>No Role Available</p>
              )}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;
