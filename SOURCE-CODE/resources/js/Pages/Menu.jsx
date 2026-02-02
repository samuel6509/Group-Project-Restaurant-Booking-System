import { Link } from '@inertiajs/react';
import Layout from '../Layouts/GenericLayout';
import React, { useState, useEffect } from 'react';

// The props being passed to this page: menuType, menuTitle, and menuDescription
const Menu = ({ menuType, menuTitle, menuDescription }) => {
    // setting the states of attributes that expect it
    const [menuItems, setMenuItems] = useState([]); // State to hold the menu items fetched from the server
    const [category, setCategory] = useState('starter'); // State to manage the selected category (starter, main, dessert)
    const [loading, setLoading] = useState(true);  // State to manage the loading status of the page
    const [userInfo, setUserInfo] = useState(null);  // State to store the user information (such as user ID)
    const [userID, setUserID] = useState(null); // State to store the user ID, which will be used for cart operations
    
    // State to manage the quantities of the items added to the cart.
    // The initial state checks localStorage for previously saved quantities
    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('menuQuantities');
        return savedQuantities ? JSON.parse(savedQuantities) : {};
    });
console.log(menuItems)

    // Effect hook to persist the quantities in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('menuQuantities', JSON.stringify(quantities));
    }, [quantities]);

    // Effect hook to fetch user information when the component mounts
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/user-info-all'); //Make a api call to fetch the user info (sends a GET request to the specified URL)
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data); // Update the state with the user information received from the API
                    setUserID(data.userID); //setting the user id
                    console.log("Got user info");
                } else {
                    console.error('Failed to fetch user info'); //error message
                }
            } catch (error) {
                console.error('Error fetching user info:', error); //error message if request fails
            }
        };

        fetchUserInfo();
    }, []);

    // how the menu items are rendered for the chosen menu category and type
    // async means the page does not refresh when the data is fetched
    useEffect(() => {
        // Define an asynchronous function to fetch menu items based on the current category and menu type
        const fetchedItems = async () => {
            setLoading(true); // Set loading state to true while fetching data
            try {
                const url = `/menu/${menuType}?itemType=${category}`; 
                console.log('Fetching data from:', url);
                const response = await fetch(url); // Make the API call to fetch menu items
                const data = await response.json(); // Parse the response data to JSON
                setMenuItems(data); // Set the menu items state with the fetched data
            } catch (error) {
                console.error('Error loading the menu items:', error);
            } finally {
                setLoading(false); // Set loading state to false once the fetch is complete (success or failure)
            }
        };

        fetchedItems(); // Invoke the async function to fetch the menu items
    }, [category, menuType]);

    const handleQuantityChange = (itemID, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [itemID]: Math.max(1, newQuantity),
        }));
    };

    useEffect(() => {
        // Function to update quantities from localStorage when an item is deleted from the cart
        const handleCartItemDeleted = () => {
            const updatedQuantities = JSON.parse(localStorage.getItem('menuQuantities')) || {};
            setQuantities(updatedQuantities); // Update quantities state
        };

        // Add event listener for when an item is deleted from the cart
        window.addEventListener("cartItemDeleted", handleCartItemDeleted);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("cartItemDeleted", handleCartItemDeleted);
        };
    }, []); // Only run once on mount

    // Function to handle adding an item to the cart
    const handleAddToCart = async (itemID) => {
        if (!userID) {
            alert('You need to be logged in to add items to the cart.'); // Alert if user is not logged in
            return;
        }

        const quantity = quantities[itemID] || 1; // Get the quantity of the item
        const requestData = { itemID, quantity, menuType, userID }; // Prepare request data

        console.log('Request Data:', JSON.stringify(requestData));

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Get CSRF token

        try {
            // Make POST request to add item to the cart
            const response = await fetch('/add-to-cart', {
                method: 'POST',
                body: JSON.stringify(requestData), // Send item data
                headers: {
                    'Content-Type': 'application/json',  // Content type for the request
                    'X-CSRF-TOKEN': csrfToken, // CSRF token for security
                },
            });

            console.log('Response Status:', response.status); // Log the response status

             // If response is not OK, throw an error
            if (!response.ok) {
                const errorData = await response.json(); // Get error details
                throw new Error(`Server responded with status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json(); // Get response data
            if (data.success) {
                alert('Item added to cart'); //item added to cart
            } else {
                alert(`Error adding item to cart: ${data.message || 'Please try again.'}`); //error adding item to cart
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);  // Log any error that occurs
            alert('There was an issue adding the item to the cart. Please try again.');
        }
    };

    // shown when loading menu items as it can take abit iff theres lots of items
    const renderItems = () => {
        if (loading) {
            return <p>Loading...</p>;
        }
        // if no menu items are found
        if (menuItems.length === 0) {
            return <p>No items found.</p>;
        }
        // maps through the recieved menu items and puts them on the page in their own card elements
        return menuItems?.map((item) => (
            <div key={item.itemID} className="col-md-4 mb-3 d-flex justify-content-center">
                <div className="card" style={{ width: '18rem' }}>
                    <Link href={`/menuitem/${menuType}/${item.itemID}`} alt=''>
                        <img
                            src={item.itemImageURL}
                            className="card-img-top img-fluid"
                            alt={item.itemName}
                            style={{ height: '200px', objectFit: 'contain' }}
                        />
                    </Link>

                    <div className="card-body text-center">
                        <h5 className="card-title">{item.itemName}</h5>
                        <p className="card-text">{item.itemDescription}</p>
                        <p className="card-text">
                            <strong>Price:</strong> £{item.itemPrice.toFixed(2)}
                        </p>

                        <div className="d-flex justify-content-center align-items-center mb-2">
                            <button
                                className="btn btn-secondary me-1"
                                onClick={() => handleQuantityChange(item.itemID, (quantities[item.itemID] || 1) - 1)}
                            >
                                −
                            </button>
                            <span style={{ minWidth: '40px', textAlign: 'center' }}>
                                {quantities[item.itemID] || 1}
                            </span>
                            <button
                                className="btn btn-secondary ms-2"
                                onClick={() => handleQuantityChange(item.itemID, (quantities[item.itemID] || 1) + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(item.itemID)}
                            data-testid="add-to-cart-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <Layout>
            <h2
                className="display-6 fw-bold text-body-emphasis mb-3 text-center"
                id="registerHeading"
            >
                {menuTitle}
            </h2>
            <p className="registrationInfo">{menuDescription}</p>
            {userInfo && (
                <p className="text-center">
                    Welcome, {userInfo?.firstName} {userInfo?.lastName}!
                </p>
            )}
            {/* buttons which change which part of the menu is rendered */}
            <div className="d-flex justify-content-center align-items-center">
                <button
                    type="button"
                    className={`btn btn-primary btn-outline-secondary btn-lg me-3 ${category === 'starter' && 'active'}`}
                    onClick={() => setCategory('starter')}
                >
                    Starter
                </button>
                <button
                    type="button"
                    className={`btn btn-primary btn-outline-secondary btn-lg me-3 ${category === 'main' && 'active'}`}
                    onClick={() => setCategory('main')}
                >
                    Main
                </button>
                <button
                    type="button"
                    className={`btn btn-primary btn-outline-secondary btn-lg ${category === 'dessert' && 'active'}`}
                    onClick={() => setCategory('dessert')}
                >
                    Dessert
                </button>
            </div>
            <div className="row">{renderItems()}</div>
        </Layout>
    );
};

export default Menu;
