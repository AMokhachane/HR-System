import React, { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const Testing = () => {
	const [imageSelected, setImageSelected] = useState("");
	const [imageUrls, setImageUrls] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		identityNumber: '',
		passportNumber: '',
		dateOfBirth: '',
		gender: '',
		taxNumber: '',
		maritalStatus: '',
		physicalAddress: '',
		postalAddress: '',
		salary: '',
		contractType: '',
		startDate: '',
		endDate: ''
	});

	const handleFileClick = () => {
		const uploadFormData = new FormData();
		uploadFormData.append("file", imageSelected);
		uploadFormData.append("upload_preset", "zmp53t7t");

		axios.post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", 
		uploadFormData
		).then((response) => {
			// Store the uploaded image URL in the form data and imageUrls state
			setFormData((prevData) => ({
				...prevData,
				url: response.data.secure_url
			}));
			setImageUrls((prev) => [...prev, response.data.secure_url]);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission
		// Post formData to your backend API
		axios.post("http://localhost:5239/api/employee", formData)
			.then(response => {
				console.log("Data successfully sent to backend:", response.data);
			})
			.catch(error => {
				console.error("Error sending data:", error);
			});
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	return (
		<div>
			{/* Image Upload */}
			<input
				type='file'
				onChange={(event) => {
					setImageSelected(event.target.files[0]);
				}}
			/>
			<button onClick={handleFileClick}>Upload Image</button>

			{/* Form for additional details */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="surname"
					placeholder="Surname"
					value={formData.surname}
					onChange={handleInputChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="identityNumber"
					placeholder="Identity Number"
					value={formData.identityNumber}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="passportNumber"
					placeholder="Passport Number"
					value={formData.passportNumber}
					onChange={handleInputChange}
				/>
				<input
					type="date"
					name="dateOfBirth"
					value={formData.dateOfBirth}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="gender"
					placeholder="Gender"
					value={formData.gender}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="taxNumber"
					placeholder="Tax Number"
					value={formData.taxNumber}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="maritalStatus"
					placeholder="Marital Status"
					value={formData.maritalStatus}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="physicalAddress"
					placeholder="Physical Address"
					value={formData.physicalAddress}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="postalAddress"
					placeholder="Postal Address"
					value={formData.postalAddress}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="salary"
					placeholder="Salary"
					value={formData.salary}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="contractType"
					placeholder="Contract Type"
					value={formData.contractType}
					onChange={handleInputChange}
				/>
				<input
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleInputChange}
				/>
				<input
					type="date"
					name="endDate"
					value={formData.endDate}
					onChange={handleInputChange}
				/>

				{/* Submit button to send the form data along with the image */}
				<button type="submit">Submit Form</button>
			</form>

			{/* Display uploaded images */}
			<div>
				{imageUrls.map((url, index) => (
					<Image
						key={index}
						style={{ width: 200, margin: 10 }}
						cloudName="drgxphf5l"
						publicId={url}
					/>
				))}
			</div>
		</div>
	);
};

export default Testing;