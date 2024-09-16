import React from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import HomeCSS from './Home.module.css'; // Use the CSS module
import Sidebar from './Sidebar'

const employees = [
  { id: 1, fullName: 'Jessica Jones', JobTitle: 'Senior HR Manager', email: 'jessica@xyz.com', phone: '7463', image: 'https://via.placeholder.com/150' },
  { id: 2, fullName: 'Leeds Garber', JobTitle: 'HR Manager', email: 'leeds@xyz.com', phone: '5678', image: 'https://via.placeholder.com/150' },
  { id: 3, fullName: 'CRM Jessica', JobTitle: 'HR', email: 'crm@xyz.com', phone: '9876', image: 'https://via.placeholder.com/150' },
  {id: 4, fullName: 'Amanda Mokhachane', JobTitle: 'HR', email: 'crm@xyz.com', phone: '9876', image: 'https://via.placeholder.com/150' },
{id: 5, fullName: 'Sandile Mabaso', JobTitle: 'HR', email: 'crm@xyz.com', phone: '9876', image: 'https://via.placeholder.com/150' },
{id: 6, fullName: 'Nhlayiseko Vhuma', JobTitle: 'HR', email: 'crm@xyz.com', phone: '9876', image: 'https://via.placeholder.com/150' },
];

const Home = () => {
  return (
    <div className={HomeCSS.container}>
      <div className={HomeCSS.sidebar}>
        <Sidebar/>
      </div>
      <div className={HomeCSS['main-content']}>
        <Row className={HomeCSS.header}>
          <Col>
            <InputGroup>
              <FormControl
                placeholder="Search Employee"
                aria-label="Search Employee"
                aria-describedby="search-icon"
              />
              <InputGroup.Text id="search-icon">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <FaUserCircle size={20} />
          </Col>
        </Row>
        <div className={HomeCSS['employee-directory']}>
          {employees.map((employee) => (
            <Card className={HomeCSS['employee-card']} key={employee.id}>
            <Card.Img variant="top" src={employee.image} alt={`${employee.fullName}'s profile`} />
            <Card.Body>
              <Card.Title>{employee.fullName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.JobTitle}</Card.Subtitle>
              <Card.Text>Email: {employee.email}</Card.Text>
              <Card.Text>Phone: {employee.phone}</Card.Text>
            </Card.Body>
          </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;