import React from "react";
import { Link } from "react-router-dom"; // Import Link to navigate between routes
import SidebarCSS from "./Sidebar.module.css"; // Import the CSS for the sidebar

export const Sidebar = () => {
  return (
    <div className={SidebarCSS.sidebar}>
      <ul className={SidebarCSS.menu}>
	  <li>
		<Link to="/home">Home</Link>
        </li>
        <li>
		<Link to="/view-profile">View Profile</Link>
        </li>
        <li>
		<Link to="/add-employee">Add New Employee</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;