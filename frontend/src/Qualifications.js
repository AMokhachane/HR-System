import React, { useState, useEffect } from "react";
import axios from "axios";
import QualificationsCSS from "./Qualifications.module.css"; // Create this CSS module

const Qualifications = ({ employeeId }) => {
  const [qualifications, setQualifications] = useState([]);
  const [qualificationType, setQualificationType] = useState("");
  const [yearCompleted, setYearCompleted] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch qualifications
  const fetchQualifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5239/api/qualifications?employeeId=${employeeId}`
      );
      setQualifications(response.data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching qualifications.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch qualifications on component mount
  useEffect(() => {
    fetchQualifications();
  }, [employeeId]);

  // Function to post a new qualification
  const handlePostQualification = async (e) => {
    e.preventDefault();

    try {
      const newQualification = {
        qualificationType,
        yearCompleted: new Date(yearCompleted).getFullYear(), // Ensure only the year is sent
        institution,
        employeeId,
      };

      await axios.post("http://localhost:5239/api/qualifications", newQualification);
      // Clear input fields
      setQualificationType("");
      setYearCompleted("");
      setInstitution("");
      // Re-fetch qualifications after posting a new one
      fetchQualifications();
    } catch (err) {
      console.error(err);
      setError("An error occurred while posting the qualification.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={QualificationsCSS.error}>{error}</div>;


  return (
    <div className={QualificationsCSS.container}>
      <h2>Qualifications</h2>
      <form onSubmit={handlePostQualification} className={QualificationsCSS.form}>
        <input
          type="text"
          placeholder="Qualification Type"
          value={qualificationType}
          onChange={(e) => setQualificationType(e.target.value)}
          required
        />
        <input
          type="month" // Use month input type for better UX in selecting year
          placeholder="Year Completed"
          value={yearCompleted}
          onChange={(e) => setYearCompleted(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
        <button type="submit">Add Qualification</button>
      </form>

      <div className={QualificationsCSS.qualificationsList}>
        <h3>Existing Qualifications:</h3>
        <ul>
          {qualifications.map((qualification) => (
            <li key={qualification.id}>
              {qualification.qualificationType} ({qualification.yearCompleted}) - {qualification.institution}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Qualifications;