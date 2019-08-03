//este import para cabecera
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';

//este import para cuerpo   
import './recuperaremail.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

//botones y comentario
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import './estilosGlobales.css';

class Recuperaremail extends Component {

	constructor(props) {

		super(props)

		this.state = {
			fields: [],
			errores: []
		}

		this.validarDatos = this.validarDatos.bind(this);
	}

	detectarCambios(e) {

		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({
			fields
		})

	}

	validarDatos() {

		this.setState({
			errores: []
		})

		let errores = {};

		if (!this.state.fields["emailuser"]) {

			errores["emailuser"] = "*Completar campo";
		}

		this.setState({
			errores
		})
	}

	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
					</Navbar>
				</div>
				<Container fluid className="contenedorrecu">
					<div className="formularioRecuContra">
						<h2>Recuperar Contraseña</h2>
						<div className="encabezadoRecucontra">
							<Form>
								<div className="Correoelectronico">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label>
											Correo electronico:
                                		</Form.Label>
										<Col>
											<Form.Control type="recuemail" name="emailuser" onChange={(e) => this.detectarCambios(e)} />
											<div className="error">{this.state.errores["emailuser"]}</div>
										</Col>
									</Form.Group>
								</div>
							</Form>
						</div>
					</div>
					<div className="botones">
						<Nav.Link className="botoncanrecup" href='/login'><Button variant="success">Cancelar</Button></Nav.Link>
						<Nav.Link className="botonconfrecu" href=''><Button variant="success" onClick={this.validarDatos}>Confirmar</Button></Nav.Link>
					</div>
				</Container>
			</body>
		);

	};
}

export default Recuperaremail;