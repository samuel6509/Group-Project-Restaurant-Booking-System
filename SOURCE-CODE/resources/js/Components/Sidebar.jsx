import React from "react";
import Dropdown from "@/Components/Dropdown";

const Sidebar = ({ superAdminMenuItems = [], adminMenuItems = [], title }) => {
    const currentPath = window.location.pathname;

    return (
        <div className="sidebar">
            <h2 className="sidebarTitle">{title}</h2>
            <ul className="sidebarMenu">
                {/* Super Admin Menu Items */}
                {superAdminMenuItems.map((item) => (
                    <li
                        key={item.path}
                        className={`sidebarItem ${
                            currentPath === item.path ? "active" : ""
                        }`}
                    >
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}

                {/* Divider Line */}
                {superAdminMenuItems.length > 0 &&
                    adminMenuItems.length > 0 && (
                        <li className="sidebarDivider">
                            <hr />
                            <br />
                        </li>
                    )}

                {/* Admin Menu Items */}
                {adminMenuItems.map((item) => (
                    <li
                        key={item.path}
                        className={`sidebarItem ${
                            currentPath === item.path ? "active" : ""
                        }`}
                    >
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>

            <div className="logoutContainer">
                <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="logoutButton"
                >
                    Log Out
                </Dropdown.Link>
            </div>
        </div>
    );
};

export default Sidebar;
