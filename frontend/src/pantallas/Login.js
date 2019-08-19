    
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../diseños/Login.css';
import '../diseños/estilosGlobales.css';

class LoginForm extends Component {

	constructor(props) {

		super(props)

		this.state = {
			fields: [],
			errores: [],
            usuario : {}
		}

		this.validarDatos = this.validarDatos.bind(this);
		this.mostrarPantallaProductor = this.mostrarPantallaProductor.bind(this);
		this.mostrarPantallaConsumidor = this.mostrarPantallaConsumidor.bind(this);
	}

	detectarCambios(e) {

		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({
			fields
		})

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

			const final_path = path_principal+username+"&c="+password;

		// var _this = this;

		// fetch(final_path)  
		//   .then(  
		// 	function(response) {  
		// 	  if (response.status !== 200) {  
		// 		alert("Ocurrió algún problema. Intentelo nuevamente");  
		// 		return;  
		// 	  }
		// 	  if(response===null){

		// 		alert("jeje");

		// 	  }
		// 	  response.json().then(function(data) {  
		// 		alert(data.nombre +" "+ data.apellido);
        //        _this.setState({usuario:data});

		// 	  });  
		// 	} 
		//   )  
		//   .catch(function(err) {  
		// 	alert("Cuenta inexistente o datos incorrectos");  
        //     _this.setState({usuario: {}});
		//   });


		 	fetch(final_path, {
			method: "GET",
			headers: {
				
				'Content-type': 'application/json;charset=UTF-8',
			
			},
		})
			.then((response) => response.status !==200? alert("Ocurrió algún error inesperado. Intente nuevamente"):
			response.text())
			.then(
				(text) => {
				
					if (text!==""){

						this.setState({usuario:JSON.parse(text)});

					if (this.state.usuario.rol === "Productor") {

						this.mostrarPantallaProductor();

					} else {

						this.mostrarPantallaConsumidor();

					}

				}else{

					alert("Cuenta inexistente o datos incorrectos");
				} 
				
			}

			);		

		}

		this.setState({
			errores
		})



	}

	mostrarPantallaProductor(){

	this.props.history.push("/principalProductores", {usuario: this.state.usuario});

	}

	mostrarPantallaConsumidor(){

	this.props.history.push("/principalConsumidores", {usuario: this.state.usuario});

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
					<div className="formularioLogin">
						<h2>Acceso de usuarios</h2>
						<div className="encabezadoLogin">
							<Form>
								<div className="usuarioLogin">
									<Form.Group as={Row} controlId="formHorizontalEmail">
										<Form.Label column sm={2}>
											Usuario:
                                </Form.Label>
										<Col sm={10}>
											<Form.Control type="email" name="username" onChange={(e) => this.detectarCambios(e)} />
											<div className="error">{this.state.errores["username"]}</div>
										</Col>

									</Form.Group>
								</div>
								<div className="passwordLogin">
									<Form.Group as={Row} controlId="formHorizontalPassword" >
										<Form.Label column sm={2}>
											Password:
                                </Form.Label>
										<Col sm={10}>
											<Form.Control type="password" name="password" onChange={(e) => this.detectarCambios(e)} />
											<div className="error"> {this.state.errores["password"]} </div>
										</Col>
									</Form.Group>
								</div>
							</Form>
						</div>
						<div className="botonesLogin">
							<Nav.Link className="boton1" href=''><Button variant="success" onClick={this.validarDatos}>Ingresar</Button></Nav.Link>
							<Nav.Link className="boton2" href='/registroConsumidor'><Button variant="success">Registrar</Button></Nav.Link>						
						</div>
						<a href="/recupero_email"><p>olvidé mi contraseña</p></a>
					</div>
				</Container>
			</body>
		);
	};
}

export default LoginForm;