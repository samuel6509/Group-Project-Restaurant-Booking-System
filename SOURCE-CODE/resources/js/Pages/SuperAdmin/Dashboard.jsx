import React from "react";
import SuperAdminLayout from "../../Layouts/SuperAdminLayout";

const Dashboard = () => {
    return (
        <SuperAdminLayout>
            <h1 className="dashboard-heading">Super Admin Dashboard</h1>
            <p className="dashboard-subtext">Welcome, Super Admin!</p>
        </SuperAdminLayout>
    );
};

export default Dashboard;
