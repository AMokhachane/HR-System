import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import styles from "./AddEmployee.module.css";
import Sidebar from "./Sidebar";

const AddEmployee = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    identityNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    gender: "",
    taxNumber: "",
    maritalStatus: "",
    physicalAddress: "",
    postalAddress: "",
    salary: "",
    contractType: "",
    startDate: "",
    endDate: "",
    url: "", // Adding a field for the image URL
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while image is uploading

    // Step 1: Upload image to Cloudinary
    if (imageSelected) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageSelected);
      uploadFormData.append("upload_preset", "zmp53t7t");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/drgxphf5l/image/upload",
          uploadFormData
        )
        .then((response) => {
          const imageUrl = response.data.secure_url;

          // Step 2: Update formData with the uploaded image URL
          setFormData((prevData) => ({
            ...prevData,
            url: imageUrl,
          }));

          // Step 3: Post formData to your backend API after image upload
          axios
            .post("http://localhost:5239/api/employee", {
              ...formData,
              url: imageUrl,
            })
            .then((response) => {
              console.log("Data successfully sent to backend:", response.data);
              setImageUrls((prev) => [...prev, imageUrl]); // Optional: update imageUrls for display
            })
            .catch((error) => {
              console.error("Error sending data:", error);
            })
            .finally(() => {
              setLoading(false); // Reset loading state
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false); // Reset loading state even if there's an error
        });
    } else {
      // If no image is selected, just submit the form data
      axios
        .post("http://localhost:5239/api/employee", formData)
        .then((response) => {
          console.log("Data successfully sent to backend:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.leftSide}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>

      <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Row 1: Name & Surname */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="surname" className={styles.label}>
                Surname
              </label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 2: Email & Identity Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="identityNumber" className={styles.label}>
                Identity Number
              </label>
              <input
                type="text"
                name="identityNumber"
                id="identityNumber"
                placeholder="Identity Number"
                value={formData.identityNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 3: Passport Number & Date of Birth */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Passport Number
              </label>
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                value={formData.passportNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 4: Gender & Tax Number */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Gender
              </label>
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            
			<div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Marital Status
              </label>
              <input
                type="text"
                name="maritalStatus"
                placeholder="Marital Status"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Row 5: Marital Status & Salary */}
          <div className={styles.formRow}>
		  <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Employment Status
              </label>
              <input
                type="text"
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
		  <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Tax Number
              </label>
              <input
                type="text"
                name="taxNumber"
                placeholder="Tax Number"
                value={formData.taxNumber}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            
          </div>

          {/* Row 6: Contract Type & Start Date */}
          <div className={styles.formRow}>
    <div className={styles.inputGroup}>
        <label htmlFor="startDate" className={styles.label}>
            Start Date
        </label>
        <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={styles.inputField}
        />
    </div>
    <div className={styles.inputGroup}>
        <label htmlFor="endDate" className={styles.label}>
            End Date
        </label>
        <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className={styles.inputField}
        />
    </div>
</div>

          {/* Address Rows: Physical and Postal */}
          <div className={styles.addressRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Physical Address
              </label>
              <input
                type="text"
                name="physicalAddress"
                placeholder="Physical Address"
                value={formData.physicalAddress}
                onChange={handleInputChange}
                className={styles.longinputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Postal Address
              </label>
              <input
                type="text"
                name="postalAddress"
                placeholder="Postal Address"
                value={formData.postalAddress}
                onChange={handleInputChange}
                className={styles.longinputField}
              />
            </div>
          </div>
		  <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Salary
              </label>
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>

          {/* File upload */}
          <div className={styles.uploadContainer}>
    <label htmlFor="fileUpload" className={styles.customFileUpload}>
        <i className="fas fa-cloud-upload-alt"></i> {/* Font Awesome Cloud Icon */}
        <span>Upload Image</span>
    </label>
    <input
        type="file"
        id="fileUpload"
        onChange={(event) => setImageSelected(event.target.files[0])}
        className={styles.fileInput}
    />
</div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={styles.uploadButton}
          >
            {loading ? "Submitting..." : "Add Employee"}
          </button>
        </form>

        {/* Display uploaded images */}
        <div className={styles.imageContainer}>
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              className={styles.uploadedImage}
              cloudName="drgxphf5l"
              publicId={url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
