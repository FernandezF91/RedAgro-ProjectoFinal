//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'
import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import DropdownButton from 'react-bootstrap/DropdownButton'

import ListadoReservas from '../pantallas/ListadoReservas';
import AlertaConsumidor from '../pantallas/AlertaConsumidor';
import Carrito from '../pantallas/Carrito';
import PreferenciasConsumidor from '../pantallas/PreferenciasConsumidor';
import DatosDeUsuario from '../pantallas/DatosDeUsuario';
import ModificarContraseña from '../pantallas/ModificarContraseña';
import Geolocalizacion from '../pantallas/Geolocalizacion';
import BarraNavegacion from './BarraNavegacion';
import ResultadoBusqueda from './ResultadoBusqueda';
import Checkout from './Checkout';

//hacerlo con todas las pantallas nuevas para que funcione el ruteo e ir pasando el ID del usuario
const ListadoReservasRouter = withRouter(ListadoReservas);
const AlertaConsumidorRouter = withRouter(AlertaConsumidor);
const PreferenciasConsumidorRouter = withRouter(PreferenciasConsumidor);
const EditarDatosRouter = withRouter(DatosDeUsuario);
const ModificarContraseniaRouter = withRouter(ModificarContraseña);
const GeolocalizacionRouter = withRouter(Geolocalizacion);
const ResultadoBusquedaRouter = withRouter(ResultadoBusqueda);
const CheckoutRouter = withRouter(Checkout);

class PantallaPrincipalconsumidores extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: localStorage.getItem('myLocalStorageConsumidor') || this.props.location.state.id, //paso id de usuario desde el LOGIN
            user: localStorage.getItem('myLocalStorageConsumidor') || this.props.location.state.user,
            rolUsuario: localStorage.getItem('myLocalStorageConsumidor') || this.props.location.state.rolUsuario,
            busqueda: '',
            productosSeleccionados: [],
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.handleNuevaBusqueda = this.handleNuevaBusqueda.bind(this);
        this.actualizarProductosSeleccionados = this.actualizarProductosSeleccionados.bind(this);
    }

componentDidMount(){

localStorage.setItem('myLocalStorageConsumidor', this.state.id);
localStorage.setItem('myLocalStorageConsumidor', this.state.user);
localStorage.setItem('myLocalStorageConsumidor', this.state.rolUsuario);

}


    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: {
                id: this.state.id,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    handleNuevaBusqueda(busqueda) {
        this.setState({ busqueda });
        this.props.history.push({
            pathname: '/principalConsumidores/ResultadoBusqueda',
            state: {
                id: this.state.id,
                busqueda: busqueda
            }
        })
    }

    actualizarProductosSeleccionados(productos) {
        this.setState({ productosSeleccionados: productos })
    }

    render() {
        return (
            <div className="fondo">
                <BarraNavegacion
                    productosSeleccionados={this.state.productosSeleccionados}
                    rolUsuario={this.state.rolUsuario}
                    handleNuevaBusqueda={this.handleNuevaBusqueda} />

                <Container fluid className="contenedor">
                    <Row className="filaContenedora">
                        <Col sm={2} className="menuConsumidor">
                            <Row className="cuenta">
                                <i className="fas fa-bars iconoMiCuenta" />
                                <h4>Mi cuenta</h4>
                            </Row>
                            <NavDropdown.Divider className="divisor" />
                            <Row className="itemsSubmenu">
                                <i className="fas fa-shopping-basket iconosMenuLateral" />
                                <NavDropdown title="Comprar" id="compra_drop" className="com_drop">
                                    <NavDropdown.Item>
                                        <Link to="/principalConsumidores/Geolocalizacion" id="items">Geolocalización</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown title="Categoria" id="categoria_drop" drop="right">
                                    <NavDropdown.Item id="itemArea">
                                    <Row clasName="titulos">
                                    <Col id="categorias">Verduras</Col>
                                    <Col id="categorias">Frutas</Col>
                                    <Col id="categorias">Otros</Col>
                                </Row>
                                <NavDropdown.Divider />
                                <Row clasName="productos">
                                    <Col>Lechuga</Col>
                                    <Col>Tomate</Col>
                                    <Col>Miel</Col>
                                </Row>

                                    </NavDropdown.Item>
                       
                                    </NavDropdown >
                              
                                </NavDropdown>
                            </Row>
                            <Row className="itemsMenuReservas">
                                <i className="fas fa-tasks iconosMenuLateral" />
                                <Link to={'/principalConsumidores/ListadoReservas'}>
                                    <p>Reservas</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-user-edit iconosMenuLateral" />
                                <Link to={'/principalConsumidores/PreferenciasConsumidor'}>
                                    <p>Preferencias</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-bell iconosMenuLateral" />
                                <Link to={'/principalConsumidores/Alertas'}>
                                    <p>Alertas</p>
                                </Link>
                            </Row>
                            <Row className="itemsSubmenu">
                                <i className="fas fa-cogs iconosMenuLateral" />
                                <div className="conf_drop">
                                    <NavDropdown title="Configuración" id="config_dropConsu">
                                        <NavDropdown.Item>
                                            <Link to="/principalConsumidores/EditarDatos" id="items">Editar mis datos</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link to="/principalConsumidores/modificarContraseña" id="items">Modificar contraseña</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Row>
                        </Col>
                        <Col className="ruteo">
                            <Route path={'/principalConsumidores/ListadoReservas'} render={(props) =>
                                <ListadoReservasRouter
                                    id_usuario={this.state.id}
                                    rolUsuario={this.state.rolUsuario} />} />

                            <Route path={'/principalConsumidores/Alertas'} render={(props) =>
                                <AlertaConsumidorRouter
                                    id_consumidor={this.state.id} />} />

                            <Route path={'/principalConsumidores/PreferenciasConsumidor'} render={(props) =>
                                <PreferenciasConsumidorRouter
                                    id_consumidor={this.state.id} />} />

                            <Route path={'/principalConsumidores/Carrito'} render={(props) =>
                                <Carrito
                                    id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados}
                                    actualizarProductosSeleccionados={this.actualizarProductosSeleccionados} />} />

                            <Route path={'/principalConsumidores/EditarDatos'} render={(props) =>
                                <EditarDatosRouter
                                    usuario={this.state.user} />} />

                            <Route path={'/principalConsumidores/modificarContraseña'} render={(props) =>
                                <ModificarContraseniaRouter
                                    usuario={this.state.user} />} />

                            <Route path={'/principalConsumidores/Geolocalizacion'} render={(props) =>
                                <GeolocalizacionRouter
                                    id_consumidor={this.state.id} />} />

                            <Route path={'/principalConsumidores/ResultadoBusqueda'} render={(props) =>
                                <ResultadoBusquedaRouter
                                    id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados}
                                    busqueda={this.state.busqueda}
                                    actualizarProductosSeleccionados={this.actualizarProductosSeleccionados} />} />

                            <Route path={'/principalConsumidores/Checkout'} render={(props) =>
                                <CheckoutRouter
                                    id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados}
                                    user={this.state.user} />} />
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    };
}
export default PantallaPrincipalconsumidores;