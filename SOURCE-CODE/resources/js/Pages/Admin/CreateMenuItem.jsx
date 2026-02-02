// page that lets admin create new food items for menus
import AdminLayout from "../../Layouts/AdminLayout";
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const CreateMenuItem = () =>
{
    const [preview, setPreview] = useState(null) // change state of the review preview
    // default state of form
    const {data:formData, setData:setFormData, post, errors} = useForm
    ({
        menuType: '',
        itemName: '',
        itemPrice: '',
        itemType: '',
        itemDescription: '',
        itemImageURL: null,
        nutritional_info: '',
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
        
        post('/admin/menu/create/item/post', formData,
        {
            headers:
            {
                'Content-Type': 'multipart/form-data',
            }
        })
    }
    
    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={{ ...styles.heading, textAlign: 'center' }}>Create Menu Item:</h1>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Menu Type:</label>
                    <select
                            name="menuType"
                            value={formData.menuType}
                            onChange={handleChange}
                            style={styles.input}
                            required
                    >
                            {/* disbaled meaning it cannot be pressed */}
                            <option value='' disabled>Select a menu</option>
                            <option value="morning_menu">Morning</option>
                            <option value="evening_menu">Evening</option>
                            <option value="kids_menu">Kids</option>
                    </select>
                    {/* error handling for invalid menu type, error messages used alot in this page */}
                    {errors.menuType && 
                    (
                        <span style={styles.error}>{errors.menuType}</span>
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Image:</label>
                    <input
                        type="file"
                        className='form-control'
                        id='image'
                        name='image'
                        accept='image/*'
                        required
                        onChange={(e) => 
                        {
                            const file = e.target.files[0]
                            setFormData({...formData, itemImageURL: file})
                            // temp URL so image is seen in preview 
                            setPreview(URL.createObjectURL(file))
                        }}
                        />
                        {errors.itemImageURL && 
                        (
                            <span style={styles.error}>{errors.itemImageURL}</span>
                        )}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Item Type:</label>
                    <select
                            name="itemType"
                            value={formData.itemType}
                            onChange={handleChange}
                            style={styles.input}
                            required
                    >
                            <option value='' disabled>Select a type </option>
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
                    <button type="submit" style={styles.button}>Submit</button>
                </div>
            </form>
            {/* the preview of the menu item */}
            <div className="card" style={styles.form}>
                <h1 style={{ ...styles.heading, textAlign: 'center' }}>Menu Item Preview:</h1>
                {preview &&(
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            src={preview} 
                            className="card-img-top img-fluid" 
                            alt={formData.itemName} 
                            style={{ height: '200px', objectFit: 'contain' }}
                        />
                    </div>
                )}
            <div className="card-body  text-center">
                <h5 className="card-title">{formData.itemName}</h5>
                <p className="card-text">{formData.itemDescription}</p>
                <p className="card-text">{formData.nutritional_info}</p>
                <p className="card-text"><strong>Price:</strong> £{formData.itemPrice}</p>
            </div>
            </div>
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

export default CreateMenuItem;