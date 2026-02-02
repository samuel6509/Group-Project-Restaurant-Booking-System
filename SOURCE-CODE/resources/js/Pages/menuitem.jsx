import React, { useState, useEffect } from "react";
import Layout from "../Layouts/GenericLayout";
import NewLayout from "../Layouts/NewLayout";
import { FaInfoCircle, FaMinus, FaPlus } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import { useParams } from "react-router-dom";

const Tag = (props) => <span className="tag">{props.children}</span>;

const isExpired = (timestamp) => {
    return Date.now() > timestamp;
};

const MenuItem = () => {
    const [loading, setLoading] = useState(false);
    const { menuType, itemID } = useParams();
    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('menuQuantities');
        return savedQuantities ? JSON.parse(savedQuantities) : {};
    });
    const [userInfo, setUserInfo] = useState(null);
    const [userID, setUserID] = useState(null);
    const { menuItem } = usePage().props;
    const [liked, setLiked] = useState(false);
    
    isExpired
    useEffect(() => {
        localStorage.setItem('menuQuantities', JSON.stringify(quantities));
    }, [quantities]);

    // get specific liked item to indicate
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likedItem")) || [];
        const validLikes = storedLikes.filter(item => !isExpired(item.expiresAt));
        localStorage.setItem("likedItem", JSON.stringify(validLikes));
        const isLiked = validLikes.some(item => item.itemID === menuItem.itemID);
        setLiked(isLiked);
    }, [menuItem]);

    // fetch user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/user-info-all');
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    setUserID(data.userID);
                    console.log("Got user info");
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleQuantityChange = (itemID, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [itemID]: Math.max(1, newQuantity),
        }));
    };

    // add liked dishes
    const toggleLike = () => {
        const storedLikes = JSON.parse(localStorage.getItem("likedItem")) || [];
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

        const existingIndex = storedLikes.findIndex(item => item.itemID === menuItem.itemID);

        const menuType = window.location.pathname.split("/")[2];

        if (existingIndex !== -1) {
            storedLikes.splice(existingIndex, 1);
            setLiked(false);
        } else {
            storedLikes.push({ ...menuItem, menuType, expiresAt });
            setLiked(true);
        }

        localStorage.setItem("likedItem", JSON.stringify(storedLikes));
    };

    // Share Button Functionality
    const shareItem = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: menuItem.itemName,
                    text: menuItem.itemDescription,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert("Sharing is not supported in your browser.");
        }
    };

    // Add to Cart Functionality
    const handleAddToCart = async (itemID) => {

        if (!userID) {
            alert('You need to be logged in to add items to the cart.');
            return;
        }

        const menuType = window.location.pathname.split("/")[2];

        const quantity = quantities[itemID] || 1;
        const requestData = { itemID, quantity, menuType, userID };

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch('/add-to-cart', {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Server responded with status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                alert('Item added to cart');
            } else {
                alert(`Error adding item to cart: ${data.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            console.log(error)
            alert('There was an issue adding the item to the cart. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="checkout-main">
                <section className="intro">
                    <div className="image-views">
                        <img
                            src={`http://127.0.0.1:8000/${menuItem.itemImageURL}`}
                            alt={menuItem.itemName}
                            className="w-full h-full object-contain"
                        />
                        
                    </div>
                    <div className="details">
                        <h1 className="name poppins-semibold">
                            {menuItem?.itemName}
                        </h1>
                        <p className="sh-desc poppins-medium">
                            {menuItem?.itemDescription}
                        </p>
                        <div className="line"></div>
                        <div className="price-hold">
                            <p className="price poppins-semibold">
                                £{menuItem?.itemPrice}
                            </p>
                        </div>
                        <div className="inf-1">
                            <div>
                                <i className="fa fa-regular fa-star"></i>
                                <span>4.6</span>
                            </div>
                            <div>
                                <i className="fas fa-shipping-fast"></i>
                                <span>60% off</span>
                            </div>
                            <div>
                                <i className="fa fa-regular fa-clock"></i>
                                <span>&lt;20mins</span>
                            </div>
                        </div>
                        <div className="tags">
                            <Tag>Roast</Tag>
                            <Tag>Top selling</Tag>
                            <Tag>Tasty</Tag>
                            <Tag>Healthy</Tag>
                        </div>
                        <div className="status">
                            <p className="stat">
                                <i className="fa fa-regular fa-check-circle"></i>{" "}
                                Available
                            </p>
                        </div>
                        <div className="action">
                            <button
                                onClick={toggleLike}
                                className={`pact  ${liked ? "text-red-500" : ""
                                    } `}
                            >
                                <i className="fa fa-heart fa-lg"></i>
                            </button>
                            <button onClick={shareItem} className="pact">
                                <i className="fa fa-share fa-lg"></i>
                            </button>
                        </div>
                    </div>
                </section>
                <aside id="asd">
                    <div className="box">
                        <div className="config">
                            <div className="conf">
                                <p className="head poppins-semibold">
                                    Nutritional Info
                                </p>
                                <div className="cont set-size">
                                    <p className="sh-desc poppins-medium flex item-center gap-4">
                                        <FaInfoCircle className="text-blue-500 w-6 h-6" />
                                        {menuItem?.nutritional_info}
                                    </p>
                                </div>
                            </div>
                            {/** <div className="conf">
                                <p className="head poppins-semibold">
                                    Toppings / add-ons
                                </p>
                                <div className="cont set-toppings">
                                    <Addon title={"Vegetables"} price={0.68} />
                                    <Addon title={"Hot Sauce"} price={0.91} />
                                </div>
                            </div> */}
                            <div className="conf">
                                <p className="head poppins-semibold">
                                    Special Instructions
                                </p>
                                <div className="cont sp-instructions">
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="end">
                            <div className="final">
                                <p className="fprice">£{menuItem?.itemPrice}</p>
                                <div className="conf-amt">

                                    <button
                                        className="btn btn-secondary me-1 text-gray-800"
                                        onClick={() => handleQuantityChange(menuItem.itemID, (quantities[menuItem.itemID] || 1) - 1)}
                                    >
                                        <FaMinus className="text-black" />
                                    </button>
                                    <span style={{ minWidth: '40px', textAlign: 'center' }}>
                                        {quantities[menuItem.itemID] || 1}
                                    </span>
                                    <button
                                        className="btn btn-secondary text-gray-800 ms-2"
                                        onClick={() => handleQuantityChange(menuItem.itemID, (quantities[menuItem.itemID] || 1) + 1)}
                                    >
                                        <FaPlus className="text-black" />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddToCart(menuItem?.itemID)}
                                className="add border"
                            >
                                {loading ? (
                                    "Adding..."
                                ) : (
                                    <>
                                        <i className="fa fa-shopping-cart"></i>{" "}
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </Layout>
    );
};

export default MenuItem;

