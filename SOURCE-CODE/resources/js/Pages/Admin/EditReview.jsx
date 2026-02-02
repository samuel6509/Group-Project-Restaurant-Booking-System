import React from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const EditReview = ({ review }) => {
    const { data, setData, put, errors } = useForm({
        name: review.name,
        occupation: review.occupation,
        content: review.content,
        rating: review.rating,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/manage-reviews/${review.reviewID}`);
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={styles.heading}>Edit Review</h1>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        style={styles.input}
                        placeholder="Name"
                        required
                    />
                    {errors.name && (
                        <span style={styles.error}>{errors.name}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Occupation:</label>
                    <input
                        type="text"
                        value={data.occupation}
                        onChange={(e) => setData("occupation", e.target.value)}
                        style={styles.input}
                        placeholder="Occupation"
                        required
                    />
                    {errors.occupation && (
                        <span style={styles.error}>{errors.occupation}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Content:</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        style={styles.textarea}
                        placeholder="Content"
                        required
                    />
                    {errors.content && (
                        <span style={styles.error}>{errors.content}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Rating:</label>
                    <input
                        type="number"
                        value={data.rating}
                        onChange={(e) => setData("rating", e.target.value)}
                        style={styles.input}
                        placeholder="Rating (1-5)"
                        required
                    />
                    {errors.rating && (
                        <span style={styles.error}>{errors.rating}</span>
                    )}
                </div>

                <button type="submit" style={styles.button}>
                    Update
                </button>
            </form>

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                {review.image ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={review.image}
                        alt="Review"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            borderRadius: "8px",
                        }}
                    />
                    </div>
                ) : (
                    <span
                        style={{
                            color: "#777",
                            fontStyle: "italic",
                            fontSize: "16px",
                        }}
                    >
                        No Image
                    </span>
                )}
            </div>
        </AdminLayout>
    );
};

const styles = {
    form: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    formGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
        minHeight: "100px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
};

export default EditReview;
