import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import SuperAdminLayout from "../../Layouts/SuperAdminLayout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";



const ManagePermissions = ({ permissions }) => {
    const { data, setData, post, put, processing, reset } = useForm({
        name: "",
    });

    const [editingPermission, setEditingPermission] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPermission) {
            put(route("admin.permissions.update", editingPermission.id), {
                onSuccess: () => {
                    reset();
                    setEditingPermission(null);
                    toast.success("Permission updated successfully!");
                },
                onError: () => {
                    toast.error("Failed to update permission.");
                },
            });
        } else {
            post(route("admin.permissions.store"), {
                onSuccess: () => {
                    reset();
                    toast.success("Permission created successfully!");
                },
                onError: () => {
                    toast.error("Failed to create permission.");
                },
            });
        }
    };

    const handleEdit = (permission) => {
        setEditingPermission(permission);
        setData({ name: permission.name });
    };



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.permissions.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The permission has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the permission.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <SuperAdminLayout>
     
            <div className="permissions-container">
                <h1 className="permissions-heading">Manage Permissions</h1>
                <form onSubmit={handleSubmit} className="permissions-form">
                    <div className="form-group">
                        <label className="form-label">Permission Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="form-input"
                            placeholder="Enter permission name"
                            required
                        />
                    </div>
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={processing}
                    >
                        {editingPermission
                            ? "Update Permission"
                            : "Create Permission"}
                    </button>
                </form>

                <h2 className="permissions-subtitle">Existing Permissions</h2>
                <ul className="permissions-list">
                    {permissions.map((permission) => (
                        <li key={permission.id} className="permission-item">
                            <span className="permission-name">
                                {permission.name}
                            </span>
                            <div className="button-group">
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(permission)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(permission.id)}
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
};

export default ManagePermissions;
