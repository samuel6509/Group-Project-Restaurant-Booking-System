
import AdminLayout from "../../Layouts/AdminLayout";
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

const ManageReviews = () => {
    const { reviews } = usePage().props; 



    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this review?")) {
            Inertia.delete(`/admin/manage-reviews/${id}`);
        }
    };

      const handlePageChange = (url) => {
             if (url) {
                 Inertia.get(url);
             }
         };

    return (
        <AdminLayout>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ fontSize: "28px", color: "#333" }}>
                    Manage Reviews
                </h1>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Message</th>
                            <th style={styles.th}>Occupation</th>
                            <th style={styles.th}>Rating</th>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews?.data?.map((review, index) => (
                            <tr key={review.id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{review.name}</td>
                                <td style={styles.td}>{review.content}</td>
                                <td style={styles.td}>{review.occupation}</td>
                                <td style={styles.td}>{review.rating}</td>
                                <td style={styles.td}>
                                    {review.image ? (
                                        <img
                                            src={review.image}
                                            alt="Review"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>

                                <td style={styles.td}>
                                    <a
                                        href={`/admin/manage-reviews/${review.reviewID}/edit`}
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => handleDelete(review.reviewID)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={styles.paginationContainer}>
                    {reviews.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            style={{
                                ...styles.paginationButton,
                                ...(link.active
                                    ? styles.activePaginationButton
                                    : {}),
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
    
};

const styles = {
    th: { textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd" },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    editButton: {
        marginRight: "10px",
        padding: "5px 10px",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "4px",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "#ff4d4f",
        color: "#fff",
        borderRadius: "4px",
    },
    paginationContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    paginationButton: {
        padding: "8px 12px",
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        color: "#007bff",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    },
    activePaginationButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
    },
};

export default ManageReviews;
