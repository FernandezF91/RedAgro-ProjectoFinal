import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../diseños/FormaRetiro.css';
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
						<img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<div className="formularioFormaRetiro">
							<div className = "formaDeRetiro">
								<h2>Selección de forma de retiro</h2>
									
									
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
									<label class="form-check-label" for="inlineRadio1">Arreglar con el productor</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
									<label class="form-check-label" for="inlineRadio2">Retiro en punto de entrega</label>
							</div>			
								
								<h3>Datos de quien retira</h3>
							</div>
					

					<div className="contenidoFormaRetiro">
							<Form noValidate validated={this.state.validated} onSubmit={(e) => this.limpiarCampos(e)}>
								
								<div className="nombre">
									<Form.Group as={Row} controlId="validationCustom01">
										<Form.Label>
											Nombre
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
											Apellido
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="apellido" />
										</Col>
									</Form.Group>
								</div>
								
								<div className="tel">
									<Form.Group as={Row} >
										<Form.Label>
											Teléfono
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="tel" />
										</Col>
									</Form.Group>
								</div>
								
								<div className="botonesRegistro">
									<Row>
										<div className="botonAtras">
											<Nav.Link href='/login'><Button variant="success">Cancelar</Button></Nav.Link>
										</div>
										<div className="botonCrear">
											<Button variant="success">Siguiente</Button>
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

export default FormaRetiro;