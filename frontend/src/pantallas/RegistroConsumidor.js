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

class RegistroConsumidor extends Component {

	constructor() {

		super()

		this.state = {
			campos: [],
			errores: [],
			validated: false,
		}

		this.limpiarCampos = this.limpiarCampos.bind(this);

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

			 e.preventDefault();
			 this.crearUsuario(e);

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


	cambiosFecha(e) {

		let campos = this.state.campos;

		campos["fecha_nac"] = e;

	this.setState({campos})
	}


	limpiarCampos() {

		this.refs.form.reset();

	}

	crearUsuario(e){

		var _this = this;

		fetch("http://localhost:3000/redAgro/usuario", {
			method: "POST",
			headers: {
				'Content-type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({  "nombre":this.state.campos["nombre"],
			 						"apellido": this.state.campos["apellido"],
			 						"usuario": this.state.campos["email"],
			 						"contraseña": this.state.campos["password"],
									 "fecha_nacimiento":this.state.campos["fecha_nac"],
									 "telefono":this.state.campos["tel"],
									"rol": "Consumidor"}),
		})
			
			.then(function(response) {

			if(response.status !==200){

			alert("Ocurrió algún error inesperado. Intente nuevamente");
			return;
			
			}

			response.json().then(

				function(response) {

					_this.setState({validated:true});
					 alert("Registro exitoso");
			 _this.props.history.push("/login");				
				
			});

			});		

			

	}

	render() {

		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
						<img src={culturaVerde} width="130px" height="50px"></img>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<div className="contenidoRegistro">
						<Form noValidate validated={this.state.validated} ref="form" onSubmit={(e) => this.handleSubmit(e)}>
							<div className="titulos">
								<Form.Group as={Row}>
									<div className="cuentaCultura">
										<p>Creá tu cuenta en culturaVerde</p>
									</div>
									<div className="cuentaUsuario">
										<a href="/registroProductor"><p>Creá tu cuenta productor</p></a>
									</div>
								</Form.Group>
							</div>
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
							<div className="apellido">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Apellido:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="text" name="apellido" pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*" onChange= {(e)=> this.detectarCambios(e)}/>
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="fechaNacimiento">
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
							<div className="tel">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Teléfono:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="tel" name="tel" pattern="[0-9]{8,14}" onChange= {(e)=> this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="email">
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										Email:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="email" name="email" onChange= {(e)=> this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>

									</Col>

								</Form.Group>
							</div>
							<div className="password">
								<Form.Group as={Row} >
									<Form.Label column sm={2}>
										Password:
                                </Form.Label>
									<Col sm={10}>
										<Form.Control required type="password" name="password" onChange= {(e)=> this.detectarCambios(e)} />
										<Form.Control.Feedback className="errores" type="invalid">
											*Campo inválido
												</Form.Control.Feedback>
									</Col>
								</Form.Group>
							</div>
							<div className="botonesUsuarios">
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
				</Container>
			</body>
		);
	};
}

export default RegistroConsumidor;