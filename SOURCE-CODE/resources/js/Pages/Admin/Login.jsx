

import React from "react";
import { useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#333",
                        marginBottom: "20px",
                    }}
                >
                    Admin Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{
                                display: "block",
                                fontWeight: "bold",
                                marginBottom: "5px",
                                color: "#555",
                            }}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                        />
                        {errors.username && (
                            <span style={{ color: "red", fontSize: "14px" }}>
                                {errors.username}
                            </span>
                        )}
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            style={{
                                display: "block",
                                fontWeight: "bold",
                                marginBottom: "5px",
                                color: "#555",
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                        />
                        {errors.password && (
                            <span style={{ color: "red", fontSize: "14px" }}>
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
