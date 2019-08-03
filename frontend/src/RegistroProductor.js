import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './RegistroProductor.css';
import './estilosGlobales.css';

class RegistroProductor extends Component {


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
					<div className="formularioRegistro">
						<div className = "titulos">
						<Form.Group as={Row}>
						<div className = "cuentaCulturaProd">
							<p>Creá tu cuenta en culturaVerde</p>
							</div>
							<div className = "cuentaConsumidor">
							<a href="/registroConsumidor"><p>Creá tu cuenta de consumidor</p></a>
							</div>
						</Form.Group>
						</div>
						<div className="contenidoRegistroProductor">
							<Form noValidate validated={this.state.validated} onSubmit={(e) => this.limpiarCampos(e)}>
								<div className="nombre">
									<Form.Group as={Row} controlId="validationCustom01">
										<Form.Label>
											Nombre:
                                		</Form.Label>
										<Col>
											<Form.Control
												required
												type="email"
												name="nombre"
												onChange={(e) => this.detectarCambios(e)
												}
											/>
											<Form.Control.Feedback type="invalid">
												*Completar campo
            								</Form.Control.Feedback>
										</Col>

									</Form.Group>
								</div>
								<div className="apellido">
									<Form.Group as={Row}>
										<Form.Label>
											Apellido:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="apellido" />
										</Col>
									</Form.Group>
								</div>
								<div className="razonSocial">
									<Form.Group as={Row}>
										<Form.Label>
											Razón social:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="razonSocial" />
										</Col>
									</Form.Group>
								</div>
								
								<div className="fechaNacimiento">
									<Form.Group as={Row}>
										<Form.Label>
											Fecha de nacimiento:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="fechaNacimiento" />
										</Col>

									</Form.Group>
								</div>
								
								<div className="tel">
									<Form.Group as={Row} >
										<Form.Label>
											Teléfono:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="tel" />
										</Col>
									</Form.Group>
								</div>
								<div className="email">
									<Form.Group as={Row}>
										<Form.Label>
											Email:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="email" />
										</Col>

									</Form.Group>
								</div>
								<div className="password">
									<Form.Group as={Row} >
										<Form.Label>
											Password:
                                </Form.Label>
										<Col>
											<Form.Control type="password" name="password" />
										</Col>
									</Form.Group>
								</div>
								<div className="confirmaPassword">
									<Form.Group as={Row}>
										<Form.Label>
											Confirmar password:
                                </Form.Label>
										<Col>
											<Form.Control type="password" name="confirmaPassword" />
										</Col>

									</Form.Group>
								</div>
								<div className="botones">
									<Row>
										<div className="botonAtras">
											<a href='/login'><Button variant="success">Atrás</Button></a>
										</div>
										<div className="botonCrear">
											<Button variant="success">Crear</Button>
										</div>
										<div className="botonLimpiar">
											<Button variant="success" type="submit">Limpiar</Button>
										</div>
									</Row>
								</div>
							</Form>
						</div>
					</div>
				</Container>
			</body>
		);
	};
}

export default RegistroProductor;