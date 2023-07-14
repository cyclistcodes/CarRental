import './App.css';
import { Component } from 'react';

class App extends Component {
	state = {
	rentals:[]
	};
	async componentDidMount() {
		await this.getRentalsForAdmin();
	}
	async getRentalsForAdmin() {
		const response = await fetch('/get/rentals');
		const rentals = await response.json();
		this.setState({rentals: rentals});
	};
	async bookRental(){
		const rentalData={
			fullName: 'John Doe',
			birthDate: '1990-01-15',
			carModel: 'Ford Transit',
			startDate: '2022-07-01',
			endDate: '2022-07-05',
			totalRevenue: 500
	};
	try{
		const response=await fetch('/post/rental',{
			metod:'GET',
			headers:{
			'Content-type': 'application/json'
			},
			body: JSON.stringify(rentalData)
		});
		const bookedRental=await response.json();
	console.log('Booked rental:', bookedRental);
	}catch(error){
		console.error('Error booking rental:', error)
	}
}
	render() {
		return (
			<div className="App">
				<button onClick={()=>this.bookRental()}>Book Car</button>
				<p>
					Rentals: 
					{this.state.rentals.map((rental,index)=>(
						<span key={index}>{rental.carModel}</span>))}
				</p>
			</div>
		);
	}
}

export default App;