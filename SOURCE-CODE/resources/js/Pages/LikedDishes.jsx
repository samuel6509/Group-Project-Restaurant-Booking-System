import React, { useState, useEffect } from "react";
import Layout from "../Layouts/GenericLayout";

const LikedDishes = () => {
    const [likedItems, setLikedItems] = useState([]);

    // fetch and map out all liked items
    useEffect(() => {
        const storedLike = JSON.parse(localStorage.getItem("likedItem")) || [];
        setLikedItems(Array.isArray(storedLike) ? storedLike : [storedLike]);
    }, []);

    return (
        <Layout>
             <div className="max-w-[80dvw] m-auto pb-10">
                <h1 className="display-6 fw-bold text-body-emphasis mb-3 text-center">Liked Items</h1>
                {likedItems.length === 0 ? (
                    <p className="text-gray-600 text-center">No liked items found.</p>
                ) : (
                    <div className="d-flex justify-content-center align-items-center ">
                 <div className="flex flex-wrap justify-center gap-6">
                        {likedItems.map((item, index) => (
                            <div
                                key={item?.itemID || index} 
                                className=" hover:scale-105 transition-all  w-[20rem] rounded-lg overflow-hidden"
                            >
                                <img
                                    src={item?.itemImageURL}
                                    alt={item?.itemName || "Liked Item"}
                                    className="w-full h-48 object-contain"
                                />
                                <div className="p-4 text-center">
                                    <h2 className="text-lg font-semibold">{item?.itemName}</h2>
                                    {item?.itemID ? (
                                        <a
                                        href={`/menuitem/${item.menuType}/${item.itemID}`}
                                            className="text-orange-500 hover:underline"
                                        >
                                            View Product
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No product link available</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default LikedDishes;
