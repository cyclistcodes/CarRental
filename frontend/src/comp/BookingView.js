import React, { useState, useEffect, useCallback } from 'react';
import '../App.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';


export const BookingView = () => {
  // State variables for form inputs
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPrice, setCarPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [cars, setCars] = useState([]);
  const [bookingResult, setBookingResult] = useState(null); // State-variabel för bokningsresultat
  const [isCarAvailable, setCarAvailability] = useState(true);
  const navigate = useNavigate();

  // Fetch all cars from the server
  const getAllCars = async () => {
    try {
      const res = await fetch("/get/cars"); // Anropa rätt endpoint för att hämta bilar
      if (res.ok) {
        const json = await res.json();
        setCars(json);
      } else {
        console.log('Error fetching cars from the server');
      }
    } catch (error) {
      console.log('Something went wrong while fetching cars', error);
    }
  };

  // Fetch all cars when the component mounts
  useEffect(() => {
    getAllCars();
  }, []);

  // Event handlers to update state variables
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    const { value } = event.target;
    // Kontrollera om värdet är giltigt (inte null eller tom sträng)
    if (value.trim() !== "") {
      setBirthDate(value);
    } else {
      // Om värdet inte är giltigt, visa felmeddelande eller utför annan hantering
      console.log("Invalid birth date");
    }
  };

  const handleCarModelChange = (event) => {
    const selectedCarModel = event.target.value;
    setCarModel(selectedCarModel);

    // Find the selected car in the cars array and set its price to the carPrice state
    const selectedCar = cars.find((car) => car.model === selectedCarModel);
    if (selectedCar) {
      setCarPrice(selectedCar.price);
    } else {
      setCarPrice(0); // If the car is not found, set the carPrice to 0 (or any default value you prefer)
    }
  };


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const calculateTotalRevenue = () => {
    if (!startDate || !endDate) return 0;
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day

    // Man får betala alla dagar som bilen är bokad trots halvdagar
    const diffDays = Math.round(Math.abs((startDateObj - endDateObj) / oneDay)) + 1; 
    const totalRevenue = diffDays * carPrice;
  
    return totalRevenue;
  };
  
  // Call calculateTotalRevenue() if the carmodel, startdate, or enddate changes
  useEffect(() => {
    const revenue = calculateTotalRevenue();
    setTotalRevenue(revenue);
  }, [carModel, startDate, endDate]);
  
  // Function to book a car rental
  const bookCarRental = async () => {
    // Validate form inputs before booking
    if (!fullName || !birthDate || !carModel || !startDate || !endDate || totalRevenue === 0) {
      console.log("Please fill in all required fields before submitting the booking");
      return;
    }

    if (calculateAge(birthDate) < 18) {
      console.log("You need to be at least 18 years old to book a car");
      return;
    }

    checkCarAvailability(carModel, startDate, endDate);
    if (!isCarAvailable) {
      console.log("Car is not available for the selected dates.");
      return;
    }

    const rental = {
      fullName: fullName,
      birthDate: birthDate,
      carModel: carModel,
      startDate: startDate,
      endDate: endDate,
      totalRevenue: totalRevenue
    };

    try {
      const res = await fetch('/post/rental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rental)
      });

      // Handle the response from the server
      if (res.ok) {
        console.log('Booking submitted successfully');
        setBookingResult({ success: true }); // Sätt bokningsresultatet till framgång
        // Reset the form or perform other actions on successful booking
        navigate('/');
      } else {
        console.log('Error in booking');
        setBookingResult({ success: false }); // Sätt bokningsresultatet till fel
        // Handle error message on failed booking
      }
    } catch (error) {
      console.log('Something went wrong during booking', error);
      setBookingResult({ success: false }); // Sätt bokningsresultatet till fel vid nätverksfel
      // Handle error in the request
    }
  };

  // Function to calculate age based on birth date
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Function to check car availability
  const checkCarAvailability = useCallback(async () => {
    // Make sure all the required data is available before checking availability
    if (!carModel || !startDate || !endDate) {
      return;
    }

    const request = {
      carModel: carModel,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      await fetch('/get/isAvailable', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

    } catch (error) {
      console.log('Something went wrong while checking car availability', error);
      setCarAvailability(false);
    }
  }, [carModel, startDate, endDate]);

  return (
    <div className="booking-view">
      <h2>Car Rental Booking</h2>

      {/* Form fields */}
      <form>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={handleFullNameChange} />

        <label>Birth Date:</label>
        <input type="date" value={birthDate} onChange={handleBirthDateChange} />

        {/* Dropdown-lista för Car Model */}
        <label>Car Model:</label>
        <select value={carModel} onChange={handleCarModelChange}>
          <option value="">Select Car Model</option>
          {cars.map((car) => (
            <option key={car.id} value={car.model}>
              {car.model} {car.price} SEK/day 
            </option>
          ))}
        </select>

        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />

        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />

        <label>Total Cost:</label>
        <p>{totalRevenue ? totalRevenue : 0} SEK</p>

        {/* Render car availability status */}
        {carModel && startDate && endDate && (
          <p className={isCarAvailable ? 'success-message' : 'error-message'}>
            {isCarAvailable ? 'Car is available for booking!' : 'Car is not available for the selected dates.'}
          </p>
        )}
        <button type="button" onClick={bookCarRental}>Book Now</button>
      </form>

      {/* Render list of cars from the server */}
      {/* ... (Your existing code) */}

      {/* Visa bekräftelse eller felmeddelande */}
      {bookingResult && (
        <p className={bookingResult.success ? 'success-message' : 'error-message'}>
          {bookingResult.success ? 'Booking submitted successfully!' : 'Error in booking. Please try again.'}
        </p>
      )}

      {/* Knappen för att gå tillbaka till Home */}
      <div className="back-button-container">
        <Link to="/" className="back-button">Go Back</Link>
      </div>
    </div>
  );
};

export default BookingView;
