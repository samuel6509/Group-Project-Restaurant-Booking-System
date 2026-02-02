import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage, useForm, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageMembers = () => {
    const { members, roles } = usePage().props;
    console.log("members", members);

    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const { data, setData, put, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phoneNumber: "",
        role: "",
        allergies: false,
        allergyInfo: "",
    });

    const openModal = (member) => {
        setSelectedMember(member);
        setData({
            first_name: member.first_name,
            last_name: member.last_name,
            email: member.email,
            phoneNumber: member.phoneNumber || "",
            role: member.roles[0]?.id,
            allergies: member.allergies || false,
            allergyInfo: member.allergyInfo || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMember(null);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        if (selectedMember) {
            router.put(
                `/admin/members/${selectedMember.id}`,
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    allergies: data.allergies,
                    allergyInfo: data.allergyInfo,
                },

                {
                    onSuccess: () => {
                        toast.success("Member has been updated successfully!");
                        closeModal();
                    },
                    onError: () => {
                        toast.error(
                            "An error occurred while updating the member."
                        );
                    },
                }
            );
        }
    };

    // const handleDelete = (id) => {
    //     if (confirm("Are you sure you want to delete this member?")) {
    //         Inertia.delete(route("admin.members.destroy", id));
    //     }
    // };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this member!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/members/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The member has been deleted successfully.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the member. Please try again.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AdminLayout>
            <div className="members-container">
                <h1 className="members-heading">Manage Members</h1>
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Allergies</th>
                            <th>Allergy Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members?.data?.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{member.first_name}</td>
                                <td>{member.last_name}</td>
                                <td>{member.email}</td>
                                <td>{member.phoneNumber || "N/A"}</td>
                                <td>{member.roles[0]?.name || "N/A"}</td>
                                <td>{member.allergies ? "Yes" : "No"}</td>
                                <td>{member.allergyInfo || "N/A"}</td>
                                <td>
                                    <button
                                        onClick={() => openModal(member)}
                                        className="edit-button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    {members?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => Inertia.get(link.url)}
                            className={`pagination-button ${
                                link.active ? "active" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

                {/* Edit Member Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2>Edit Member</h2>
                            <form onSubmit={handleSaveChanges}>
                                <div className="form-group">
                                    <label className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        className="form-input"
                                        required
                                    />
                                    {errors.first_name && (
                                        <div className="error">
                                            {errors.first_name}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        className="form-input"
                                        required
                                    />
                                    {errors.last_name && (
                                        <div className="error">
                                            {errors.last_name}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="form-input"
                                        required
                                    />
                                    {errors.email && (
                                        <div className="error">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={(e) =>
                                            setData(
                                                "phoneNumber",
                                                e.target.value
                                            )
                                        }
                                        className="form-input"
                                    />
                                    {errors.phoneNumber && (
                                        <div className="error">
                                            {errors.phoneNumber}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        className="form-input"
                                    >
                                        <option value="">Select a role</option>
                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="allergies"
                                    >
                                        Allergies
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="allergies"
                                        name="allergies"
                                        checked={data.allergies}
                                        onChange={(e) =>
                                            setData(
                                                "allergies",
                                                e.target.checked
                                            )
                                        }
                                        className="form-checkbox"
                                    />
                                </div>

                                {data.allergies && (
                                    <div className="form-group">
                                        <label className="form-label">
                                            Allergy Info
                                        </label>
                                        <input
                                            type="text"
                                            name="allergyInfo"
                                            value={data.allergyInfo}
                                            onChange={(e) =>
                                                setData(
                                                    "allergyInfo",
                                                    e.target.value
                                                )
                                            }
                                            className="form-input"
                                            placeholder="Describe allergies"
                                        />
                                        {errors.allergyInfo && (
                                            <div className="error">
                                                {errors.allergyInfo}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <button
                                        type="submit"
                                        className="submit-button"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageMembers;
