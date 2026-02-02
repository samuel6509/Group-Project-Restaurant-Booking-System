import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/GenericLayout';
import axios from 'axios';

const RecentOrders = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userID, setUserID] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch user info on component mount
        axios.get('/user-info')
            .then(response => {
                setUserID(response.data.userID); // Set user ID
                setUserInfo(response.data); // Set user info
            })
            .catch(error => console.error('Error fetching user info:', error));
    }, []);

    useEffect(() => {
        // Fetch orders when user ID is available
        if (!userID) return;

        axios.post('/orders', { userID })
            .then(response => {
                // Set orders from the API response
                setOrders(response.data.data || []);

                // Scroll to bottom when new orders arrive
                setTimeout(() => {
                    const container = document.querySelector('.order-list-container');
                    if (container) container.scrollTop = container.scrollHeight;
                }, 100);
            })
            .catch(error => console.error('Error fetching recent orders:', error));
    }, [userID]);

    return (
        <Layout>
            <section className="py-5 d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: '700px' }}>
                    <h2 className="h2 order-History-Title text-center mb-4">Order History</h2>

                    {/* Scrollable Order List */}
                    <div 
                        className="order-list-container" 
                        style={{
                            maxHeight: '500px',  // Limit height
                            overflowY: 'auto',   // Enable vertical scrolling
                            padding: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: '10px', 
                            backgroundColor: '#fff'
                        }}
                    >
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="border p-3 rounded shadow-sm bg-white mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="h5 font-weight-bold">Order #{order.id}</h3>
                                        <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="small text-muted">
                                        Date: {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                                    </p>
                                    <p className="small text-dark font-weight-bold">
                                        Total: ${parseFloat(order.total_price).toFixed(2)}
                                    </p>
                                    <p className="small text-muted">
                                        Items: {order.order_items?.length} item(s)
                                    </p>

                                    {/* Address Details */}
                                    <div className="bg-light delivery-address p-2 rounded">
                                        <h6 className="mb-1 text-dark">Delivery Address</h6>
                                        <p className="small mb-0 text-muted">
                                            {order.address}, {order.city}, {order.postcode.toUpperCase()}
                                        </p>
                                    </div>

                                    <ul className="list-group mt-2">
                                        {order.order_items?.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="mb-0">{item.item_name} (x{item.quantity})</h6>
                                                    <p className="small text-muted">{item.item_description || "No description available."}</p>
                                                    <span className="badge bg-info">{item.menu_type.replace('_', ' ')}</span>
                                                </div>
                                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No recent orders found.</p>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default RecentOrders;
