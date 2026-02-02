// // import React from "react";

// // const Dashboard = () => {
// //     return (
// //         <div>
// //             <h1>Admin Dashboard</h1>
// //             <p>Welcome, Admin!</p>
// //         </div>
// //     );
// // };

// // export default Dashboard;


// import React from "react";
// import { Inertia } from "@inertiajs/inertia";

// const Dashboard = () => {
//     const handleLogout = () => {
//         // Trigger the logout action
//         Inertia.post("/admin/logout");
//     };

//     return (
//         <div style={styles.container}>
//             {/* Sidebar */}
//             <div style={styles.sidebar}>
//                 <h2 style={styles.sidebarTitle}>Admin Panel</h2>
//                 <ul style={styles.sidebarMenu}>
//                     <li style={styles.sidebarItem}>
//                         <a
//                             href="/admin/manage-reviews"
//                             style={styles.sidebarLink}
//                         >
//                             Manage Reviews
//                         </a>
//                     </li>
//                     <li style={styles.sidebarItem}>
//                         <button
//                             onClick={handleLogout}
//                             style={styles.logoutButton}
//                         >
//                             Logout
//                         </button>
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div style={styles.mainContent}>
//                 <h1 style={styles.header}>Admin Dashboard</h1>
//                 <p style={styles.paragraph}>Welcome, Admin!</p>
//             </div>
//         </div>
//     );
// };

// // Inline styles
// const styles = {
//     container: {
//         display: "flex",
//         height: "100vh",
//         fontFamily: "Arial, sans-serif",
//     },
//     sidebar: {
//         width: "250px",
//         backgroundColor: "#333",
//         color: "#fff",
//         padding: "20px",
//         boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
//     },
//     sidebarTitle: {
//         fontSize: "24px",
//         marginBottom: "20px",
//     },
//     sidebarMenu: {
//         listStyleType: "none",
//         padding: 0,
//     },
//     sidebarItem: {
//         marginBottom: "15px",
//     },
//     sidebarLink: {
//         color: "#fff",
//         textDecoration: "none",
//         fontSize: "18px",
//         display: "block",
//         padding: "10px",
//         borderRadius: "4px",
//         backgroundColor: "#444",
//         transition: "background-color 0.3s",
//     },
//     sidebarLinkHover: {
//         backgroundColor: "#555",
//     },
//     logoutButton: {
//         backgroundColor: "#ff4d4f",
//         color: "#fff",
//         border: "none",
//         padding: "10px 15px",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "16px",
//         width: "100%",
//     },
//     logoutButtonHover: {
//         backgroundColor: "#e60000",
//     },
//     mainContent: {
//         flex: 1,
//         padding: "20px",
//     },
//     header: {
//         fontSize: "32px",
//         color: "#333",
//         marginBottom: "10px",
//     },
//     paragraph: {
//         fontSize: "18px",
//         color: "#666",
//     },
// };

// export default Dashboard;

import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>
            <h1 style={{ fontSize: "28px", color: "#333" }}>Admin Dashboard</h1>
            <p style={{ fontSize: "18px", color: "#666" }}>Welcome, Admin!</p>
        </AdminLayout>
    );
};

export default Dashboard;
