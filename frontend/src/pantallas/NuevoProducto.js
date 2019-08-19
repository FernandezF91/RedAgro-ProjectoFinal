import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../diseños/Registro.css';
import '../diseños/estilosGlobales.css';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import { isDate } from 'moment';

class NuevoProducto extends Component {

	constructor(props) {
		super(props);
		this.state = {
			campos: [],
			errores: [],
			validated: false,
			value:'tipoProduccion',
		}

		this.limpiarCampos = this.limpiarCampos.bind(this);

	}

	//Control de cambio del DropDownList
	handleChange(event) {
    this.setState({value: event.target.value});
	}

	handleSubmit(e) {

		const form = e.currentTarget;
		
		this.setState({
			errores: []
		})

		let errores ={}

		if((form.checkValidity() === false)&&((!this.state.campos["fecha_nac"])||(!isDate(this.state.campos["fecha_nac"])))){

		errores["fecha_nac"]= "*Campo inválido";
		this.setState({errores});
        e.preventDefault();
		e.stopPropagation();

		} else if((!this.state.campos["fecha_nac"])||(!isDate(this.state.campos["fecha_nac"]))){

		errores["fecha_nac"]= "*Campo inválido";
		this.setState({errores});
		e.preventDefault();
		e.stopPropagation();
		

		}else if(form.checkValidity() === false){
			
		e.preventDefault();
		e.stopPropagation();

		}else {

			 this.setState({validated:true});
			 //this.crearUsuario();
			 alert("Registro exitoso");
			 this.props.history.push("/login");

		}
		this.setState({validated:true});
		
	}

	detectarCambios(e) {
		let campos = this.state.campos;
		campos[e.target.name] = e.target.value;
		this.setState({
			campos
		})
	}

	handleFormSubmit = formSubmitEvent => {
		formSubmitEvent.preventDefault();
		//  Chequear como lo guarda	
	};
	
	cambiosFecha(e) {
		let campos = this.state.campos;
		campos["fecha_nac"] = e;
		this.setState({campos})
	}
	
	limpiarCampos() {
		this.refs.form.reset();
	}

	render() {
		return (
			<div className="container">
				<Form noValidate validated={this.state.validated} ref="form" onSubmit={(e) => this.handleSubmit(e)}>
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
									Descripcion:
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

						{/* https://reactjs.org/docs/forms.html */}
						<form onSubmit={this.handleSubmit}>
							<label>Tipo de Producción:
								<select value={this.state.value} onChange={this.handleChange}>
									<option value="organica">Orgánica</option>
									<option value="agroecologica">Agroecológica</option>
								</select>
							</label>
							{/* <input type="submit" value="Submit" /> */}
						</form>

					
		

					<div className="botonesProducto">
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
		);
	};
}

export default NuevoProducto;