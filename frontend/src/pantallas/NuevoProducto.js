import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import { isDate } from 'moment';
import Select from 'react-select';

import '../diseños/Registro.css';
import '../diseños/estilosGlobales.css';


const productos = [
	{ label: "Tomate perita", value: 1 },
	{ label: "Tomate cherry", value: 2 },
	{ label: "Pepino", value: 3 },
	{ label: "Lechuga", value: 4 },
	{ label: "Repollo", value: 5 },
	{ label: "Zapallo", value: 6 },
	{ label: "Manzana", value: 7 },
	{ label: "Naranja", value: 8 },
	{ label: "Pomelo blanco", value: 9 },
	{ label: "Pomelo rosado", value: 10 },
	{ label: "Sandia", value: 11 },
	{ label: "Melon", value: 12 },
	{ label: "Aceitunas negras", value: 13 },
	{ label: "Aceituas verdes", value: 14 },
	{ label: "Miel", value: 15 },
	{ label: "Pickles", value: 16 },
];

const unidades = [
	{ label: "Kilos", value: 1 },
	{ label: "Bolsones", value: 2 },
];

const tipoProduccion = [
	{ label: "Orgánica", value: 1 },
	{ label: "Agroecológica", value: 2 },
];

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
					
					<div className="titulosPrincipales">Nuevo Producto</div>
					<div className="descripcionPagina">
					<h5>Agregue la información sobre el producto</h5>
					</div>
						<br /><br />
							<div className="dropdownOpciones">
								<div className="tituloProductos">Tipo de Producto</div>
								<Select className="dropdownProductos" options={productos} placeholder="Seleccione uno o varios items..." onChange={opt => console.log(opt.label, opt.value)} />
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

							<div className="dropdownOpciones">
								<div className="tituloProductos">Tipo de Unidad</div>
								<Select className="dropdownProductos" options={unidades} placeholder="Seleccione uno o varios items..." onChange={opt => console.log(opt.label, opt.value)} />
							</div>
						
							<div className="dropdownOpciones">
								<div className="tituloProductos">Tipo de Producción</div>
								<Select className="dropdownProductos" options={tipoProduccion} placeholder="Seleccione uno o varios items..." onChange={opt => console.log(opt.label, opt.value)} />
							</div>
														
						<div className="fechaVencimiento">
								<Form.Group as={Row}>
									<Form.Label className="fechaLabel" column sm={3}>
										Fecha de nacimiento:
                                </Form.Label>
									<Col sm={10}>
										<DatePickerInput
										ref = "datePicker"	
										name ="fecha_nac"								
										displayFormat='DD/MM/YYYY'
											className = "calendario"	
											onChange = {(e)=>this.cambiosFecha(e)}							
										/>
									<div className="errorConsu">{this.state.errores["fecha_nac"]}</div>
									</Col>
	
								</Form.Group>
							</div>
					
				</Form>
				
				<div className="botones">
						<Col>
							<Row>
								<div className="botonAtras">
									<a href='/principalProductores'><Button variant="success">Cancelar</Button></a>
								</div>
								<div className="botonCrear">
									<Button variant="success" type="submit">Crear</Button>
								</div>
								{/* <div className="botonLimpiar">
									<Button variant="success" onClick={this.limpiarCampos}>Limpiar</Button>
								</div> */}
							</Row>
						</Col>
					</div>
			</div>
		);
	};
}

export default NuevoProducto;