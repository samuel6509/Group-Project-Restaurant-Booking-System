import React, { useState, useEffect } from 'react';
import Layout from '../Layouts/GenericLayout';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState(null); // State to store the cart data fetched from the server
    const [userID, setUserID] = useState(null); // State to store the user ID for identifying the current user
    const [clickedItem, setClickedItem] = useState(null); // State to track the clicked item for visual effect when deleting an item
    const [flashingItem, setFlashingItem] = useState(null);


    useEffect(() => {// Effect to fetch user information (userID) when the component mounts
         // Request to fetch user info
        axios.get('/user-info')
            .then(response => setUserID(response.data.userID))
            .catch(error => console.error('Error fetching user info:', error));
    }, []);

    // Effect to fetch the cart data when userID is available
    useEffect(() => {
        if (!userID) return; // If no userID, don't fetch cart data

        // Request to fetch cart data based on the userID
        axios.get(`/cart/${userID}`)
            .then(response => setCart(response.data.data)) // Set cart data from the response
            .catch(error => console.error('Error fetching cart:', error)); // Handle any errors
    }, [userID]); // Dependency array ensures this runs every time userID changes

     // Calculate the total price of items in the cart
    const cartTotal = cart?.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

     // Redirect to the checkout page if user is logged in
    const checkoutRedirect = () => {
        if (userID) {
            window.location.href = '/checkout';
        } else {
            alert('Sign in to access checkout');
        }
    };

    //When the handle delete button is pressed, this function controls deleting that item from database, and returning quantity to one
    const handleDeleteButton = async (itemID) => {
        // Set clickedItem to show visual effect of the delete button being clicked - last for 300ms
        setClickedItem(itemID);
        setTimeout(() => setClickedItem(null), 300);
    
        try {
            if (!userID) {
                alert('Please log in to modify the cart.');
                return;
            }
    
            // Request to delete the item from the cart
            const response = await axios.delete(`/cart/item/${itemID}`, { data: { userID } });
    
            if (response.data.success) {
                // Remove deleted item from cart state
                setCart((prevCart) => ({
                    ...prevCart,
                    items: prevCart.items.filter(item => item.item_id !== itemID)
                }));
    
                // Reset quantity in localStorage
                const updatedQuantities = JSON.parse(localStorage.getItem('menuQuantities')) || {};
                updatedQuantities[itemID] = 1;
                localStorage.setItem('menuQuantities', JSON.stringify(updatedQuantities));
    
                // Dispatch a custom event to notify Menu.jsx
                window.dispatchEvent(new Event("cartItemDeleted"));
            } else {
                alert(response.data.message); // Alert if delete operation failed
            }
        } catch (error) {
            console.error('Error deleting item:', error); // Log error if deletion fails
            alert('Failed to remove item.'); // Alert user if deletion fails
        }
    };
    
    //This function handles when the cart quantity button is pressed, it increases or decreases the quantity by one
    const handleQuantityChange = async (itemID, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
    
        try {
            // Request to update the quantity of the item in the cart
            const response = await axios.put(`/cart/update-quantity`, {
                itemID,
                userID,
                quantity: newQuantity
            });
    
            if (response.data.success) {
                // Update cart state to with the new quantity
                setCart(prevCart => ({
                    ...prevCart,
                    items: prevCart.items.map(item =>
                        item.item_id === itemID ? { ...item, quantity: newQuantity } : item
                    )
                }));
    
                // Update localStorage with the new quantity
                const updatedQuantities = JSON.parse(localStorage.getItem('menuQuantities')) || {};
                updatedQuantities[itemID] = newQuantity;
                localStorage.setItem('menuQuantities', JSON.stringify(updatedQuantities));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity.');
        }
    };
    

    // The component returns JSX after all the logic above
    return (
        <Layout>
            <div className="container-fluid page-header pt-5 pb-3">
                <h1 className="cart-text text-center text-white display-6">Cart</h1>
            </div>

            <div className="container-fluid">
                <div className="container py-5">
                    <div className="table-container" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th scope="col">Meals</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart ? (
                                    cart.items.length > 0 ? (
                                        cart.items.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.item_image_url}
                                                            className="img-fluid me-5 rounded-circle"
                                                            style={{ width: '80px', height: '80px' }}
                                                            alt={item.item_name}
                                                        />
                                                    </div>
                                                </th>
                                                <td>
                                                    <p className="mb-0 mt-4">{item.item_name}</p>
                                                    <p className="text-muted">{item.item_description}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">{item.price} $</p>
                                                </td>
                                                <td>
                                                    <div className="input-group quantity mt-4" style={{ width: '50px' }}>
                                                    <input
                                                        type="number"
                                                        className="form-control cart-quantity form-control-sm text-center border-0"
                                                        style={{ backgroundColor: "transparent" }}
                                                        value={item.quantity}
                                                        min="1"
                                                        onChange={(e) => handleQuantityChange(item.item_id, e.target.value)}
                                                    />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">{(item.price * item.quantity).toFixed(2)} $</p>
                                                </td>
                                                <td>
                                                    <button
                                                        className={`btn btn-md delete-cart-item-button rounded-circle bg-light border mt-4 ${
                                                            clickedItem === item.item_id ? 'flash-red' : ""
                                                        }`}
                                                        onClick={() => handleDeleteButton(item.item_id)}
                                                    >
                                                        <i className="fa fa-times cross-symbol text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">Your cart is empty.</td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="cart-login-null text-center">Login to access cart.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="row g-4 justify-content-end">
                        <div className="col-8"></div>
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4 cart-total-container">
                            <div className="bg-light rounded cart-total">
                                <div className="p-4">
                                    <h1 className="display-6 mb-1">
                                        Cart <span className="fw-normal">Total</span>
                                    </h1>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${cartTotal || '0.00'}</p>
                                </div>
                                <button
                                    className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                                    type="button"
                                    disabled={cart?.items.length === 0}
                                    onClick={checkoutRedirect}
                                >
                                    Proceed Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
