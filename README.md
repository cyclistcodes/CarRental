# Car Rental Booking App

A simple web application for booking car rentals. Users can fill in their personal information, select a car model, and choose dates to book a car. The app also shows if the selected car is available for the chosen dates and the total cost.

## How to start the project
### 1. Set up the database
You may start a database with the following docker command based on the [Bitnami PostgreSQL Image](https://hub.docker.com/r/bitnami/postgresql/):

`docker run --name postgresql -p 5432:5432 -e POSTGRESQL_USERNAME=my_user -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=rental bitnami/postgresql:latest`

### 2. Start the backend 
The backend was bootstrapped with [Spring initializr](https://start.spring.io/) and is configured to run against a PostgreSQL database.

Start the backend by running  `com.example.rental.RentalApplication#main`.

### 3. Start the frontend
The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See `package.json` for npm commands. The `package.json` has a proxy for the backend hosted at `http://localhost:8080`.

Start the frontend by doing `npm install` followed by `npm start` in the `frontend` folder

## Technologies

- React: The web application is built using React, a JavaScript library for building user interfaces.

- REST API: The app uses a REST API to fetch cars from the server and to send booking requests.
## Current Features

- Fill in Personal Information: Users must provide their full name and birth date to proceed with a booking.

- Select Car Model: Users can choose from various car models fetched from a server.

- Choose Start and End Date: Users can enter dates to select the duration for which they want to rent the car.

- Calculate Total Price: The app automatically calculates the total cost based on the selected car model and rental period.

- Show Car Availability: The app displays whether the chosen car is available for the selected dates.

- Confirmation and Error Messages: After a successful booking, a confirmation message is displayed, and if any error occurs, an error message is shown.
## Future Improvements 

Here are some improvements and customizations that can be made to enhance the app's functionality:

- Add the ability to display details about each car, such as descriptions, images, etc.

- Implement a calendar to visually show the availability of the car.

- Create an administration panel where the car collection can be managed (add, update, delete cars).

- Add a feature for users to view their previous bookings and cancel if needed.