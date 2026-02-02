
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import SuperAdminLayout from "../../Layouts/SuperAdminLayout";
import Swal from "sweetalert2";
import { toast } from "react-toastify"; 

const UsersPermission = ({ users, permissions }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState("");

    const handleAssignPermission = () => {
        if (!selectedUser || !selectedPermission) {
            toast.error("Please select a user and a permission!");
            return;
        }

        router.post(
            "/super-admin/assign-permission",
            {
                user_id: selectedUser,
                permission_id: selectedPermission,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Permission assigned successfully!");
                    setSelectedUser(null);
                    setSelectedPermission("");
                },
                onError: () => {
                    toast.error(
                        "Failed to assign permission. Please try again."
                    );
                },
            }
        );
    };

  
     const handleRevokePermission = (userId, permissionId) => {
         Swal.fire({
             title: "Are you sure?",
             text: "You are about to revoke this permission!",
             icon: "warning",
             showCancelButton: true,
             confirmButtonColor: "#d33",
             cancelButtonColor: "#3085d6",
             confirmButtonText: "Yes, revoke it!",
             cancelButtonText: "Cancel",
         }).then((result) => {
             if (result.isConfirmed) {
                 router.post(
                     "/super-admin/revoke-permission",
                     {
                         user_id: userId,
                         permission_id: permissionId,
                     },
                     {
                         onSuccess: () => {
                             Swal.fire(
                                 "Revoked!",
                                 "The permission has been revoked successfully.",
                                 "success"
                             );
                         },
                         onError: () => {
                             Swal.fire(
                                 "Error!",
                                 "Failed to revoke the permission. Please try again.",
                                 "error"
                             );
                         },
                     }
                 );
             }
         });
     };

     
       

    return (
        <SuperAdminLayout>
            <div className="home-page">
                <h1 className="user-permissions-heading">User Permissions Management</h1>

                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Current Permissions</th>
                            <th>Assign Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {user.first_name + " " + user.last_name}
                                </td>
                                <td>{user.email}</td>
                               
                                <td>
                                    <div className="user-permissions-container">
                                        {user.permissions.map((perm) => (
                                            <div
                                                key={perm.id}
                                                className="user-permission-item"
                                            >
                                                <span className="user-permission-name">
                                                    {perm.name}
                                                </span>
                                                <button
                                                    className="revoke-button"
                                                    onClick={() =>
                                                        handleRevokePermission(
                                                            user.id,
                                                            perm.id
                                                        )
                                                    }
                                                >
                                                    Revoke
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <select
                                        value={
                                            selectedUser === user.id
                                                ? selectedPermission
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setSelectedUser(user.id);
                                            setSelectedPermission(
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="">
                                            Select a permission
                                        </option>
                                        {permissions.map((perm) => (
                                            <option
                                                key={perm.id}
                                                value={perm.id}
                                            >
                                                {perm.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleAssignPermission}
                                        className="assign-button"
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SuperAdminLayout>
    );
};

export default UsersPermission;
