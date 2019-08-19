//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'
import { MDBIcon } from "mdbreact";
import Row from 'react-bootstrap/Row';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

//imagenes para barra
import culturaVerde from '../imagenes/cultura-verde-2.png';
import usuario from '../imagenes/usuario.png';
import carrito from '../imagenes/carrito2.png';

//imagenes para menu desplegable
import miCuenta from '../imagenes/Micuenta.png'
import campanalertas from '../imagenes/campanalertas.png';
import configuracion from '../imagenes/configuracion.png';
import reservas from '../imagenes/reservas.png';
import compras from '../imagenes/compras.png';
import preferencias from '../imagenes/preferencias.png';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Reservas from '../pantallas/Reservas';
import AlertaConsumidor from '../pantallas/AlertaConsumidor';


class PantallaPrincipalconsumidores extends Component {

	constructor(props) {

		super(props)

		this.state = {
			
			usuario:{}

		}

	}


	render() {

		return (

			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar>
						<div className="culturaVerde">
							<img src={culturaVerde} width="130px" height="50px"></img>
						</div>
						<div className="barraBusqueda">
							<Row>
								<input type="text" placeholder="Buscar productos y productores.. " name="search" />
								<button type="submit"><i class="fa fa-search"></i></button>
							</Row>
						</div>
						<div className="iconos">
							<Row>
								<div className="imagenUsuario">
									<img src={usuario} width="30px" height="30px"></img>
								</div>
								<div className="menuUsuario">
									<NavDropdown title="Usuario" id="nav-dropdown">
										<NavDropdown.Item href="#action/3.1">Mi cuenta</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="#action/3.2">Salir</NavDropdown.Item>
									</NavDropdown>
								</div>
								<div className="alertas">
									<img src={campanalertas} width="50px" height="50px"></img>
								</div>
								<div className="carrito">
									<img src={carrito} width="40px" height="40px"></img>
								</div>
							</Row>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">

					<Row className="filaContenedora">
						<Col sm={2} className="menuConsumidor">
							<div className="cuenta">
								<Row>
									<img src={miCuenta} width="30px" height="25px"></img> <h4>Mi cuenta</h4>
								</Row>
							</div>
							<div className="divisor">
								<NavDropdown.Divider />
							</div>
							<div className="subMenu">
								<div className="reserva">
									<Row>
										<img src={reservas} width="30px" height="25px"></img> <Link to={'/principalConsumidores/reservas'}><p>Reservas</p></Link>
									</Row>
								</div>
								<div className="alerta">
									<Row>
										<img src={campanalertas} width="30px" height="35px"></img><Link to={'/principalConsumidores/Alertas'}><p>Alertas</p></Link>
									</Row>
								</div>
								<div className="preferencia">
									<Row>
										<img src={preferencias} width="30px" height="19px"></img><p>Preferencias</p>
									</Row>
								</div>
								<div className="compra">
									<Row>
										<div className="imagen_compras">
											<img src={compras} width="30px" height="19px"></img>
										</div>
										<div className="com_drop">
											<NavDropdown title="Comprar" id="compra_drop">
												<NavDropdown.Item href="#action/3.1">Geolocalización</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item href="#action/3.2">Categorias</NavDropdown.Item>
											</NavDropdown>
										</div>
									</Row>
								</div>
								<div className="configuracion">
									<Row>
										<div className="imagen_conf">
											<img src={configuracion} width="30px" height="19px"></img>
										</div>
										<div className="conf_drop">
											<NavDropdown title="Configuración" id="config_drop">
												<NavDropdown.Item href="#action/3.1">Editar mis datos</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item href="#action/3.2">Modificar contraseña</NavDropdown.Item>
											</NavDropdown>
										</div>
									</Row>
								</div>
							</div>
						</Col>
						<Col className="ruteo">
							<Route path={'/principalConsumidores/reservas'} component={Reservas} />
							<Route path={'/principalConsumidores/Alertas'} component={AlertaConsumidor} />
						</Col>
					</Row>
					
				</Container>
			</body>

		);
	};
}

export default PantallaPrincipalconsumidores;