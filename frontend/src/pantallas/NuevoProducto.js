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

import '../diseños/nuevoProducto.css';
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
			validated: false
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

	handleSubmit(e) {

		var _this = this;

		const path_principal = "http://localhost:3000/redAgro/usuario/producto";

		fetch(path_principal, {
			method: "POST",
			headers: {
				'Content-type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				"nombre": this.state.campos["nombre"],
				"apellido": this.state.campos["apellido"],
				"usuario": this.state.campos["email"],
				"contraseña": this.state.campos["password"],
				"fecha_nacimiento": this.state.campos["fecha_nac"],
				"telefono": this.state.campos["tel"],
				"rol": "Productor"
			}),
		})

			.then(function (response) {

				if (response.status !== 200) {

					alert("Ocurrió algún error inesperado. Intente nuevamente");
					return;

				}

				response.json().then(

					function (response) {

						_this.setState({ validated: true });
						alert("Registro exitoso");
						_this.props.history.push("/login");

					});

			});

	}

	cambiosFecha(e) {
		let campos = this.state.campos;
		campos["fecha_nac"] = e;
		this.setState({ campos })
	}

	limpiarCampos() {
		this.refs.form.reset();
	}

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Nuevo Producto</div>
				{/* <div className="contenidoFormulario"> */}
					<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="dropdownTipoProducto">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de Producto:
								</Form.Label>

										<Select className="selectTipoProducto" options={productos} placeholder="Seleccione un item..." onChange={opt => console.log(opt.label, opt.value)} />

								</Form.Group>
							</div>
							<div className="dropdownTipoUnidad">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de Unidad:
								</Form.Label>

										<Select className="selectTipoUnidad" options={unidades} placeholder="Seleccione un item..." onChange={opt => console.log(opt.label, opt.value)} />

								</Form.Group>
							</div>
							<div className="dropdownTipoProduccion">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de Producción:
								</Form.Label>
										<Select className="selectTipoProduccion" options={tipoProduccion} placeholder="Seleccione un item..." onChange={opt => console.log(opt.label, opt.value)} />
								</Form.Group>
							</div>
						<div className="descripcion" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Descripción:
									</Form.Label>
									<Form.Control
										required
										type="desc"
										name="descripcion"
										pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
						<div className="fechaVencimiento">
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Fecha de vencimiento:
                                </Form.Label>
									<DatePickerInput
										name="fecha_ven"
										displayFormat='DD/MM/YYYY'
										className="calendario"
										onChange={(e) => this.cambiosFecha(e)}
									/>
							</Form.Group>
						</div>
						<div className="stock">
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Stock:
                                </Form.Label>
									<Form.Control
										required
										type="number"
										name="stock"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
						<div className="precio">
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Precio:
                                </Form.Label>
									<Form.Control
										required
										type="number"
										name="precio"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
						<div className="tiempo_preparacion">
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Tiempo de preparación:
                                </Form.Label>
									<Form.Control
										required
										type="number"
										name="tiempo_preparacion"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
					</Form>
				<div className="botonesNuevoProducto">
							<div className="botonAtras">
								<a href='/principalProductores'><Button variant="success">Cancelar</Button></a>
							</div>
							<div className="botonCrear">
								<Button variant="success" type="submit">Crear</Button>
							</div>
				</div>
			 </div>
		);
	};
}

export default NuevoProducto;