import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import '../diseños/PuntoDeEntrega.css';
import '../diseños/estilosGlobales.css';

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
						<img src={culturaVerde} width="130px" height="50px"></img>
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