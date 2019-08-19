import React, { Component } from 'react';
import Dropdown from "react-dropdown";

const options = [
  'one', 'two', 'three'
]
const defaultOption = 'one'
class CargarHistorico extends Component {

	render(){return (
	
		<div><Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />defaultOption</div>
		
		

		)}

}
export default CargarHistorico;