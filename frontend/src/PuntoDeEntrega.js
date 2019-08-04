import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './PuntoDeEntrega.css';
import './estilosGlobales.css';

class FormaRetiro extends Component {


	constructor() {

		super()

		this.state = {
			campos: [],
			validated: false
		}

	}

	handleSubmit(e) {

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		this.setState({ validated: true });

	};

	detectarCambios(e) {

		let campos = this.state.campos;
		campos[e.target.name] = e.target.value;
		this.setState({
			campos
		})

	}

	limpiarCampos(e) {

		var form = e.target;
		e.preventDefault();

		form.reset();

	}


	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<div>
						<div className = "puntoDeEntrega">
							<h2>Seleccione punto de entrega</h2>
						</div>	


					</div>
				</Container>
			</body>
		);
	};
}

export default FormaRetiro;