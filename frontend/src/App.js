import './App.css';
import { Component } from 'react';

class App extends Component {
	state = {
		message: "If spring backend is running and database is running, then this message should be replaced!"
	};
	async componentDidMount() {
		await this.getHelloWorld();
	}
	async getHelloWorld() {
		const response           = await fetch('/helloworld');
		const helloWorldResponse = await response.json();
		this.setState({ message: helloWorldResponse.message });
	}
	render() {
		return (
			<div className="App">
				<p>
					{this.state.message}
				</p>
			</div>
		);
	}
}

export default App;