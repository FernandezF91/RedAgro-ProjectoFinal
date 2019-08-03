import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './PantallaPrincipalProductores.css';

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