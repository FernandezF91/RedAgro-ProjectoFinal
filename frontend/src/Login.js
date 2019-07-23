import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Login.css';


class LoginForm extends Component {

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
						<h2>Acceso a usuarios</h2>
						<div className="encabezadoLogin">
							<Form>
								<div className="usuario">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label>
											Usuario:
                                </Form.Label>
										<Col>
											<Form.Control type="email" placeholder="Usuario" />
										</Col>
									</Form.Group>
								</div>
								<div className="password">
									<Form.Group as={Row} controlId="formHorizontalPassword">
										<Form.Label>
											Password:
                                </Form.Label>
										<Col>
											<Form.Control type="password" placeholder="Password" />
										</Col>
									</Form.Group>
								</div>
							</Form>
						</div>
						<div className="botonesYolvide">
							<Button variant="success">Ingresar</Button>
							<Button variant="success">Registrar</Button>
							<a href="#"><p>olvidé mi contraseña</p></a>
						</div>
					</div>
				</Container>
			</body>
		);
	};
}

export default LoginForm;