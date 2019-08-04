    
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './Login.css';


class LoginForm extends Component {

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

		if ((!this.state.fields["username"]) && (!this.state.fields["password"])) {

			errores["username"] = "*Completar campo";
			errores["password"] = "*Completar campo";


		} else if (!this.state.fields["username"]) {

			errores["username"] = "*Completar campo";

		} else if (!this.state.fields["password"]) {

			errores["password"] = "*Completar campo";

		} else {

			alert("Campos completos!")

		}

		this.setState({
			errores
		})

	}

	render() {

		return (
			<body>
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<div className="formularioLogin">
						<h2>Acceso de usuarios</h2>
						<div className="encabezadoLogin">
							<Form>
								<div className="usuario">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label>
											Usuario:
                                </Form.Label>
										<Col>
											<Form.Control type="email" name="username" onChange={(e) => this.detectarCambios(e)} />
											<div className="error">{this.state.errores["username"]}</div>
										</Col>

									</Form.Group>
								</div>
								<div className="password">
									<Form.Group as={Row} controlId="formHorizontalPassword" >
										<Form.Label>
											Password:
                                </Form.Label>
										<Col>
											<Form.Control type="password" name="password" onChange={(e) => this.detectarCambios(e)} />
											<div className="error"> {this.state.errores["password"]} </div>
										</Col>
									</Form.Group>
								</div>
							</Form>
						</div>
						<div className="botonesLogin">
							<Nav.Link className="boton1" href=''><Button variant="success" onClick={this.validarDatos}>Ingresar</Button></Nav.Link>
							<Nav.Link className="boton2" href='/registroConsumidor'><Button variant="success">Registrar</Button></Nav.Link>
							<a href="/recupero_email"><p>olvidé mi contraseña</p></a>
						</div>
					</div>
				</Container>
			</body>
		);
	};
}

export default LoginForm;