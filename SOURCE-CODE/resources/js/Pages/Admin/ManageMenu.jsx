// page that gets all the menu items and displays them in a grid format
// can choose between menus
// follows style of other pages on admin panel
import AdminLayout from "../../Layouts/AdminLayout";
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const ManageMenu = ({success}) => 
{
    // gets menu items & type from the backend
    const { menuItems, menuType } = usePage().props
    const [items, setItems] = useState(menuItems || [])
    const [currentMenu, setCurrentMenu] = useState(menuType || 'morning_menu')

    // function used by buttons to get the correct menus items
    const handleMenuClick = (menuType) => 
    {
        Inertia.get(`/admin/manage-menu/${menuType}`, {}, 
        {
            onSuccess: (page) => 
            {
                // put the items got from this link onto the page
                setItems(page.props.menuItems)
                setCurrentMenu(menuType)
            }
        })
    }

    // function that deltes the desired menu item
    const handleDelete = (id) => 
    {
        if (confirm("Are you sure you want to delete this item?")) 
        {
            Inertia.delete(`/admin/manage-menu/${currentMenu}/${id}`)
        }
    }

    // function for changing the page
    const handlePageChange = (url) => 
    {
        if (url) 
        {
            Inertia.get(url)
        }
    }
    console.log(success)
    return (
        <AdminLayout>
            <div style={{textAlign: "center"}}>
                {/* success message for letting user know menu item was editted or deleted successfully */}
                {success && 
                (
                    <span style={styles.success}>{success}</span>
                )}
                                    
            </div>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ fontSize: "28px", color: "#333" }}>
                    Manage Menu Items
                </h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    {/* when button is clicked delete that specific menu item */}
                        <button
                            type="button"
                            style={styles.deleteButton}
                            onClick={() => handleMenuClick("morning_menu")}
                        >
                            Morning Menu
                        </button>
                        <button
                            type="button"
                            style={styles.deleteButton}
                            onClick={() => handleMenuClick("evening_menu")}
                        >
                            Evening Menu
                        </button>
                        <button
                            type="button"
                            style={styles.deleteButton}
                            onClick={() => handleMenuClick('kids_menu')}
                        >
                            Kids Menu
                        </button>
                        <span>
                            {/* regular expression gets first letter of each word & capitalises it */}
                            Currently Viewing: {currentMenu.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                        </span>
                    </div>
                    {/* table styling, for the menu items to be rendered on */}
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            {/* all the row names */}
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Nutrition</th>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* maps all menu items onto the table */}
                    {items.data.map((item, index) => (
                            <tr key={item.id}>
                                {/* makes index continue across all pages rather than resetting */}
                                <td style={styles.td}>{index + 1 + (items.current_page - 1) * items.per_page}</td>
                                <td style={styles.td}>{item.itemName}</td>
                                <td style={styles.td}>{item.itemPrice}</td>
                                <td style={styles.td}>{item.itemType}</td>
                                <td style={styles.td}>{item.itemDescription}</td>
                                <td style={styles.td}>{item.nutritional_info}</td>

                                
                                <td style={styles.td}>{item.itemImageURL ? (
                                <img src={`/${item.itemImageURL}`}
                                     alt={item.itemName}
                                     style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px',}}
                                />
                                // error handling for when no image is present 
                                ) : ("No Image")}</td>
                                <td style={styles.td}>
                                    <a
                                        href={`/admin/manage-menu/${currentMenu}/${item.itemID}/edit`}
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </a>
                                    <button
                                        onClick={() => handleDelete(item.itemID)}
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
                    {items.links.map((link, index) => 
                    (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            style=
                            {{
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
    )
}
// same styling as other pages on admin panel
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
    success:
    {
        color: "green",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
};

export default ManageMenu;