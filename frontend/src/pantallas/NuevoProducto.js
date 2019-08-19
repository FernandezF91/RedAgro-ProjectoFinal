import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


class NuevoProducto extends Component {

	constructor(props) {
		super(props);
		this.state = {
			campos: [],
			errores: [],
			validated: false,
			//Acá debería estar trayendo la opción que haya guardado
			selectedRadioOption: "Nunca"
		};

		this.handleCheckChange = this.handleCheckChange.bind(this);
		//this.limpiarCampos = this.limpiarCampos.bind(this)

	}

	handleRadioChange = changeEvent => {
		this.setState({
			selectedRadioOption: changeEvent.target.value
		});
	};

	handleCheckChange(e) {
		this.setState({
			[e.target.name]: e.target.checked
		});
	};

	handleFormSubmit = formSubmitEvent => {
		formSubmitEvent.preventDefault();
		//  Chequear como lo guardo
		
	};

	

	render() {
	

		return (
			<div className="container">
				<form onSubmit={this.handleFormSubmit}>
					<h1>Nuevo Producto</h1>

						<div className="nombre" >
							<Form.Group as={Row} controlId="validationCustom01">
								<Form.Label column sm={2}>
									Nombre:
									</Form.Label>
								<Col sm={10}>
									<Form.Control
										required
										type="text"
										name="nombre"
										pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
										onChange= {(e)=> this.detectarCambios(e)}
									/>
									<Form.Control.Feedback className="errores" type="invalid">
										*Campo inválido
											</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</div>

						<div className="descripcion" >
							<Form.Group as={Row} controlId="validationCustom01">
								<Form.Label column sm={2}>
									Nombre:
									</Form.Label>
								<Col sm={10}>
									<Form.Control
										required
										type="text"
										name="descripcion"
										pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
										onChange= {(e)=> this.detectarCambios(e)}
									/>
									<Form.Control.Feedback className="errores" type="invalid">
										*Campo inválido
											</Form.Control.Feedback>
								</Col>
							</Form.Group>
						</div>


					<div className="buttons">
						<Col>
							<Row>
								<div className="botonCrear">
									<Button variant="success" type="submit" onClick={this.handleFormSubmit}>Guardar</Button>
								</div>
								<div className="botonAtras">
									<a href='/principalProductores'><Button variant="success">Cancelar</Button></a>
								</div>
							</Row>
						</Col>
					</div>
				</form>
			</div>
		);
	};
}

export default NuevoProducto;