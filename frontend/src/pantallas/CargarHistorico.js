import React, { Component } from 'react';
import Dropdown from "react-dropdown";

// const options = [
//   'one', 'two', 'three'
// ]
// const defaultOption = 'one'


class CargarHistorico extends Component {

	constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    	alert('Your favorite flavor is: ' + this.state.value);
    	event.preventDefault();
	}


	render(){
		return (
		<div className="container">
				<form onSubmit={this.handleFormSubmit}>
					<h1>Nuevo Producto</h1>
						<form onSubmit={this.handleSubmit}>
							<label>
							Elija la categoría:
							<select value={this.state.value} onChange={this.handleChange}>
								<option value="tomate">Tomate</option>
								<option value="zanahoria">Zanahoria</option>
								<option value="lechuga">Lechuga</option>
								<option value="acelga">Acelga</option>
							</select>
							</label>
							<input type="submit" value="Submit" />
						</form>

						<form onSubmit={this.handleSubmit}>
							<label>
							Upload file:
							<input type="file" ref={this.fileInput} />
							</label>
							<br />
							<button type="submit">Submit</button>
						</form>
					</form>
				</div>
		)}

}
export default CargarHistorico;