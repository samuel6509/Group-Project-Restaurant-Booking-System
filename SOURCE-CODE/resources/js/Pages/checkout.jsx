import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/GenericLayout';
import axios from 'axios';

// Dummy card data for testing payment
const dummyCards = [
    { number: "4242424242424242", exp: "12/25", cvv: "123", name: "John Doe" },
    { number: "4000056655665556", exp: "11/26", cvv: "456", name: "Jane Smith" }
];

const Checkout = () => {
    // State variables for user, cart, and payment details
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [cardName, setCardName] = useState(dummyCards[0].name);
    const [cardNumber, setCardNumber] = useState(dummyCards[0].number);
    const [cardExp, setCardExp] = useState(dummyCards[0].exp);
    const [cardCVV, setCardCVV] = useState(dummyCards[0].cvv);
    const [error, setError] = useState('');
    
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');

    // Fetch user information (email, userID) from backend when the component mounts
    useEffect(() => {
        axios.get('/getUserInfo')
            .then(response => {
                if (response.data) {
                    setEmail(response.data.email || '');
                    setUserID(response.data.userID || null);
                }
            })
            .catch(error => console.error('Error fetching user info:', error));
    }, []);

    // Fetch cart items from backend if userID is available
    useEffect(() => {
        if (userID) {
            axios.get('/get-cart-items', { params: { userID } })
                .then(response => {
                    if (response.data.success) {
                        const updatedItems = response.data.data.map(item => ({
                            ...item,
                            total_price: Number(item.price) * Number(item.quantity) //calculating total price based on item price and item quantity
                        }));
                        setCartItems(updatedItems);
                        setTotal(updatedItems.reduce((sum, item) => sum + item.total_price, 0));
                    }
                })
                //If fetching cart items fails we return an error
                .catch(error => console.error('Error fetching cart items:', error));
        }
    }, [userID]);

    // Validate the payment card information against the dummy cards
    const validateCard = () => {
        return dummyCards.some(card => 
            card.number === cardNumber &&
            card.exp === cardExp &&
            card.cvv === cardCVV &&
            card.name.toLowerCase() === cardName.toLowerCase()
        );
    };

    // Redirect to the recent orders page after order is placed
    const recentOrdersRedirect = () => {
        console.log("Checkout redirect function has been called");
        window.location.href = 'http://127.0.0.1:8000/recentOrders';
    }

    
    // Handle form submission for placing an order
    const handlePayment = (event) => {
        event.preventDefault(); // Prevent form submission refresh
        //alert("Handle Payment function called");
    

         // Use state values directly, no need to use getElementById
         const address = document.getElementById('address').value;
         const country = document.getElementById('country').value;
         const city = document.getElementById('city').value;
         const postcode = document.getElementById('postcode').value;

        
         // Validate postcode
        if (!isPostcodeValid(postcode)) {
            setError('We can only deliver in CT1, CT2, CT3 & CT4.');
            return;
        }


        //alert(`Address: ${address}\nCountry: ${country}\nCity: ${city}\nPostcode: ${postcode}`);

    
        // Check if any of the required fields are empty
        if (!address || !country || !city || !postcode) {
            setError('Please fill in all required fields (Address, Country, City, Postcode).');
            return;
        }
    
        // Check if user is logged in
        if (!userID) {
            alert("User not logged in.");
            return;
        }
    
         // Send order data to the backend for processing
        axios.post('/place-order', { userID, address, city, postcode })
            .then(orderResponse => {
                console.log('Order response:', orderResponse.data);
                if (orderResponse.data.message === "Order placed successfully") {
                    setCartItems([]); // Clear the cart after successful order
                    setTotal(0);  // Reset total to 0
                    console.log('Payment successful! Order placed.'); // Clear saved quantities from localStorage
                    localStorage.removeItem('menuQuantities');// Remove the 'menuQuantities' item from local storage to clear the saved quantities.
                    window.dispatchEvent(new Event('cartItemDeleted')); // Dispatch a custom event named 'cartItemDeleted' to notify other components (like menu.jsx) that the cart has been cleared, allowing them to reset their state accordingly.
                    recentOrdersRedirect(); // Redirect to recent orders page
                } else {
                    alert("This is the message: " + orderResponse.data.message);
                }
            })
            .catch(error => {
                console.error('Payment error:', error);
                alert('An error occurred during checkout.');
            });
    };

    // Simple Postcode validation function
    function isPostcodeValid(postcode) {
        // List of valid postcodes prefixes
        const validPostcodes = ['CT1', 'CT2', 'CT3', 'CT4'];
        
        // Check if postcode starts with any of the valid prefixes
        const postcodePrefix = postcode.slice(0, 3).toUpperCase(); // Extract the first 3 characters
        return validPostcodes.includes(postcodePrefix);
    }
    
    
    

    return (
        <Layout>
            <div className="container">
                <main>
                    <div className="row g-5 py-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="your-cart-text text-primary">Your cart</span>
                                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                            </h4>

                            <div className="cart-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <ul className="your-cart-list list-group mb-3">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                    <h6 className="my-0">{item.name} (x{item.quantity})</h6>
                                                    <small className="text-body-secondary">{item.description}</small>
                                                </div>
                                                <strong>${item.total_price.toFixed(2)}</strong>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item text-center">Your cart is empty</li>
                                    )}
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (USD)</span>
                                        <strong>${total.toFixed(2)}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Delivery address</h4>
                            <form className="needs-validation" noValidate onSubmit={handlePayment}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="you@example.com" 
                                            value={email} 
                                            readOnly 
                                            required 
                                        />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="1234 Main St"
                                            value={address} // bind the input field to the state
                                            onChange={(e) => setAddress(e.target.value)} // update the state on change
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>


                                    <div className="col-md-5">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select
                                            className="form-select"
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option>United Kingdom</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid country.
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="state" className="form-label">City</label>
                                        <select
                                            className="form-select"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option>Canterbury</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid city.
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="zip" className="form-label">Postcode</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="postcode"
                                            value={postcode}
                                            onChange={(e) => setPostcode(e.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Postcode required.
                                        </div>
                                    </div>
                                </div>


                                <hr className="my-4" />

                                {/* Payment section */}
                                <h4 className="mb-3">Payment</h4>
                                <div>
                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <div className="my-3">
                                        <div className="form-check">
                                            <input
                                                id="debit"
                                                name="paymentMethod"
                                                type="radio"
                                                className="form-check-input"
                                                required
                                                defaultChecked
                                            />
                                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cc-name"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Name on card required
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cc-number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Credit card number required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cc-expiration"
                                                value={cardExp}
                                                onChange={(e) => setCardExp(e.target.value)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Expiration date required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cc-cvv"
                                                value={cardCVV}
                                                onChange={(e) => setCardCVV(e.target.value)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                CVV required
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />
                                    <button
                                        className="w-100 btn btn-primary btn-lg"
                                        type="submit"
                                        disabled={!address || !country || !city || !postcode || !validateCard()}
                                    >
                                        Confirm Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default Checkout;