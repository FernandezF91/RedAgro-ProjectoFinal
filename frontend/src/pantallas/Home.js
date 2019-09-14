import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Home.css';
import '../diseños/estilosGlobales.css';
import { MDBIcon } from "mdbreact";
import Row from 'react-bootstrap/Row';


class HomePage extends Component {

	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
						</div>
						<div className="barraBusqueda">
						<Row>
								<input type="text" placeholder="Buscar productos y productores.. " name="search"/>
      							<button type="submit"><i class="fa fa-search"></i></button>
								</Row>						
						</div>
						<div className="textos">
							<Nav>
								<Nav.Link href='/login'>Ingresar</Nav.Link>
								<Nav.Link href='/seleccionUsuario'>Creá tu cuenta</Nav.Link>
							</Nav>
						</div>
					</Navbar>
				</div>
			</body>
		);
	}
}

export default HomePage;
