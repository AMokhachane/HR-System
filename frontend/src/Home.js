import React, { useState } from "react";
import HomeCSS from "./Home.module.css";
import Sidebar from "./Sidebar";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("Employees");

  return (
    <div className={HomeCSS["container"]}>
      <Sidebar />
      

      {/* Main Content */}
      <div className={HomeCSS["main-content"]}>
        {/* User Profile Section */}
        <div className={HomeCSS["profile-card"]}>
          <img src="user-photo-url" alt="Profile" className={HomeCSS["profile-pic"]}/>
          <h2>Kim Da-hyun</h2>
          <p>UX Designer</p>
          <p>AKV0305 - Singapore</p>
          <p>Email: kim.d@gmail.com</p>
        </div>

        {/* Tabs Section */}
        <div className={HomeCSS["tabs-section"]}>
          <ul className={HomeCSS["tabs"]}>
            <li className={activeTab === "Employees" ? HomeCSS["active"] : ""} onClick={() => setActiveTab("Employees")}>Employees</li>
            <li className={activeTab === "Onboarding" ? HomeCSS["active"] : ""} onClick={() => setActiveTab("Onboarding")}>Onboarding</li>
            {/* Add more tabs as per design */}
          </ul>

          {/* Tab content */}
          <div className={HomeCSS["tab-content"]}>
            {activeTab === "Employees" && (
              <div>
                {/* Employee details */}
                <h3>Employment Details</h3>
                {/* Insert employee details component or HTML here */}
              </div>
            )}
            {/* Add similar sections for other tabs */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;