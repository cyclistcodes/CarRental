import React from 'react';
import './App.css';


class App extends React.Component {
  state = {
    rentals: []
  };

  async componentDidMount() {
    await this.getRentalsForAdmin();
  }

  async getRentalsForAdmin() {
    const response = await fetch('/get/rentals');
    const rentals = await response.json();
    this.setState({ rentals });
  }

  async bookRental() {
    try {
		const rentalData={
			fullName: 'Isaac Skog',
			birthDate: '1990-01-15',
			carModel: 'Ford Transit',
			startDate: '2022-07-01',
			endDate: '2022-07-05',
			totalRevenue: 500
	};
      const response = await fetch('/post/rental', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
		body: JSON.stringify(rentalData) 
      });
      const bookedRental = await response.json();
      console.log('Booked rental:', bookedRental);
    } catch (error) {
      console.error('Error booking rental:', error);
    }
  }

  renderTable() {
    const { rentals } = this.state;
    if (rentals.length === 0) {
      return <p>No rentals available</p>;
    }

	return (
		<table>
		  <thead>
			<tr>
			  <th>Driver Name</th>
			  <th>Birth Date</th>
			  <th>Car Model</th>
			  <th>Start Date</th>
			  <th>End Date</th>
			  <th>Total Revenue</th>
			</tr>
		  </thead>
		  <tbody>
			{rentals.map((rental, index) => (
			  <tr key={index}>
				<td>{rental.fullName}</td>
				<td>{rental.birthDate}</td>
				<td>{rental.caModel}</td>
				<td>{rental.startDate}</td>
				<td>{rental.endDate}</td>
				<td>{rental.totalRevenue}</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  );
	}
  render() {
    return (
      <div className="App">
        <h1>Rental Car App</h1>
        <button onClick={() => this.bookRental()}>Book Car</button>
        <h2>Rentals:</h2>
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
