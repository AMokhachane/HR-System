import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import HomeCSS from './AdminDashboard.module.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Importing icons

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

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

    const filteredEmployees = employees.filter(employee =>
        `${employee.name} ${employee.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

    return (
        <div className={HomeCSS.container}>
            <div className={HomeCSS.leftSide}>
                <Sidebar />
            </div>

            <div className={HomeCSS.rightSide}>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
                <Container fluid>
                    <h2 className={HomeCSS.pageTitle}>Admin Dashboard</h2>
                    <div className={HomeCSS.tableControls}>
                        <Button
                            variant="success"
                            className={HomeCSS.addButton}
                            onClick={() => navigate('/add-employee')}
                        >
                            + Add User
                        </Button>
                    </div>

                    <div className={HomeCSS.contentContainer}>
                        <div className={HomeCSS.tableWrapper}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div className={HomeCSS.error}>{error}</div>
                            ) : (
                                <Table bordered hover responsive className={HomeCSS.userTable}>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Identity Number</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Join Date</th>
                                            <th>Role</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentEmployees.map((employee) => (
                                            <tr key={employee.identityNumber}>
                                                <td>
                                                    <img
                                                        src={employee.url}
                                                        alt={`${employee.name} ${employee.surname}`}
                                                        className={HomeCSS.employeeImage}
                                                    />
                                                    {employee.name} {employee.surname}
                                                </td>
                                                <td>{employee.identityNumber}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.gender}</td>
                                                <td>{new Date(employee.startDate).toLocaleString()}</td>
                                                <td>{employee.role}</td>
                                                <td>{employee.position}</td>
                                                <td>{employee.department}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>

                        {/* Pagination always at the bottom */}
                        <div className={HomeCSS.paginationWrapper}>
                            <div className={HomeCSS.pagination}>
                                <Button
                                    variant="outline-primary"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={HomeCSS.pageButton}
                                >
                                    <FaArrowLeft />
                                </Button>
                                <span className={HomeCSS.pageNumber}>Page {currentPage}</span>
                                <Button
                                    variant="outline-primary"
                                    disabled={indexOfLastRow >= filteredEmployees.length}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={HomeCSS.pageButton}
                                >
                                    <FaArrowRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default AdminDashboard;