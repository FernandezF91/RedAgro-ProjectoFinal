import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import culturaVerde from './cultura-verde.png';
import Container from 'react-bootstrap/Container';
import './Home.css';

class HomePage extends Component {

	render() {

		return (
			<body>
				<div clasName="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<img src={culturaVerde} width="150px" height="60px"></img>
						</div>
						<div className="barraBusqueda">
							<Form.Control size="sm" type="text" placeholder="Buscar productos y productores.. " />
						</div>
						<div className="textos">
							<Nav>
								<Nav.Link href='/login'>Ingresar</Nav.Link>
								<Nav.Link href="#features">Creá tu cuenta</Nav.Link>
							</Nav>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">

				</Container>
			</body>
		);
	}
}

export default HomePage;
