import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../Components/Sidebar";
import { ToastContainer } from "react-toastify";
import { usePage } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";
import { hasPermission } from "../utilities/permissions";

const SuperAdminLayout = ({ children }) => {
    const { auth } = usePage().props;
    const permissions = auth?.permissions || [];
    const superAdminMenuItems = [
        { label: "Dashboard", path: "/super-admin/dashboard" },
        { label: "Manage Roles", path: "/super-admin/manage-roles" },
        { label: "Manage Permissions", path: "/super-admin/permissions" },
        { label: "Assign Permissions", path: "/super-admin/assign-permission" },
    ];

    const adminMenuItems = [
        {
            label: "Admin Dashboard",
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
    ];

    const filteredMenuItems = adminMenuItems.filter((item) =>
        hasPermission(item.permission, permissions)
    );

    return (
        <div className="admin-container">
            <ToastContainer />
            <Helmet>
                <title>Super Admin Panel</title>
                <link rel="stylesheet" href="/css/admin.css" />
                <link rel="stylesheet" href="/css/superadmin.css" />
            </Helmet>

            {/* Sidebar with Super Admin & Admin Sections */}
            <Sidebar
                superAdminMenuItems={superAdminMenuItems}
                adminMenuItems={filteredMenuItems}
                title="Super Admin Panel"
            />

            {/* Main Content */}
            <div className="admin-main-content">{children}</div>
        </div>
    );
};

export default SuperAdminLayout;
