//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'
import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
 
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
            id: this.props.location.state.id, //paso id de usuario desde el LOGIN
            user:this.props.location.state.user,
            rolUsuario: this.props.location.state.rolUsuario,
            productosSeleccionados: [],
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }
 
    componentDidMount() {
        alert(this.state.id);
    }
 
    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { 
                id: this.state.id,
                rolUsuario: this.state.rolUsuario
             }
        })
 
        alert(this.state.id);
    }
 
    render() {
        return (
            <div className="fondo">
                <BarraNavegacion productosSeleccionados={this.state.productosSeleccionados} rolUsuario={this.state.rolUsuario} />
                <Container fluid className="contenedor">
                    <Row className="filaContenedora">
                        <Col sm={2} className="menuConsumidor">
                            <Row className="cuenta">
                                <i class="fas fa-bars iconoMiCuenta" />
                                <h4>Mi cuenta</h4>
                            </Row>
                            <NavDropdown.Divider className="divisor" />
                            <Row className="itemsMenu itemsSubmenu">
                                <i class="fas fa-shopping-basket iconosMenuLateral" />
                                <NavDropdown title="Comprar" id="compra_drop" className="com_drop">
                                    <NavDropdown.Item>
                                        <Link to="/principalConsumidores/Geolocalizacion" id="items">Geolocalización</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.2" id="items">Categorias</NavDropdown.Item>
                                </NavDropdown>
                            </Row>
                            <Row className="itemsMenuReservas">
                                <i class="fas fa-tasks iconosMenuLateral" />
                                <Link to={'/principalConsumidores/ListadoReservas'}>
                                    <p>Reservas</p>
                                </Link>
                            </Row>
                            <Row className="itemsMenu">
                                <i class="fas fa-user-edit iconosMenuLateral" />
                                <Link to={'/principalConsumidores/PreferenciasConsumidor'}>
                                    <p>Preferencias</p>
                                </Link>
                            </Row>
                            <Row className="itemsMenu">
                                <i class="fas fa-bell iconosMenuLateral" />
                                <Link to={'/principalConsumidores/Alertas'}>
                                    <p>Alertas</p>
                                </Link>
                            </Row>
                            <Row className="itemsMenu itemsSubmenu">
                                <i class="fas fa-cogs iconosMenuLateral" />
                                <div className="conf_drop">
                                    <NavDropdown title="Configuración" id="config_dropConsu">
                                        <NavDropdown.Item>
                                            <Link to="/principalConsumidores/EditarDatos" id="items">Editar mis datos</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link to="/principalConsumidores/modificarContraseña" id="items">Modificar Contraseña</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Row>
                        </Col>
                        <Col className="ruteo">
                            <Route path={'/principalConsumidores/ListadoReservas'}
                                render={(props) => <ListadoReservasRouter id_usuario={this.state.id} />} />
                            <Route path={'/principalConsumidores/Alertas'}
                                render={(props) => <AlertaConsumidorRouter id_consumidor={this.state.id} />} />
                            <Route path={'/principalConsumidores/PreferenciasConsumidor'}
                                render={(props) => <PreferenciasConsumidorRouter id_consumidor={this.state.id} />} />
                            <Route path={'/principalConsumidores/Carrito'}
                                render={(props) => <Carrito id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados} />} />
                            <Route path={'/principalConsumidores/EditarDatos'}
                                render={(props) => <EditarDatosRouter usuario={this.state.user} />} />
                            <Route path={'/principalConsumidores/modificarContraseña'}
                                render={(props) => <ModificarContraseniaRouter usuario={this.state.user} />} />
                            <Route path={'/principalConsumidores/Geolocalizacion'}
                                render={(props) => <GeolocalizacionRouter id_consumidor={this.state.id} />} />
                            <Route path={'/principalConsumidores/ResultadoBusqueda'}
                                render={(props) => <ResultadoBusquedaRouter id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados} />} />
                            <Route path={'/principalConsumidores/Checkout'}
                                render={(props) => <CheckoutRouter id_consumidor={this.state.id}
                                    productosSeleccionados={this.state.productosSeleccionados} />} />
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    };
}
export default PantallaPrincipalconsumidores;