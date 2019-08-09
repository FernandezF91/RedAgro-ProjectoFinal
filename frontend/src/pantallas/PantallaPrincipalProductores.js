import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde.png';
import Dropdown from 'react-bootstrap/Dropdown';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import '../diseños/PantallaPrincipalProductores.css';

class PantallaPrincipalProductores extends Component {


render() {

		return (
			<body>
				<div clasName="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<img src={culturaVerde} width="150px" height="60px"></img>
						</div>	
						<div className="barraBusqueda">
						<Form.Control size="sm" type="barra" placeholder="Buscar productos y productores.. "/>						
						</div>
						<Dropdown clasname = "dropDownButton">
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Usuario
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="/action-1">Mi cuenta</Dropdown.Item>
							<Dropdown.Item href="/login">Salir</Dropdown.Item>
						</Dropdown.Menu>
						</Dropdown>
					</Navbar>
				</div>
								<Container fluid className="contenedor">

				</Container>
			</body>
		);
	};		
}
export default PantallaPrincipalProductores;