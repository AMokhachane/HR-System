import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
import Sidebar from './Sidebar';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // Assuming this is still needed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5239/api/Employee');
        setEmployees(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching employees.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={HomeCSS.container}>
      <div className={HomeCSS.sidebarContainer}>
        <Sidebar />
      </div>

      <div className={HomeCSS.mainContent}>
        <div className={HomeCSS.header}>
          <InputGroup className={HomeCSS.searchBar}>
            <FormControl
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>

          <div className={HomeCSS.userInfo}>
            <FaUserCircle size={30} />
            <span className={HomeCSS.userName}>Team Temu</span>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className={HomeCSS.error}>{error}</div>
        ) : (
          <div className={HomeCSS.employeeGrid}>
            {filteredEmployees.map((employee) => (
              <Card key={employee.identityNumber} className={HomeCSS.employeeCard}>
                <div className={HomeCSS.cardContent}>
                  <img
                    src={employee.url || 'placeholder-image-url'} // Placeholder if no image is available
                    alt={`${employee.name} ${employee.surname}`}
                    className={HomeCSS.employeeImage}
                  />
                  <div className={HomeCSS.employeeDetails}>
                    <h5>{`${employee.name} ${employee.surname}`}</h5>
                    <p>{employee.jobTitle}</p>
                    <p>{employee.phoneNumber}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;