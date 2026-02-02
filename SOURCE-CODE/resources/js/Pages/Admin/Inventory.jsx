import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

const Inventory = () => {
    const { inventoryItems } = usePage().props;
    const [items, setItems] = useState(inventoryItems.data || []);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [formData, setFormData] = useState({
        id: "",
        item_name: "",
        quantity: 0,
        price: 0,
        category: "In Stock",
        image_url: null,
    });

    // open modal for editing or adding item
    const openModal = (type, item = {}) => {
        setModalType(type);
        setFormData({
            id: item.id || "",
            item_name: item.item_name || "",
            quantity: item.quantity || "",
            price: item.price || "",
            category: item.category || "In Stock",
            image_url: null,
        });
        setIsModalOpen(true);
    };

    console.log(formData)

    // close modal for editing or adding item
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // delete an item
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            Inertia.delete(`/admin/inventory/${id}`);
        }
    };

    // perform searches
    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(
            "/admin/inventory",
            { search },
            {
                onSuccess: (page) => setItems(page.props.inventory),
            }
        );
    };

    // handle both add and update of item
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("item_name", formData.item_name);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);
        if (formData.image_url) {
            formDataToSend.append("image_url", formData.image_url);
        }

        if (modalType === "add") {
            Inertia.post("/admin/inventory", formDataToSend);
        } else {
            Inertia.post(`/admin/inventory/${formData.id}`, formDataToSend, {
                method: "post",
                headers: {
                    "X-HTTP-Method-Override": "PUT",
                },
                onSuccess: () => {
                    console.log("Item updated successfully");
                },
                onError: (errors) => {
                    console.error("Update failed:", errors);
                },
            });
        }

        closeModal();
    };


    // pagination
    const handlePageChange = (url) => {
        if (url) {
            Inertia.get(url);
        }
    };

    return (
        <AdminLayout>
            <div style={styles.container}>
                <h1 style={styles.heading}>Inventory Management</h1>

                <div className="pb-5">
                    <button onClick={() => openModal("add")} className="bg-green-500 text-white rounded-md px-7 py-2">
                        Add new item
                    </button>
                </div>

                <form onSubmit={handleSearch} style={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Item Name</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item, index) => (
                            <tr key={item.id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>
                                    <img src={item.image_url} className="w-14 h-14 object-contain" />
                                </td>
                                <td style={styles.td}>{item.item_name}</td>
                                <td style={styles.td}>{item.quantity}</td>
                                <td style={styles.td}>${item.price}</td>
                                <td style={styles.td}>{item.category}</td>
                                <td style={styles.td}>
                                    <button onClick={() => openModal("edit", item)} style={styles.editButton}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
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
                    {inventoryItems.links?.map((link, index) => (
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

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>{modalType === "add" ? "Add New Item" : "Edit Item"}</h2>
                            <form onSubmit={handleSubmit} className="grid space-y-4 bg-white p-4">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={formData.item_name}  // Fix field name
                                    onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}  // Fix field name
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="">Select Stock Status</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Not In Stock">Not In Stock</option>
                                </select>

                                <input
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.files[0] })}  // Fix field name
                                />
                                <button className="bg-green-500 text-white py-2" type="submit">
                                    {modalType === "add" ? "Add Item" : "Update Item"}
                                </button>
                                <button type="button" onClick={closeModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};


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
    searchForm: {
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        flex: 1,
    },
    searchButton: {
        padding: "8px 12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
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
    },
    editButton: {
        marginRight: "10px",
        padding: "5px 10px",
        backgroundColor: "#28a745",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
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
    },
    activePaginationButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
    },
};

export default Inventory;
