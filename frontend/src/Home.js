import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
import Sidebar from './Sidebar';
import axios from 'axios';
import { Image } from "cloudinary-react";
import { Link } from 'react-router-dom'; // Add this import

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // Assuming this is still needed
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/Employee");
        setEmployees(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching employees.');
      } finally {
        setLoading(false);
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

      <div className={HomeCSS.rightSide}>
        {loading ? (
          <div>Loading...</div>
        ) : error.length ? (
          <div className={HomeCSS.error}>{error}</div>
        ) : (
          <div className={HomeCSS.employeeListContainer}>
            <div className={HomeCSS.employeeCardContainer}>
              {employees.map((employee) => (
                <div key={employee.identityNumber} className={HomeCSS.employeeCard}>
                  <img
                    src={employee.url} // Assuming pictureUrl is a property in employee object
                    alt={`${employee.name} ${employee.surname}`}  
                    className={HomeCSS.employeeImage}
                  />
                  <div className={HomeCSS.employeeInfo}>
                    <h2>
                      <Link to={`/employee/${employee.employeeId}`}> {/* Fixed URL template string */}
                        {employee.name} {employee.surname}
                      </Link>
                    </h2>
                    <p>Email: {employee.email}</p>
                    <p>Gender: {employee.gender}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Home;