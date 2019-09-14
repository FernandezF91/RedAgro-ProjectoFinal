import React, { Component } from 'react';
import { Form, Row, Button } from 'react-bootstrap';


import '../diseños/Nuevopuntoentrega.css';
import '../diseños/estilosGlobales.css';

class IngresarPuntoEntrega extends Component {

	constructor(props) {
    	super(props);
		
		this.state = {
			campos: [],
			files: [],
			titulo:"",
			visible: false,
			mensaje:"",
			id:this.props.id_productor
		}

    	this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.limpiarCampos = this.limpiarCampos.bind(this);
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
		
	}

	handleChange(event) {
    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    	alert('Your favorite flavor is: ' + this.state.value);
    	event.preventDefault();
	}

	detectarCambios(e) {
		let campos = this.state.campos;
		campos[e.target.name] = e.target.value;
		this.setState({
			campos
		})
	}

	mostrarPantallaPrincipal() {

		this.props.history.push({
			pathname: '/principalProductores',
			state: { id: this.state.id }
		})

	}

	limpiarCampos() {

		this.refs.form.reset();
		let campos = {}
		this.setState({ campos: campos });
	}

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Nuevo punto de entrega</div>
				<div className="condicionesInputsCO">Todos los campos son obligatorios</div>
				<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="domicilio" >
						<Form.Group as={Row}>
							<Form.Label column sm={3}>
								Domicilio:
									</Form.Label>
							<Form.Control
								type="domicilio"
								name="domicilio"
								pattern="{1,100}"
							/>
						</Form.Group>
					</div>
					<div className="numero" >
							<Form.Group as={Row}>
								<Form.Label column sm={3}>
									Nro:
									</Form.Label>
									<Form.Control
										required
										type="numero"
										name="numero"
										pattern="[0-9]{8,14}"
										
									/>
							</Form.Group>
					</div>
					<div className="localidad" >
						<Form.Group as={Row}>
							<Form.Label column sm={3}>
								Localidad:
									</Form.Label>
							<Form.Control
								type="localidad"
								name="localidad"
								pattern="{1,100}"
								
							/>
						</Form.Group>
					</div>
					<div className="provincia" >
						<Form.Group as={Row}>
							<Form.Label column sm={3}>
								Provincia:
									</Form.Label>
							<Form.Control
								type="provincia"
								name="provincia"
								pattern="{1,100}"
								
							/>
						</Form.Group>
					</div>
				</Form>	
				<div className="botonesnuevopuntoentrega">
					<div className="botonAtras">
						<a onClick={this.mostrarPantallaPrincipal}><Button variant="success">Cancelar</Button></a>
					</div>
					<div className="botonCrear">
						<Button variant="success" type="submit">Crear</Button>
					</div>
					<div className="botonLimpiar">
						<Button variant="success" onClick={this.limpiarCampos}>Limpiar</Button>
					</div>		
				</div>
						
			</div>

			

		)}

		


}
export default IngresarPuntoEntrega;