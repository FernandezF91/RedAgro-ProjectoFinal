
import React, { Component } from 'react'
import { Navbar, Container, Form, Col, Row, Button, Nav } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
// import '../diseños/estilosGlobales.css';
import '../diseños/DatosDeUsuario.css';
import '../diseños/Registro.css';
import Modal from 'react-awesome-modal';
import { DatePickerInput } from 'rc-datepicker';

const maxDate = new Date();

class DatosDeUsuario extends Component {

	constructor(props) {

		super(props)

		this.state = {
			fields: [],
			errores: [],
			usuario: {},
			visible: false,
			mensajeError: "",
			id: this.props.id_productor //para ir pasando el ID del usuario de pantalla a pantalla
		}

		this.validarDatos = this.validarDatos.bind(this);
		this.mostrarPantallaProductor = this.mostrarPantallaProductor.bind(this);
		this.mostrarPantallaConsumidor = this.mostrarPantallaConsumidor.bind(this);
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
	}

	detectarCambios(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({
			fields
		})

	}

	cambiosFecha(e) {

		let fields = this.state.fields;
		fields["fecha_nac"] = e;

	}

	closeModal() {
		this.setState({
			visible: false
		});
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
			const path_principal = "http://localhost:3000/redAgro/login?u=";

			var username = this.state.fields["username"];
			var password = this.state.fields["password"];

			const final_path = path_principal + username + "&c=" + password;

			var _this = this;

			fetch(final_path, {
				method: "GET",
				headers: {

					'Content-type': 'application/json;charset=UTF-8',

				},
			})
				.then(function (response) {

					if (response.status !== 200) {

						// alert("Ocurrió algún problema. Intenta nuevamente")

						let mensajeError = "Ocurrió algun problema, intenta nuevamente"
						_this.setState({
							visible: true,
							mensajeError: mensajeError
						});

						return;

					}

					response.text().then(
						function (response) {
							if (response !== "") {
								_this.setState({ usuario: JSON.parse(response) });
								if (_this.state.usuario.rol === "Productor") {
									_this.mostrarPantallaProductor();
								} else {
									_this.mostrarPantallaConsumidor();
								}
							} else {
								let mensajeError = "Cuenta inexistente o datos incorrectos";
								_this.setState({
									visible: true,
									mensajeError: mensajeError
								});
							}
						});
				});
		}

		this.setState({
			errores
		})
	}

	mostrarPantallaPrincipal() {
		this.props.history.push({
			pathname: '/principalProductores',
			state: { id: this.state.id }
		})
	}

	mostrarPantallaProductor() {
		this.props.history.push({
			pathname: '/principalProductores',
			state: { id: this.state.usuario.id }
		})
	}

	mostrarPantallaConsumidor() {
		this.props.history.push("/principalConsumidores", { usuario: this.state.usuario });
	}

	render() {
		return (
			<div>
				<div className="titulosPrincipales">Datos de usuario</div>
				<div className="contenidoDU">
					<div className="nombreDU" >
						<Form.Group as={Row}>
							<Form.Label column sm={4}>
								Nombre
									</Form.Label>
							<Form.Control
								required
								type="nom"
								name="nombre"
								pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
								onChange={(e) => this.detectarCambios(e)}
							/>
						</Form.Group>
					</div>
					<div className="apellidoDU" >
						<Form.Group as={Row}>
							<Form.Label column sm={4}>
								Apellido
									</Form.Label>
							<Form.Control
								required
								type="ap"
								name="apellido"
								pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
								onChange={(e) => this.detectarCambios(e)}
							/>
						</Form.Group>
					</div>
					<div className="fechaNac">
						<Form.Group as={Row}>
							<Form.Label column sm={3}>
								Fecha de nacimiento
                                </Form.Label>
							<DatePickerInput
								ref="datePicker"
								name="fecha_nac"
								displayFormat='DD/MM/YYYY'
								maxDate={maxDate}
								className="calend"
								onChange={(e) => this.cambiosFecha(e)}
							/>
							<div className="errorConsu">{this.state.errores["fecha_nac"]}</div>
						</Form.Group>
					</div>
					<div className="telefonoDU" >
						<Form.Group as={Row}>
							<Form.Label column sm={4}>
								Teléfono
									</Form.Label>
							<Form.Control
								required
								type="tel"
								name="telefono"
								pattern="[0-9]{8,14}"
								onChange={(e) => this.detectarCambios(e)}
							/>
						</Form.Group>
					</div>
					<div className="emailDU" >
						<Form.Group as={Row}>
							<Form.Label column sm={4}>
								Mail
									</Form.Label>
							<Form.Control
								required
								type="mail"
								name="mail"
								onChange={(e) => this.detectarCambios(e)}
							/>
						</Form.Group>
					</div>
					<div className="botones">
						<div className="botonAtras">
							<a onClick={this.mostrarPantallaPrincipal}><Button variant="success">Cancelar</Button></a>
						</div>
						<div className="botonCrear">
							<Button variant="success" type="submit" onClick={(e) => this.handleSubmit(e)}>Crear</Button>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export default DatosDeUsuario;