import React, { Component } from 'react'
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Registro.css';
import '../diseños/estilosGlobales.css';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import { isDate } from 'moment';
import Modal from 'react-awesome-modal';

const maxDate = new Date();

class RegistroProductor extends Component {

	constructor() {
		super()

		this.state = {
			campos: [],
			errores: [],
			mensaje: "",
			titulo: "Error",
			visible: false,
			validated: false,
		}

		this.limpiarCampos = this.limpiarCampos.bind(this);
	}

	closeModal() {
		this.setState({
			visible: false
		});
	}

	handleSubmit(e) {

		const form = e.currentTarget;

		this.setState({
			errores: []
		})

		let errores = {}

		if ((form.checkValidity() === false) && ((!this.state.campos["fecha_nac"]) || (!isDate(this.state.campos["fecha_nac"])))) {

			errores["fecha_nac"] = "*Campo inválido";
			this.setState({ errores });
			e.preventDefault();
			e.stopPropagation();

		} else if ((!this.state.campos["fecha_nac"]) || (!isDate(this.state.campos["fecha_nac"]))) {

			errores["fecha_nac"] = "*Campo inválido";
			this.setState({ errores });
			e.preventDefault();
			e.stopPropagation();


		} else if (form.checkValidity() === false) {

			e.preventDefault();
			e.stopPropagation();

		} else {
			e.preventDefault();
			this.crearUsuario(e);
		}
		this.setState({ validated: true });
	}

	detectarCambios(e) {
		let campos = this.state.campos;
		campos[e.target.name] = e.target.value;
		this.setState({
			campos
		})
	}

	cambiosFecha(e) {
		let campos = this.state.campos;
		campos["fecha_nac"] = e;

		this.setState({ campos })
	}

	limpiarCampos() {
		this.refs.form.reset();
		let campos = {}
		this.setState({ campos: campos });
	}

	crearUsuario(e) {
		var _this = this;
		var path = "http://localhost:3000/redAgro/validar_usuario_duplicado?mail=";
		path = path + _this.state.campos["email"];

		fetch(path, {
			method: "GET",
			headers: {
				'Content-type': 'application/json;charset=UTF-8',
			},
		})
			.then(function (response) {
				if (response.status === 400) {
					response.text().then(
						function (response) {
							_this.setState({
								visible: true,
								mensaje: response,
								titulo: "Error"
							})
							return;
						}
					)
				} else if (response.status === 200) {
					var pathCrear = "http://localhost:3000/redAgro/usuario_productor?razon_social=";
					pathCrear = pathCrear + _this.state.campos["razonSocial"];

					fetch(pathCrear, {
						method: "POST",
						headers: {
							'Content-type': 'application/json;charset=UTF-8',
						},
						body: JSON.stringify({
							"nombre": _this.state.campos["nombre"],
							"apellido": _this.state.campos["apellido"],
							"usuario": _this.state.campos["email"],
							"contraseña": _this.state.campos["password"],
							"fecha_nacimiento": _this.state.campos["fecha_nac"],
							"telefono": _this.state.campos["tel"],
							"rol": "Productor"
						}),
					})
						.then(function (response) {
							if (response.status !== 200) {
								_this.setState({
									visible: true,
									mensaje: "Ocurrió algun problema, intenta nuevamente"
								});
								return;
							}

							response.json().then(
								function (response) {
									_this.setState({
										validated: true,
										visible: true,
										mensaje: "Serás redireccionado directamente hacia el acceso de usuarios",
										titulo: "Registro exitoso!"
									});
									_this.mostrarLogin();
								});
						});
				} else {
					_this.setState({
						visible: true,
						mensaje: "Ocurrió algun problema, intenta nuevamente"
					})
					return;
				}
			});
	}

	mostrarLogin() {
		window.setTimeout(() => {
			this.props.history.push('/login')
			// history is available by design in this.props when using react-router
		}, 2000);

	}

	render() {
		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<Link to={'/'}><img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" /></Link>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<Row className="titulos">
						<div className="cuentaCultura">
							<p>Creá tu cuenta en culturaVerde</p>
						</div>
					</Row>
					<div className="contenidoRegistro">
						<Form noValidate validated={this.state.validated} ref="form" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="nombre" >
								<Form.Group as={Row} controlId="validationCustom01">
									<Form.Label column sm={2}>
										Nombre
                                		</Form.Label>
									<Col sm={10}>
										<Form.Control
											required
											type="text"
											name="nombre"
											pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
											onChange={(e) => this.detectarCambios(e)}
										/>
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="apellido">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Apellido
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="apellido" pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*" onChange={(e) => this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="fechaNacimiento">
								<Form.Group as={Row}>
									<Form.Label className="fechaLabel" column sm={3}>
										Fecha de nacimiento
                                </Form.Label>
									<Col sm={10}>
										<DatePickerInput
											name="fecha_nac"
											displayFormat='DD/MM/YYYY'
											className="calendario"
											maxDate={maxDate}
											onChange={(e) => this.cambiosFecha(e)}
											value={this.state.campos["fecha_nac"]}
										/>
										<div className="errorConsu">{this.state.errores["fecha_nac"]}</div>
									</Col>

								</Form.Group>
							</div>
							<div className="razonSocial">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Razón social
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="razonSocial" onChange={(e) => this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="tel">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Teléfono
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="telR" name="tel" pattern="[0-9]{8,14}" onChange={(e) => this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="email">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Email
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="email" name="email" onChange={(e) => this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="password">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Password
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="password" name="password" onChange={(e) => this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="botonesUsuarios">

								<div className="botonAtras">
									<a href='/seleccionUsuario'><Button variant="success">Atrás</Button></a>
								</div>
								<div className="botonCrear">
									<Button variant="success" type="submit">Crear</Button>
								</div>
								<div className="botonLimpiar">
									<Button variant="success" onClick={this.limpiarCampos}>Limpiar</Button>
								</div>
							</div>
						</Form>
					</div>
					<section>
						<Modal
							visible={this.state.visible}
							width="460"
							height="120"
							effect="fadeInUp"
							onClickAway={() => this.closeModal()}
						>
							<div>
								<h1>{this.state.titulo}</h1>
								<p>{this.state.mensaje}</p>
								<a href="javascript:void(0);" onClick={() => this.closeModal()}>Cerrar</a>
							</div>
						</Modal>
					</section>
				</Container>
			</body>
		);
	};
}

export default RegistroProductor;