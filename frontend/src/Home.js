import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
import Sidebar from './Sidebar';
import axios from 'axios';
import { Image } from "cloudinary-react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
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

  // Filter employees based on the search term
  const filteredEmployees = employees.filter(employee =>
    `${employee.name} ${employee.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        ) : error ? (
          <div className={HomeCSS.error}>{error}</div>
        ) : (
          <Container>
            {/* Search Bar */}
            <InputGroup className={`mb-4 ${HomeCSS.inputBox}`}>
              <InputGroup.Text>
                <FaSearch className={HomeCSS.icon} />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={HomeCSS.searchBar}
              />
            </InputGroup>

            {/* Employee List */}
            <div className={HomeCSS.employeeListContainer}>
              <Row>
                {filteredEmployees.map((employee) => (
                  <Col key={employee.identityNumber} md={3}>
                    <div className={HomeCSS.employeeCard}>
                      <img
                        src={employee.url} // Assuming pictureUrl is a property in employee object
                        alt={`${employee.name} ${employee.surname}`}
                        className={HomeCSS.employeeImage}
                      />
                      <div className={HomeCSS.employeeInfo}>
                        <h2>
                          <Link to={`/employee/${employee.employeeId}`}>
                            {employee.name} {employee.surname}
                          </Link>
                        </h2>
                        <p>Email: {employee.email}</p>
                        <p>Gender: {employee.gender}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        )}

        {/* Images Section */}
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