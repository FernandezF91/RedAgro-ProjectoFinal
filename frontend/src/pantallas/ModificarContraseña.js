    
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
import '../diseños/ModificarContraseña.css';
import Modal from 'react-awesome-modal';


class ModificarContraseña extends Component {

	constructor(props) {

		super(props)

		this.state = {
			fields: [],
			errores: [],
			usuario : {},
			visible : false,
			mensajeError:"",
			id:this.props.id_productor
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

    closeModal() {
        this.setState({
            visible : false
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

			const final_path = path_principal+username+"&c="+password;

		    var _this = this;

		 	fetch(final_path, {
			method: "GET",
			headers: {
				
				'Content-type': 'application/json;charset=UTF-8',
			
			},
		})
			.then(function(response) {

			if(response.status !==200){

			// alert("Ocurrió algún problema. Intente nuevamente")

			let mensajeError = "Ocurrió algun problema, intente nuevamente"
			_this.setState({visible:true,
			mensajeError:mensajeError});

			return;
			
			}

			response.text().then(

				function(response) {
				
					if (response!==""){

						_this.setState({usuario:JSON.parse(response)});

					if (_this.state.usuario.rol === "Productor") {

						_this.mostrarPantallaProductor();

					} else {

						_this.mostrarPantallaConsumidor();

					}

				}else{

					let mensajeError = "Cuenta inexistente o datos incorrectos";
			_this.setState({visible:true,
			mensajeError:mensajeError});
				} 
				
			});

			});		

		}

		this.setState({
			errores
		})



	}

	mostrarPantallaPrincipal(){

		this.props.history.push({
	pathname:'/principalProductores',
	state:{id:this.state.id}
	})
}

	mostrarPantallaProductor(){

	this.props.history.push({
	pathname:'/principalProductores',
	state:{id:this.state.usuario.id}
	})

	}

	mostrarPantallaConsumidor(){

	this.props.history.push("/principalConsumidores", {usuario: this.state.usuario});

	}


	render() {

		return (
			<div>
				<div className="titulosPrincipales">Modificar contraseña</div>
					<div className="contraseñaActual" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Contraseña actual:
									</Form.Label>
									<Form.Control
										required
										type="mf"
										name="contraseñaActual"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
						<div className="contraseñaNueva" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Contraseña nueva:
									</Form.Label>
									<Form.Control
										required
										type="mf"
										name="contraseñaNueva"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
						<div className="ConfirmarContraseña" >
							<Form.Group as={Row}>
								<Form.Label column sm={4}>
									Confirmar contraseña:
									</Form.Label>
									<Form.Control
										required
										type="mf"
										name="confirmarContraseña"
										onChange={(e) => this.detectarCambios(e)}
									/>
							</Form.Group>
						</div>
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

export default ModificarContraseña;