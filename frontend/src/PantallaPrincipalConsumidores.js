//este import para cabecera
import './PantallaPrincipalConsumidores.css';
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';





class PantallaPrincipalconsumidores extends Component {

	render() {

		return (
			

			<body>
				
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
						<div className="barraBusqueda">
							<Form.Control size="sm" type="barra" placeholder="Buscar productos y productores.. "/>						
						</div>
						<div className="ListadoDesplegablemicuenta">
							<Dropdown>
  								<Dropdown.Toggle variant="success" id="dropdown-basic">
    								Usuario
  								</Dropdown.Toggle>
  								<Dropdown.Menu>
    								<Dropdown.Item href="">Mi cuenta</Dropdown.Item>
    								<Dropdown.Item href="/login">Salir</Dropdown.Item>
  								</Dropdown.Menu>
							</Dropdown>		
						</div>
					</Navbar>
				</div>

				<div className="menuConsumidor">
			<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
    <li><a tabindex="-1" href="#">Action</a></li>
    <li><a tabindex="-1" href="#">Another action</a></li>
    <li><a tabindex="-1" href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a tabindex="-1" href="#">Separated link</a></li>
  </ul>
				</div>
			</body>
		);	
	};		
}

export default PantallaPrincipalconsumidores;

