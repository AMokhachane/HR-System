import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './AddEmployee.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "./Sidebar";

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [url, setUrl] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [physicalAddress, setPhysicalAddress] = useState("");
    const [postalAddress, setPostalAddress] = useState("");
    const [salary, setSalary] = useState("");
    const [contractType, setContractType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const uploadEmployeeData = async () => {
        const newErrors = {};

        // Validate form fields
        if (!name) newErrors.name = "Name is required";
        if (!surname) newErrors.surname = "Surname is required";
        if (!email) newErrors.email = "Email is required";
        if (!identityNumber) newErrors.identityNumber = "Identity Number is required";
        if (!passportNumber) newErrors.passportNumber = "Passport Number is required";
        if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!url) newErrors.url = "Profile Picture is required";
        if (!taxNumber) newErrors.taxNumber = "Tax Number is required";
        if (!maritalStatus) newErrors.maritalStatus = "Marital Status is required";
        if (!physicalAddress) newErrors.physicalAddress = "Physical Address is required";
        if (!postalAddress) newErrors.postalAddress = "Postal Address is required";
        if (!salary) newErrors.salary = "Salary is required";
        if (!contractType) newErrors.contractType = "Contract Type is required";
        if (!startDate) newErrors.startDate = "Start Date is required";
        if (!endDate) newErrors.endDate = "End Date is required";

        console.log("Validation errors:", newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Log form data before upload
        console.log("Uploading employee data:", {
            name, surname, email, identityNumber, passportNumber,
            dateOfBirth, gender, url, taxNumber, maritalStatus,
            physicalAddress, postalAddress, salary, contractType,
            startDate, endDate
        });

        const formData = new FormData();
        formData.append("file", profilePicture);
        formData.append("upload_preset", "your_upload_preset");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", formData);
            console.log("Cloudinary upload response:", response);
            
            const imageUrl = response.data.secure_url;
            const employeePayload = {
                name,
                surname,
                email,
                identityNumber,
                passportNumber,
                dateOfBirth,
                gender,
                url: imageUrl,
                taxNumber,
                maritalStatus,
                physicalAddress,
                postalAddress,
                salary,
                contractType,
                startDate,
                endDate
            };

            const employeeResponse = await axios.post("http://localhost:5239/api/employee", employeePayload);
            console.log("Employee creation response:", employeeResponse);

            setSuccessMessage("Employee added successfully!");
            
            // Clear form
            setName("");
            setSurname("");
            setEmail("");
            setIdentityNumber("");
            setPassportNumber("");
            setDateOfBirth("");
            setGender("");
            setUrl("");
            setTaxNumber("");
            setMaritalStatus("");
            setPhysicalAddress("");
            setPostalAddress("");
            setSalary("");
            setContractType("");
            setStartDate("");
            setEndDate("");
            setErrors({});
        } catch (error) {
            console.error("Error uploading employee data:", error);
        }
    };

    return (
        <div className={styles.parentContainer}>
      <div className={styles.leftSide}>
      <div className={styles.sidebar}>
        <Sidebar/>
      </div>
      </div>
     
            <div className={styles.box}>
                <h2 className={styles.heading}>Add New Employee</h2>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Surname</label>
                        {errors.surname && <p className={styles.errorMessage}>{errors.surname}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                        <input
                            type="email"
                            className={styles.inputField}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Identity Number</label>
                        {errors.identityNumber && <p className={styles.errorMessage}>{errors.identityNumber}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={identityNumber}
                            onChange={(e) => setIdentityNumber(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Passport Number</label>
                        {errors.passportNumber && <p className={styles.errorMessage}>{errors.passportNumber}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Date of Birth</label>
                        {errors.dateOfBirth && <p className={styles.errorMessage}>{errors.dateOfBirth}</p>}
                        <input
                            type="date"
                            className={styles.inputField}
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Gender</label>
                        {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
                        <select
                            className={styles.inputField}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Profile Picture</label>
                        {errors.profilePicture && <p className={styles.errorMessage}>{errors.profilePicture}</p>}
                        <div
                            className={styles.dropzone}
                            onClick={handleFileClick}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                className={styles.hiddenInput}
                                onChange={(event) => {
                                    setProfilePicture(event.target.files[0]);
                                }}
                            />
                            <FontAwesomeIcon icon={faUserPlus} className={styles.dropzoneIcon} />
                            <span className={styles.dropzoneText}>Upload Profile Picture</span>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tax Number</label>
                        {errors.taxNumber && <p className={styles.errorMessage}>{errors.taxNumber}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={taxNumber}
                            onChange={(e) => setTaxNumber(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Marital Status</label>
                        {errors.maritalStatus && <p className={styles.errorMessage}>{errors.maritalStatus}</p>}
                        <select
                            className={styles.inputField}
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                        >
                            <option value="">Select Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Physical Address</label>
                        {errors.physicalAddress && <p className={styles.errorMessage}>{errors.physicalAddress}</p>}
                        <textarea
                            className={styles.inputField}
                            value={physicalAddress}
                            onChange={(e) => setPhysicalAddress(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Postal Address</label>
                        {errors.postalAddress && <p className={styles.errorMessage}>{errors.postalAddress}</p>}
                        <textarea
                            className={styles.inputField}
                            value={postalAddress}
                            onChange={(e) => setPostalAddress(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Salary</label>
                        {errors.salary && <p className={styles.errorMessage}>{errors.salary}</p>}
                        <input
                            type="number"
                            className={styles.inputField}
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Contract Type</label>
                        {errors.contractType && <p className={styles.errorMessage}>{errors.contractType}</p>}
                        <select
                            className={styles.inputField}
                            value={contractType}
                            onChange={(e) => setContractType(e.target.value)}
                        >
                            <option value="">Select Contract Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Start Date</label>
                        {errors.startDate && <p className={styles.errorMessage}>{errors.startDate}</p>}
                        <input
                            type="date"
                            className={styles.inputField}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>End Date</label>
                        {errors.endDate && <p className={styles.errorMessage}>{errors.endDate}</p>}
                        <input
                            type="date"
                            className={styles.inputField}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className={styles.rightAlign}>
                        <button type="button" className={styles.uploadButton} onClick={uploadEmployeeData}>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;