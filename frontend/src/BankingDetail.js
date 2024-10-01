import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankingDetail = ({ onSuccess }) => {
  const [bankingDetails, setBankingDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');

  // Retrieve userID from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const appUserId = user?.userID; // Assuming 'userID' is stored as userID

  // Fetch all banking details
  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5239/api/BankingDetail');
        setBankingDetails(response.data);

        // Filter banking details by appUserId
        const userBankingDetails = response.data.filter(detail => detail.appUserId === appUserId);
        setFilteredDetails(userBankingDetails);

        if (userBankingDetails.length === 0) {
          alert('No banking details found for the current user.');
        }
      } catch (err) {
        setError(err.response?.data || 'An error occurred while fetching banking details.');
      }
    };

    fetchBankingDetails();
  }, [appUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5239/api/BankingDetail', {
        appUserId, // Use the retrieved userID as AppUserId
        bankName,
        accountNumber,
        accountType,
        branchCode,
      });
      onSuccess(response.data); // Call a success handler passed as a prop
      // Refresh the banking details list after successful addition
      setBankingDetails((prev) => [...prev, response.data]);
      // Re-filter banking details to include the new entry
      setFilteredDetails((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while saving banking details.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <label>Bank Name:</label>
          <input value={bankName} onChange={(e) => setBankName(e.target.value)} required />
        </div>
        <div>
          <label>Account Number:</label>
          <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
        </div>
        <div>
          <label>Account Type:</label>
          <input value={accountType} onChange={(e) => setAccountType(e.target.value)} required />
        </div>
        <div>
          <label>Branch Code:</label>
          <input value={branchCode} onChange={(e) => setBranchCode(e.target.value)} required />
        </div>
        <button type="submit">Submit Banking Details</button>
      </form>

      <h3>Your Banking Details</h3>
      {filteredDetails.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Branch Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.bankName}</td>
                <td>{detail.accountNumber}</td>
                <td>{detail.accountType}</td>
                <td>{detail.branchCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No banking details available for the current user.</div>
      )}
    </div>
  );
};

export default BankingDetail;
