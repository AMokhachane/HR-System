import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
import Sidebar from './Sidebar';
import axios from 'axios';
import { Image } from "cloudinary-react";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/employee");
        setEmployees(response.data);
      } catch (error) {
        console.error("An error occurred while fetching images", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className={HomeCSS.container}>
      <div className={HomeCSS.leftSide}>
        <div className={HomeCSS.sidebar}>
          <Sidebar />
        </div>
      </div>
      
      <div className={HomeCSS.imageContainer}>
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              className={HomeCSS.uploadedImage}
              cloudName="drgxphf5l"
              publicId={url}
            />
          ))}
        </div>
    </div>
  );
};

export default Home;