import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
// import { FaSearch, FaUserCircle } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
// import Sidebar from './Sidebar';
import axios from 'axios';
// import { Image } from "cloudinary-react";


const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={HomeCSS.error}>{error}</div>;

  return (
      <div className={HomeCSS.employeeListContainer}>
          <h1>Employee List</h1>
          <table className={HomeCSS.employeeTable}>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Email</th>
                      <th>Identity Number</th>
                      <th>Passport Number</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                      <th>Salary</th>
                      <th>Contract Type</th>
                  </tr>
              </thead>
              <tbody>
                  {employees.map((employee) => (
                      <tr key={employee.identityNumber}> {/* Assuming Identity Number is unique */}
                          <td>{employee.name}</td>
                          <td>{employee.surname}</td>
                          <td>{employee.email}</td>
                          <td>{employee.identityNumber}</td>
                          <td>{employee.passportNumber}</td>
                          <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                          <td>{employee.gender}</td>
                          <td>{employee.salary}</td>
                          <td>{employee.contractType}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default Home;