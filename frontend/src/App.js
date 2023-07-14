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
	}
	render() {
		return (
			<div className="App">
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