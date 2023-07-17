import React from 'react';
import { Link } from 'react-router-dom';



export const Home = () => {
  return (
    <div>
      <h2>Welcome to Car Rental Service</h2>
      <div className="buttons-container">
        <Link to="/rent" className="nav-button">
          Rent a Car
        </Link>
        <Link to="/admin" className="nav-button">
          Admin View
        </Link>
      </div>
    </div>
  );
};

export default Home;
