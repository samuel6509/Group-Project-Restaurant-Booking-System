// page that lets you edit a menu item & update it
import AdminLayout from "../../Layouts/AdminLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';

const EditMenuItem = () =>
{
    const {menuItem, menuType} = usePage().props
    const {data:formData, setData:setFormData, put, errors} = useForm
    // setting the default state of the form
    ({
        itemName: menuItem.itemName,
        itemPrice: menuItem.itemPrice,
        itemType: menuItem.itemType,
        itemDescription: menuItem.itemDescription,
        nutritional_info: menuItem.nutritional_info,
    })
    // handles updates to the form data
    const handleChange = (e) => 
    {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    // handles the submittion of the form
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        put(`/admin/manage-menu/${menuType}/${menuItem.itemID}`, formData)
    }

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={{textAlign: "center", marginBottom: "20px",}}>
                    {menuItem.itemImageURL ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src={`/${menuItem.itemImageURL}`}
                                alt={menuItem.itemName}
                                style={{maxWidth: "100%", maxHeight: "200px", borderRadius: "8px",}}
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
                <h1 style={{ ...styles.heading, textAlign: 'center' }}>Edit Menu Item:</h1>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Menu Type:</label>
                    <select
                            name="itemType"
                            value={formData.itemType}
                            onChange={handleChange}
                            style={styles.input}
                            required
                    >
                            <option value="starter">Starter</option>
                            <option value="main">Main</option>
                            <option value="dessert">Dessert</option>
                            <option value="extra">Extra</option>
                    </select>
                    {errors.itemType && 
                    (
                        <span style={styles.error}>{errors.itemType}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Item Name"
                        required
                    />
                    {errors.itemName && 
                    (
                        <span style={styles.error}>{errors.itemName}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Price:</label>
                    <input
                        type="number"
                        name="itemPrice"
                        value={formData.itemPrice}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.itemPrice && 
                    (
                        <span style={styles.error}>{errors.itemPrice}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nutritional Information:</label>
                    <textarea
                            name="nutritional_info"
                            value={formData.nutritional_info}
                            onChange={handleChange}
                            style={styles.input}
                    />
                    {errors.nutritional_info && 
                    (
                        <span style={styles.error}>{errors.nutritional_info}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                            name="itemDescription"
                            value={formData.itemDescription}
                            onChange={handleChange}
                            style={styles.input}
                            required
                    />
                    {errors.itemDescription && 
                    (
                        <span style={styles.error}>{errors.itemDescription}</span>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" style={styles.button}>Update</button>
                </div>
            </form>
        </AdminLayout>
    )
}

// styling fom edit review page
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

export default EditMenuItem;