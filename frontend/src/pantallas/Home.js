import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Home.css';
import '../diseños/estilosGlobales.css';

class HomePage extends Component {

	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<img src={culturaVerde} width="130px" height="50px"></img>
						</div>	
						<div className="barraBusqueda">
						<Form.Control size="sm" type="barra" placeholder="Buscar productos y productores.. "/>						
						</div>
						<div className="textos">
							<Nav>
								<Nav.Link href='/login'>Ingresar</Nav.Link>
								<Nav.Link href='/registroConsumidor'>Creá tu cuenta</Nav.Link>
							</Nav>
						</div>
					</Navbar>
				</div>
			</body>
		);
	}
}

export default HomePage;
