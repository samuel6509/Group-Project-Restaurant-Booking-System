import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Components/Sidebar";
import { ToastContainer } from "react-toastify";
import { usePage } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";
import { hasPermission } from "../utilities/permissions";

const AdminLayout = ({ children }) => {
    const { auth } = usePage().props;
    const permissions = auth?.permissions || [];
    const adminMenuItems = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            permission: "view-dashboard",
        },
        {
            label: "Manage Reviews",
            path: "/admin/manage-reviews",
            permission: "manage-reviews",
        },
        {
            label: "Manage Messages",
            path: "/admin/messages",
            permission: "manage-contact-us-messages",
        },
        {
            label: "Manage Members",
            path: "/admin/members",
            permission: "manage-members",
        },
        {
            label: "Manage FAQs",
            path: "/admin/faqs",
            permission: "manage-faqs",
        },
        {
            label: "Create FAQs",
            path: "/admin/faqs/create",
            permission: "create-faqs",
        },
        {
            label: "Manage Menu Items",
            path: "/admin/manage-menu",
            permission: "manage-menu-items",
        },
        {
            label: "Create Menu Items",
            path: "/admin/menu/create/item",
            permission: "create-menu-items",
        },
        {
            label: "Inventory",
            path: "/admin/inventory",
            permission: "manage-inventory",
        },
    ];

    const filteredMenuItems = adminMenuItems.filter((item) =>
        hasPermission(item.permission, permissions)
    );

    return (
        <div className="admin-container">
            <ToastContainer />
            <Helmet>
                <title>Admin Panel</title>
                <link rel="stylesheet" href="/css/admin.css" />
            </Helmet>

            {/* Sidebar with only Admin Section */}
            <Sidebar adminMenuItems={filteredMenuItems} title="Admin Panel" />

            {/* Main Content */}
            <div className="admin-main-content">{children}</div>
        </div>
    );
};

export default AdminLayout;
