import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';

class Recuperacionemail extends Component {
 render() {
	 return (
	  
		<body>
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
					</Navbar>
				</div>
		</body>
	 );

 };
}

export default Recuperacionemail;