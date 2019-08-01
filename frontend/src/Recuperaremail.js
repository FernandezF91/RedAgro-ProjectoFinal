//este import para cabecera
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';

//este import para cuerpo   
import './recuperaremail.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

class Recuperaremail extends Component {

		render() {

		return (
			<body>
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
					</Navbar>
				</div>
				<Container fluid className="contenedorrecu">
					<div className="formularioRecuContra">
						<h2>Recuperar Contraseña</h2>
					</div>
					<div className="encabezadoRecucontra">
						<Form>
							<div className="Correoelectronico">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label>
											Correo electronico:
                                		</Form.Label>
									</Form.Group>
							</div>
						</Form>
					</div>
				</Container>
			</body>
				);

	};
}

export default Recuperaremail;