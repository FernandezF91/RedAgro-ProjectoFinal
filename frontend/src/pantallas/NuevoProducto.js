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
import PantallaPrincipalProductores from './PantallaPrincipalProductores';

const minDate=new Date();

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
			files: [],
			validated: false,
			id:this.props.id_productor
		}

		this.limpiarCampos = this.limpiarCampos.bind(this);
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
		

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

		const path_principal = "http://localhost:3000/redAgro/usuario_productor/nuevo_producto?id_productor=";

		const id_productor = this.props.id_productor;

		const path_final = path_principal+id_productor+"&id_producto=1";

		alert(path_final);

		fetch(path_final, {
			method: "POST",
			headers: {
				'Content-type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				"titulo": "Lechuga mantecosa recien hecha",
				"descripcion": "Lechuga",
				"fecha_vencimiento": "1991-08-12",
				"imagen": "null",
				"precio": "15",
				"stock": "10",
				"tiempo_preparacion": "25",
				"tipo_unidad": "Bolson",
				"tipo_produccion": "Agro"
				// "titulo"://this.state.campos["titulo"],
				// "descripcion": //this.state.campos["descripcion"],
				// "fecha_vencimiento": //this.state.campos["fecha_ven"],
				// "imagen": //"null",
				// "precio": //this.state.campos["precio"],
				// "stock": //this.state.campos["stock"],
				// "tiempo_preparacion": //this.state.campos["tiempo_preparacion"],
				// "tipo_unidad": //this.state.campos["tipo_unidad"],
				// "tipo_produccion": //this.state.campos["tipo_produccion"]
	
			}),
		})

			.then(function (response) {

				if (response.status !== 200) {

					alert("Ocurrió algún error inesperado. Intente nuevamente");
					return;

				}

				response.json().then(

					function (response) {

						// _this.setState({ validated: true });
						alert("Registro exitoso");
						// _this.props.history.push("/login");

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

	fileSelectedHandler(e) {

	this.setState({ files: [...this.state.files, ...e.target.files] })
	
  }

  cambiosSelect(opt) {

	let campos = this.state.campos;
		campos[opt.name] = opt.value;
		this.setState({ campos })
	
  }

  componentDidMount(){

alert(this.state.id);

	}

	mostrarPantallaPrincipal(){

		this.props.history.push({
	pathname:'/principalProductores',
	state:{id:this.state.id}
	})


	}

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Nuevo Producto</div>
					<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="dropdownCategoria">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Categoria:
								</Form.Label>

										<Select className="selectCategoria" name="categoria" options={productos} placeholder="Seleccione un item..." onChange={(opt)=>this.cambiosSelect(opt)} />

								</Form.Group>
							</div>
							<div className="dropdownTipoProducto">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de producto:
								</Form.Label>

										<Select className="selectTipoProducto" name="tipo_producto" options={productos} placeholder="Seleccione un item..." onChange={(opt)=>this.cambiosSelect(opt)} />

								</Form.Group>
							</div>
							<div className="titulo" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Título:
									</Form.Label>
									<Form.Control
										required
										type="titulo"
										name="titulo"
										pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
										onChange={(e) => this.detectarCambios(e)}
									/>
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
						<div className="imagen" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Imagen:
								</Form.Label>
					<input type="file" multiple id="file" name="img" onChange={(e)=>this.fileSelectedHandler(e)} />
					<Button variant="success" className="botonUpload"><label for="file">Elegir</label></Button>
							</Form.Group>
						</div>
						
							<div className="dropdownTipoUnidad">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de Unidad:
								</Form.Label>

										<Select className="selectTipoUnidad" name="tipo_unidad" options={unidades} placeholder="Seleccione un item..." onChange={(opt)=>this.cambiosSelect(opt)} />

								</Form.Group>
							</div>
							<div className="dropdownTipoProduccion">
								<Form.Group as={Row}>
									<Form.Label column sm={4}>
										Tipo de Producción:
								</Form.Label>
										<Select className="selectTipoProduccion" name="tipo_produccion" options={tipoProduccion} placeholder="Seleccione un item..." onChange={(opt)=>this.cambiosSelect(opt)} />
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
										minDate={minDate}
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
								<a onClick={this.mostrarPantallaPrincipal}><Button variant="success">Cancelar</Button></a>
							</div>
							<div className="botonCrear">
								<Button variant="success" type="submit" onClick={(e)=>this.handleSubmit(e)}>Crear</Button>
							</div>
				</div> 
			 </div>
		);
	};
}

export default NuevoProducto;