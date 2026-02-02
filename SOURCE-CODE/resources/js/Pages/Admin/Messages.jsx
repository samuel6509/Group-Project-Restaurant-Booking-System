

import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../Layouts/AdminLayout";

const Messages = ({ messages, filters }) => {
    const [statusFilter, setStatusFilter] = useState(filters?.status || "");
    const [keyword, setKeyword] = useState(filters?.keyword || "");
    const [topic, setTopic] = useState(filters?.topic || "");
     const [startDate, setStartDate] = useState(filters?.start_date || "");
     const [endDate, setEndDate] = useState(filters?.end_date || "");
     const [specificDate, setSpecificDate] = useState(
         filters?.specific_date || ""
     );


     const buildQueryParams = () => {
         const params = {};

        if(statusFilter) {
            params.status = statusFilter;
        }
         if (keyword) {
             params.keyword = keyword;
         }
         if (topic) {
             params.topic = topic;
         }
         if (specificDate) {
             params.specific_date = specificDate;
         }
         if (startDate) {
             params.start_date = startDate;
         }
         if (endDate) {
             params.end_date = endDate;
         }
         return params;
     };

    


    const handleSearch = (e) => {
        e.preventDefault();
        const params = buildQueryParams(); 
        Inertia.get("/admin/messages", { ...params });
    };

    const handlePageChange = (url) => {
        if (url) {
            const params = buildQueryParams(); 
            Inertia.get(url, { ...params });
        }
    };

        const handleDelete = (id) => {
            if (confirm("Are you sure you want to delete this review?")) {
                Inertia.delete(`/admin/messages/${id}`);
            }
        };

    const markAsRead = (id) => {
        Inertia.patch(`/admin/messages/${id}/mark-read`);
    };

    return (
        <AdminLayout>
            <div style={styles.container}>
                <h1 style={styles.heading}>Messages</h1>

                {/* Filter and Search */}
                <div style={styles.filterContainer}>
                    <form
                        onSubmit={handleSearch}
                        style={styles.filterContainer}
                    >
                        <div style={styles.filterItem}>
                            <label htmlFor="status" style={styles.filterLabel}>
                                Filter by Status:
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                style={styles.input}
                            >
                                <option value="">All</option>
                                <option value="read">Read</option>
                                <option value="unread">Unread</option>
                            </select>
                        </div>
                        <div style={styles.filterItem}>
                            <label htmlFor="topic" style={styles.filterLabel}>
                                Filter by Topic:
                            </label>
                            <select
                                id="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                style={styles.input}
                            >
                                <option value="">Filter by Topic</option>
                                <option value="complaints">Complaints</option>
                                <option value="reservation">Reservation</option>
                                <option value="promotions">Promotions</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div style={styles.filterItem}>
                            <label htmlFor="keyword" style={styles.filterLabel}>
                                Search by Keyword:
                            </label>
                            <input
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search messages..."
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.filterItem}>
                            <label
                                htmlFor="specific_date"
                                style={styles.filterLabel}
                            >
                                Specific Date:
                            </label>
                            <input
                                id="specific_date"
                                type="date"
                                value={specificDate}
                                onChange={(e) =>
                                    setSpecificDate(e.target.value)
                                }
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.filterItem}>
                            <label
                                htmlFor="start_date"
                                style={styles.filterLabel}
                            >
                                Start Date:
                            </label>
                            <input
                                id="start_date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.filterItem}>
                            <label
                                htmlFor="end_date"
                                style={styles.filterLabel}
                            >
                                End Date:
                            </label>
                            <input
                                id="end_date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.searchButton}>
                            Search
                        </button>
                    </form>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Full Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Topic</th>
                            <th style={styles.th}>Message</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.data.map((msg, index) => (
                            <tr key={msg.id} style={styles.row}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{msg.name}</td>
                                <td style={styles.td}>{msg.email}</td>
                                <td style={styles.td}>{msg.phone}</td>
                                <td style={styles.td}>{msg.topic}</td>
                                <td style={styles.td}>{msg.message}</td>
                                <td style={styles.td}>
                                    {msg.status ? "Read" : "Unread"}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => markAsRead(msg.id)}
                                        style={styles.readButton}
                                    >
                                        Mark as Read
                                    </button>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div style={styles.paginationContainer}>
                    {messages.links.map((link, index) => (
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

// Inline styles
const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "28px",
        color: "#333",
        marginBottom: "20px",
    },
   
    filterContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        marginBottom: "20px",
        alignItems: "center",
    },
    filterItem: {
        display: "flex",
        flexDirection: "column",
    },
    filterLabel: {
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
    },
    searchButton: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        gridColumn: "span 2",
        justifySelf: "center",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
    },
    th: {
        textAlign: "left",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "left",
    },
    row: {
        backgroundColor: "#fff",
        transition: "background-color 0.3s",
    },
    readButton: {
        marginRight: "10px",
        padding: "5px 10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
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

export default Messages;
