import React, { useState, useEffect } from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';

export const AdminView = () => {
  const [rentals, setRentedCars] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const getAllRentedCars = async () => {
    const res = await fetch('/get/rentals');
    const json = await res.json();
    setRentedCars(json);

    // Beräkna den totala intäkten genom att summera totalRevenue för varje uthyrning
    const revenueSum = json.reduce((sum, rental) => sum + rental.totalRevenue, 0);
    setTotalRevenue(revenueSum);
  };

  useEffect(() => {
    getAllRentedCars();
  }, []);

  return (
    <div>
      <h2>Admin View - Rentals</h2>
      {rentals.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Car Model</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rental Cost</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental, index) => (
              <tr key={index}>
                <td>{rental.fullName}</td>
                <td>{rental.carModel}</td>
                <td>{rental.startDate}</td>
                <td>{rental.endDate}</td>
                <td>{rental.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
            <tr>
              <td colSpan="4">Total Revenue</td>
              <td>{totalRevenue}</td>
            </tr>
        </table>
      ) : (
        <p>No rentals available.</p>
      )}
         {/* Knappen för att gå tillbaka till Home */}
         <div className="back-button-container">
        <Link to="/" className="back-button">Go Back</Link>
      </div>
    </div>
  );
};

export default AdminView;
