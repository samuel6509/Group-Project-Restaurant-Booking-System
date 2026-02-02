import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import SuperAdminLayout from "../../Layouts/SuperAdminLayout";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Roles({ roles, permissions }) {
    const [editingRole, setEditingRole] = useState(null);

    const { data, setData,  reset, processing } = useForm({
        name: "",
        permissions: [],
    });

    const handlePermissionChange = (id) => {
        const updatedPermissions = data.permissions.includes(id)
            ? data.permissions.filter((permId) => permId !== id)
            : [...data.permissions, id];

        setData("permissions", updatedPermissions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingRole) {
            router.put(
                `/super-admin/manage-roles/${editingRole.id}`,
                {
                    name: data.name,
                    permissions: data.permissions,
                },
                {
                    onSuccess: () => {
                        reset();
                        setEditingRole(null);
                        toast.success("Role updated successfully!");
                    },
                    onError: () => {
                        toast.error("Failed to update role. Please try again.");
                    },
                }
            );
        } else {
            router.post(
                "/super-admin/manage-roles",
                {
                    name: data.name,
                    permissions: data.permissions,
                },
                {
                    onSuccess: () => {
                        reset();
                        toast.success("Role created successfully!");
                    },
                    onError: () => {
                        toast.error("Failed to create role. Please try again.");
                    },
                }
            );
        }
    };

    const handleEdit = (role) => {
        setEditingRole(role);
        setData({
            name: role.name,
            permissions: role.permissions.map((perm) => perm.id),
        });
    };



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this role!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/super-admin/manage-roles/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The role has been deleted successfully.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the role. Please try again.",
                            "error"
                        );
                    },
                });
            }
        });
    };
    return (
        <SuperAdminLayout>
            <div className="roles-container">
                <h1 className="roles-title">Manage Roles</h1>

                <form onSubmit={handleSubmit} className="roles-form">
                    <div className="form-group">
                        <label>Role Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h3>Assign Permissions</h3>
                        <div className="permissions-list">
                            {permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="permission-item"
                                >
                                    <input
                                        type="checkbox"
                                        id={`perm-${permission.id}`}
                                        value={permission.id}
                                        checked={data.permissions.includes(
                                            permission.id
                                        )}
                                        onChange={() =>
                                            handlePermissionChange(
                                                permission.id
                                            )
                                        }
                                        className="form-checkbox"
                                    />
                                    <label htmlFor={`perm-${permission.id}`}>
                                        {permission.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="create-role-permission-button"
                        disabled={processing}
                    >
                        {editingRole ? "Update Role" : "Create Role"}
                    </button>
                </form>

                <h2 className="roles-subtitle">Existing Roles</h2>
                <ul className="roles-list">
                    {roles.map((role) => (
                        <li key={role.id} className="role-item">
                            <div className="role-details">
                                <strong>{role.name}</strong>
                                <ul>
                                    {role.permissions.map((permission) => (
                                        <li key={permission.id}>
                                            {permission.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="role-actions">
                                <button
                                    onClick={() => handleEdit(role)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(role.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </SuperAdminLayout>
    );
}
