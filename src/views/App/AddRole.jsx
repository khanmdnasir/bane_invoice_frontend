import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APICore } from "../../helper/AxiosConfig";
import { getUserRole } from "../../redux/role/action";

const api = new APICore();

const AddRole = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = location?.state?.row;
  const [permission, setPermission] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [rolePermission, setRolePermission] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigateTo = useNavigate();
  const isEditing = !!role;

  const [existingRoleNames, setExistingRoleNames] = useState([]);

  useEffect(() => {
    api.get(`/api/permission`, {}).then((res) => {
      setPermission(res.data.data);
    });
    if (role) {
      setRoleName(role?.name);
      const permissions = role?.permissions;
      const permissionCodeName = permissions.map((permission) => {
        return permission.codename;
      });

      setRolePermission(permissionCodeName);
    }

    // Fetch existing role names and set them in the state
    api.get(`/api/groups`).then((res) => {
      const existingNames = res.data.data.map((role) => role.name);
      setExistingRoleNames(existingNames);
    });
  }, []);

  // for checkbox
  const checkChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setRolePermission([...rolePermission, e.target.value]);
    } else {
      let index = rolePermission.findIndex((x) => x === e.target.value);
      rolePermission.splice(index, 1);
      setRolePermission([...rolePermission]);
    }
  };

  const roleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing && existingRoleNames.includes(roleName)) {
      setError("Role name already exists");
    } else {
      if (isEditing) {
        api
          .updatePatch(`/api/groups/${role.id}/`, {
            name: roleName,
            permissions: rolePermission,
          })
          .then((res) => {
            if (res.data.success) {
              setSuccessMessage("Role updated successfully");
              dispatch(getUserRole());
              setTimeout(() => {
                setSuccessMessage(null);
                navigateTo("/app/roles");
              }, 3000);
            } else {
              setError(res.data.error);
            }
          })
          .catch((err) => {
            setError(err);
          });
      } else {
        if (rolePermission.length === 0) {
          // Handle the case where rolePermission is empty (no permissions)
          api
            .create(`/api/groups/`, { name: roleName, permissions: [] })
            .then((res) => {
              if (res.data.success) {
                setSuccessMessage("Role created successfully");
                dispatch(getUserRole());
                setTimeout(() => {
                  setSuccessMessage(null);
                  navigateTo("/app/roles");
                }, 3000);
              } else {
                setError(res.data.error.toString());
              }
            })
            .catch((err) => {
              setError(err.toString());
            });
        } else {
          // Handle the case where rolePermission is not empty (permissions are selected)
          api
            .create(`/api/groups/`, {
              name: roleName,
              permissions: rolePermission,
            })
            .then((res) => {
              if (res.data.success) {
                setSuccessMessage("Role created successfully");
                dispatch(getUserRole());
                setTimeout(() => {
                  setSuccessMessage(null);
                  navigateTo("/app/roles");
                }, 3000);
              } else {
                setError(res.data.error);
              }
            })
            .catch((err) => {
              setError(err);
            });
        }
      }
    }
  };

  return (
    <div className="py-10">
      <div>
        <form onSubmit={roleSubmit}>
          <div>
            <div className="rounded bg-white h-auto w-11/12 md:w-3/4 m-auto border border-gray-300 border-solid">
              <h2 className="text-lg px-6 pt-6 pb-4">
                {isEditing ? "Edit Role" : "Create Role"}
              </h2>
              <hr />
              <div className="px-6 py-6">
                {successMessage && (
                  <div className="mb-4 p-2 rounded text-strong_blue border bg-success_color">
                    {successMessage}
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-2 rounded bg-red-200 text-red-400 border bg-success_color">
                    {error}
                  </div>
                )}
                <label className="text-gray-500 ">Role Name</label>
                <br />
                <input
                  className="md:w-80 mt-3 border border-gray-300 rounded p-2 placeholder:text-sm text-sm text-gray-500 focus:outline-none"
                  type="text"
                  name="name"
                  value={roleName}
                  placeholder="Enter Role Name"
                  onChange={(e) => {
                    setRoleName(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </div>
            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Action Type </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_actiontype"
                      checked={rolePermission.includes("add_actiontype")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_actiontype"
                      checked={rolePermission.includes("change_actiontype")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_actiontype"
                      checked={rolePermission.includes("delete_actiontype")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_actiontype"
                      checked={rolePermission.includes("view_actiontype")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Activity Log </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_activitylog"
                      checked={rolePermission.includes("add_activitylog")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_activitylog"
                      checked={rolePermission.includes("change_activitylog")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_activitylog"
                      checked={rolePermission.includes("delete_activitylog")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_activitylog"
                      checked={rolePermission.includes("view_activitylog")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Authentication Log </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_authenticationlog"
                      checked={rolePermission.includes("add_authenticationlog")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change </label>
                    <input
                      type="checkbox"
                      value="change_authenticationlog"
                      checked={rolePermission.includes(
                        "change_authenticationlog"
                      )}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_authenticationlog"
                      checked={rolePermission.includes(
                        "delete_authenticationlog"
                      )}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View </label>
                    <input
                      type="checkbox"
                      value="view_authenticationlog"
                      checked={rolePermission.includes(
                        "view_authenticationlog"
                      )}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Log Entry </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_logentry"
                      checked={rolePermission.includes("add_logentry")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_logentry"
                      checked={rolePermission.includes("change_logentry")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_logentry"
                      checked={rolePermission.includes("delete_logentry")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_logentry"
                      checked={rolePermission.includes("view_logentry")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Currency Model </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Data Source </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_datasource"
                      checked={rolePermission.includes("add_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_datasource"
                      checked={rolePermission.includes("change_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_datasource"
                      checked={rolePermission.includes("delete_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_datasource"
                      checked={rolePermission.includes("view_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Group </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_group"
                      checked={rolePermission.includes("add_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_group"
                      checked={rolePermission.includes("change_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_group"
                      checked={rolePermission.includes("delete_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_group"
                      checked={rolePermission.includes("view_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Permission</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_permission"
                      checked={rolePermission.includes("add_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_permission"
                      checked={rolePermission.includes("change_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_permission"
                      checked={rolePermission.includes("delete_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_permission"
                      checked={rolePermission.includes("view_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Content Type </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Clocked Schedule </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_datasource"
                      checked={rolePermission.includes("add_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_datasource"
                      checked={rolePermission.includes("change_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_datasource"
                      checked={rolePermission.includes("delete_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_datasource"
                      checked={rolePermission.includes("view_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Crontab Schedule</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_group"
                      checked={rolePermission.includes("add_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_group"
                      checked={rolePermission.includes("change_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_group"
                      checked={rolePermission.includes("delete_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_group"
                      checked={rolePermission.includes("view_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Interval Schedule</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_permission"
                      checked={rolePermission.includes("add_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_permission"
                      checked={rolePermission.includes("change_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_permission"
                      checked={rolePermission.includes("delete_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_permission"
                      checked={rolePermission.includes("view_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Periodic Task </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Periodic Tasks </h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_datasource"
                      checked={rolePermission.includes("add_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_datasource"
                      checked={rolePermission.includes("change_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_datasource"
                      checked={rolePermission.includes("delete_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_datasource"
                      checked={rolePermission.includes("view_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Solar Schedule</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_group"
                      checked={rolePermission.includes("add_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_group"
                      checked={rolePermission.includes("change_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_group"
                      checked={rolePermission.includes("delete_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_group"
                      checked={rolePermission.includes("view_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Chord Counter</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_permission"
                      checked={rolePermission.includes("add_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_permission"
                      checked={rolePermission.includes("change_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_permission"
                      checked={rolePermission.includes("delete_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_permission"
                      checked={rolePermission.includes("view_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Group Result</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Task Result</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_datasource"
                      checked={rolePermission.includes("add_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_datasource"
                      checked={rolePermission.includes("change_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_datasource"
                      checked={rolePermission.includes("delete_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_datasource"
                      checked={rolePermission.includes("view_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Reset Password Token</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_group"
                      checked={rolePermission.includes("add_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_group"
                      checked={rolePermission.includes("change_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_group"
                      checked={rolePermission.includes("delete_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_group"
                      checked={rolePermission.includes("view_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Email Schedule Model</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_permission"
                      checked={rolePermission.includes("add_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_permission"
                      checked={rolePermission.includes("change_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_permission"
                      checked={rolePermission.includes("delete_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_permission"
                      checked={rolePermission.includes("view_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-center">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Notification Model</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Notification Subsribe</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_datasource"
                      checked={rolePermission.includes("add_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_datasource"
                      checked={rolePermission.includes("change_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_datasource"
                      checked={rolePermission.includes("delete_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_datasource"
                      checked={rolePermission.includes("view_datasource")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">User Notification Read</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_group"
                      checked={rolePermission.includes("add_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_group"
                      checked={rolePermission.includes("change_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_group"
                      checked={rolePermission.includes("delete_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_group"
                      checked={rolePermission.includes("view_group")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">Session</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_permission"
                      checked={rolePermission.includes("add_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_permission"
                      checked={rolePermission.includes("change_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_permission"
                      checked={rolePermission.includes("delete_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_permission"
                      checked={rolePermission.includes("view_permission")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex w-11/12 md:w-3/4 m-auto justify-start">
              <div className="mt-1 bg-white mr-2 h-auto w-full md:w-1/4 border border-gray-300 border-solid rounded">
                <h2 className="p-3">User</h2>
                <hr></hr>
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Add</label>
                    <input
                      type="checkbox"
                      value="add_currencymodel"
                      checked={rolePermission.includes("add_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100">
                    <label className="text-gray-500 text-sm">Change</label>
                    <input
                      type="checkbox"
                      value="change_currencymodel"
                      checked={rolePermission.includes("change_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">Delete</label>
                    <input
                      type="checkbox"
                      value="delete_currencymodel"
                      checked={rolePermission.includes("delete_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-between items-center p-3">
                    <label className="text-gray-500 text-sm">View</label>
                    <input
                      type="checkbox"
                      value="view_currencymodel"
                      checked={rolePermission.includes("view_currencymodel")}
                      onChange={(e) => checkChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-11/12 md:w-3/4 m-auto pt-4">
              <button className="mb-4 md:mb-0 w-full md:w-fit bg-strong_blue mr-2 px-16 py-1.5 text-white rounded">
                Submit
              </button>
              <Link to="/app/roles">
                <button className="w-full md:w-fit bg-gray-300 px-16 py-1.5 rounded">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
