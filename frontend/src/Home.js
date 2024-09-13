import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeCSS from "./Home.module.css";
import Sidebar from "./Sidebar";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const [images, setImages] = useState([]);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/employee");
        setImages(response.data);
      } catch (error) {
        console.error("An error occurred while fetching employee", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className={HomeCSS["container"]}>
      <Sidebar />
      
      Main Content
      <div className={HomeCSS["main-content"]}>
        {/* User Profile Section */}
        <div className={HomeCSS["profile-card"]}>
          <img src="user-photo-url" alt="Profile" className={HomeCSS["profile-pic"]} />
          <h2>Kim Da-hyun</h2>
          <p>UX Designer</p>
          <p>AKV0305 - Singapore</p>
          <p>Email: kim.d@gmail.com</p>
        </div>

        {/* Tabs Section */}
        <div className={HomeCSS["tabs-section"]}>
          <ul className={HomeCSS["tabs"]}>
            <li
              className={activeTab === "Employees" ? HomeCSS["active"] : ""}
              onClick={() => setActiveTab("Employees")}
            >
              Employees
            </li>
            <li
              className={activeTab === "Onboarding" ? HomeCSS["active"] : ""}
              onClick={() => setActiveTab("Onboarding")}
            >
              Onboarding
            </li>
          </ul>

          {/* Tab content */}
          <div className={HomeCSS["tab-content"]}>
            {activeTab === "Employees" && (
              <div>
                {/* Employee details */}
                <h3>Employment Details</h3>
                {/* Insert employee details component or HTML here */}

                {/* Image Grid */}
                <div className={HomeCSS["image-grid"]}>
                  {images.map((image) => (
                    <div key={image.imageId} className={HomeCSS["image-item"]}>
                      <img src={image.url} alt={image.title} />
                      <h4>{image.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;