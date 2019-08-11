    
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../diseños/Login.css';
import '../diseños/estilosGlobales.css';


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

			errores["username"] = "*Campo inválido";
			errores["password"] = "*Campo inválido";


		} else if (!this.state.fields["username"]) {

			errores["username"] = "*Campo inválido";

		} else if (!this.state.fields["password"]) {

			errores["password"] = "*Campo inválido";

		} else {

			alert("Campos completos!")

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
						<div className="culturaVerde">
						<img src={culturaVerde} width="130px" height="50px"></img>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<div className="formularioLogin">
						<h2>Acceso de usuarios</h2>
						<div className="encabezadoLogin">
							<Form className="formLogin">
								<div className="usuarioLogin">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label column sm={2}>
											Usuario:
                                </Form.Label>
										<Col sm={10}>
											<Form.Control className="formUser" type="email" name="username" onChange={(e) => this.detectarCambios(e)} />
											<div className="error">{this.state.errores["username"]}</div>
										</Col>

									</Form.Group>
								</div>
								<div className="passwordLogin">
									<Form.Group as={Row} controlId="formHorizontalPassword" >
										<Form.Label column sm={2} className ="passLabel">
											Password:
                                </Form.Label>
										<Col sm={10}>
											<Form.Control className="formPass" type="password" name="password" onChange={(e) => this.detectarCambios(e)} />
											<div className="error"> {this.state.errores["password"]} </div>
										</Col>
									</Form.Group>
								</div>
							</Form>
						</div>
						<div className="botonesLogin">
							<Nav.Link className="boton1" href=''><Button variant="success" onClick={this.validarDatos}>Ingresar</Button></Nav.Link>
							<Nav.Link className="boton2" href='/registroConsumidor'><Button variant="success">Registrar</Button></Nav.Link>						
						</div>
						<a href="/recupero_email"><p>olvidé mi contraseña</p></a>
					</div>
				</Container>
			</body>
		);
	};
}

export default LoginForm;