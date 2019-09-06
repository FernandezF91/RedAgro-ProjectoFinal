//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'
import { MDBIcon } from "mdbreact";
import { Navbar, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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

import ListadoReservas from '../pantallas/ListadoReservas';
import AlertaConsumidor from '../pantallas/AlertaConsumidor';
import Carrito from '../pantallas/Carrito';
import PreferenciasConsumidor from '../pantallas/PreferenciasConsumidor';

const ListadoReservasRouter = withRouter(ListadoReservas);
const AlertaConsumidorRouter = withRouter(AlertaConsumidor);
const PreferenciasConsumidorRouter = withRouter(PreferenciasConsumidor);

class PantallaPrincipalconsumidores extends Component {

	constructor(props) {

		super(props)

		this.state = {

			id: this.props.location.state.id //paso id de usuario desde el LOGIN

		}

		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

	}

	componentDidMount() {
		alert(this.state.id);
	}

	mostrarPantallaPrincipal() {

		this.props.history.push({

			pathname: '/principalConsumidores',
			state: { id: this.state.id }
		})

		alert(this.state.id);
	}

	render() {
		return (
			<body className="fondo">
				<div className="barraNavegacion">
					<Navbar className="sombraBarra">
						<div className="culturaVerde">
							<Link to={'/'}><img src={culturaVerde} width="130px" height="50px"></img></Link>
						</div>
						<div className="barraBusqueda">
							<Row>
								<input type="text" placeholder="Buscar productos y productores.. " name="search" />
								<button type="submit"><i class="fa fa-search"></i></button>
							</Row>
						</div>
						<div className="iconos">
							<Row>
								<i class="fas fa-user iconosBarra"></i>
								<div className="menuUsuario">
									<NavDropdown title="Usuario" id="nav-dropdown">
										<NavDropdown.Item href="/principalConsumidores">Mi cuenta</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/login">Salir</NavDropdown.Item>
									</NavDropdown>
								</div>
								<i class="fas fa-bell iconosBarra"></i>
								<Link to={'/principalConsumidores/Carrito'}><i class="fas fa-shopping-cart iconosBarra"></i></Link>
							</Row>
						</div>
					</Navbar>
				</div>
				<Container fluid className="contenedor">
					<Row className="filaContenedora">
						<Col sm={2} className="menuConsumidor">
							<div className="cuenta">
								<Row>
									<i class="fas fa-bars iconoMiCuenta"></i><h4>Mi cuenta</h4>
								</Row>
							</div>
							<div className="divisor">
								<NavDropdown.Divider />
							</div>
							<div className="subMenu">
								<div className="itemsMenu">
									<Row>
										<i class="fas fa-shopping-basket iconosMenuLateral"></i>
										<div className="com_drop">
											<NavDropdown title="Comprar" id="compra_drop">
												<NavDropdown.Item href="#action/3.1">Geolocalización</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item href="#action/3.2">Categorias</NavDropdown.Item>
											</NavDropdown>
										</div>
									</Row>
								</div>
								<div className="itemsMenu">
									<Row>
										<i class="fas fa-tasks iconosMenuLateral"></i><Link to={'/principalConsumidores/ListadoReservas'}><p>Reservas</p></Link>
									</Row>
								</div>
								<div className="itemsMenu">
									<Row>
										<i class="fas fa-user-edit iconosMenuLateral"></i><Link to={'/principalConsumidores/PreferenciasConsumidor'}><p>Preferencias</p></Link>
									</Row>
								</div>
								<div className="itemsMenu">
									<Row>
										<i class="fas fa-bell iconosMenuLateral"></i><Link to={'/principalConsumidores/Alertas'}><p>Alertas</p></Link>
									</Row>
								</div>
								<div className="itemsMenu">
									<Row>
										<i class="fas fa-cogs iconosMenuLateral"></i>
										<div className="conf_drop">
											<NavDropdown title="Configuración" id="config_dropConsu">
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
							<Route path={'/principalConsumidores/ListadoReservas'}
								render={(props) => <ListadoReservasRouter id_consumidor={this.state.id} />} />
							<Route path={'/principalConsumidores/Alertas'}
								render={(props) => <AlertaConsumidorRouter id_consumidor={this.state.id} />} />
							<Route path={'/principalConsumidores/PreferenciasConsumidor'}
								render={(props) => <PreferenciasConsumidorRouter id_consumidor={this.state.id} />} />
							<Route path={'/principalConsumidores/Carrito'}
								render={(props) => <Carrito id_consumidor={this.state.id} />} />
						</Col>
					</Row>
				</Container>
			</body>
		);
	};
}

export default PantallaPrincipalconsumidores;
