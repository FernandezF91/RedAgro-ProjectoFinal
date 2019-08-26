import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../diseños/estilosGlobales.css';
import '../diseños/seleccionUsuario.css';


class SeleccionUsuario extends Component {

	constructor() {

		super()

		this.state = {
	
		}


	}


	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
						<img src={culturaVerde} width="130px" height="50px"></img>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
				<div className = "contenidoSeleccion">
				<div className="tituloSeleccion">
				<h3>Selecciona un tipo de usuario:</h3>
				</div>
					<div className = "botonesRegistro">
					<Button variant="success" href="/registroProductor">Soy productor</Button>
					<Button variant="success" href="/registroConsumidor">Soy consumidor</Button>
					</div>
					<div className="atras">
					<Button variant="success" href="/login">Atras</Button>
					</div>
				</div>			
				</Container>
			</body>
		);
	};
}

export default SeleccionUsuario;