import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../diseños/Registro.css';
import '../diseños/estilosGlobales.css';

class RegistroProductor extends Component {



	constructor() {

		super()

		this.state = {
			campos: [],
			validated: false
			
		}

		this.limpiarCampos = this.limpiarCampos.bind(this);

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

	limpiarCampos() {

		this.refs.form.reset();

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
					<div className="contenidoRegistro">
						<Form noValidate validated={this.state.validated} ref="form" onSubmit={(e)=>this.handleSubmit(e)}>
							<div className="titulos">
								<Form.Group as={Row}>
									<div className="cuentaCultura">
										<p>Creá tu cuenta en culturaVerde</p>
									</div>
									<div className="cuentaUsuario">
										<a href="/registroConsumidor"><p>Creá tu cuenta consumidor</p></a>
									</div>
								</Form.Group>
							</div>
							<div className="nombre">
								<Form.Group as={Row} controlId="validationCustom01">
									<Form.Label column sm={2}>
										Nombre:
                                		</Form.Label>
									<Col sm={10}>
										<Form.Control
											required
											type="text"
										/>
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>

								</Form.Group>
							</div>
							<div className="apellido">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Apellido:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="apellido" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="razonSocial">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Razón social:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="razonSocial" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="fechaNacimiento">
								<Form.Group as={Row}>
									<Form.Label className="fechaLabel" column sm={3}>
										Fecha de nacimiento:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="fechaNacimiento" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>

								</Form.Group>
							</div>
							<div className="tel">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Teléfono:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="tel" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="email">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Email:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="email" name="email" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>

									</Col>

								</Form.Group>
							</div>
							<div className="password">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Password:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="password" name="password" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="confirmaPassword">
								<Form.Group as={Row}>
									<Form.Label className="confirmaLabel" column sm={3}>
										Confirmar password:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="password" name="confirmaPassword" />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>

								</Form.Group>
							</div>
							<div className="botones">
								<Col>
									<Row>
										<div className="botonAtras">
											<a href='/login'><Button variant="success">Atrás</Button></a>
										</div>
										<div className="botonCrear">
											<Button variant="success" type="submit">Crear</Button>
										</div>
										<div className="botonLimpiar">
											<Button variant="success" onClick={this.limpiarCampos}>Limpiar</Button>
										</div>
									</Row>
								</Col>
							</div>
						</Form>
					</div>
				</Container>
			</body>
		);
	};
}


export default RegistroProductor;