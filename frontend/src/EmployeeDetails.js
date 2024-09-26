import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EmployeeDetailsCSS from './EmployeeDetails.module.css'; // Create this CSS module

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5239/api/employee/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={EmployeeDetailsCSS.error}>{error}</div>;

  return (
    <div className={EmployeeDetailsCSS.container}>
      <h1>{employee.name} {employee.surname}</h1>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Identity Number:</strong> {employee.identityNumber}</p>
      <p><strong>Passport Number:</strong> {employee.passportNumber}</p>
      <p><strong>Date of Birth:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {employee.gender}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <p><strong>Contract Type:</strong> {employee.contractType}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default EmployeeDetails;