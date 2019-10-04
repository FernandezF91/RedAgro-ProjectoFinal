//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { NavDropdown, Col, Row, Container } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import AlertaProductor from '../pantallas/AlertaProductor';
import NuevoProducto from '../pantallas/NuevoProducto';
import CargarHistorico from '../pantallas/CargarHistorico';
import ModificarContraseña from '../pantallas/ModificarContraseña';
import DatosDeUsuario from '../pantallas/DatosDeUsuario';
import ListadoReservas from '../pantallas/ListadoReservas';
import IngresarPuntoEntrega from '../pantallas/IngresarPuntoEntrega';
import ListadoPuntosEntrega from '../pantallas/ListadoPuntosEntrega';
import ListadoProductos from '../pantallas/ListadoProductos';
import Estadisticas from '../pantallas/Estadisticas';
import BarraNavegacion from './BarraNavegacion';

//hacerlo con todas las pantallas nuevas para que funcione el ruteo e ir pasando el ID del usuario
const NuevoProductoRouter = withRouter(NuevoProducto);
const AlertaProductorRouter = withRouter(AlertaProductor);
const ModificarContraseniaRouter = withRouter(ModificarContraseña);
const EditarDatosRouter = withRouter(DatosDeUsuario);
const ListadoReservasRouter = withRouter(ListadoReservas);
const IngresarPuntoEntregaRouter = withRouter(IngresarPuntoEntrega);
const ListadoProductosRouter = withRouter(ListadoProductos);
const EstadisticasRouter = withRouter(Estadisticas);
const HitoricoRouter = withRouter(CargarHistorico);

class PantallaPrincipalProductores extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state.id, //paso id de usuario desde el LOGIN
            user: this.props.location.state.user,//paso el usuario desde el LOGIN
            rolUsuario: this.props.location.state.rolUsuario

        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: {
                id: this.state.id,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    render() {
        return (
            <div className="fondo">
                <BarraNavegacion rolUsuario={this.state.rolUsuario} />
                <Container fluid className="contenedor">
                    <Row className="filaContenedora">
                        <Col sm={2} className="menuConsumidor">
                            <Row className="cuenta">
                                <i className="fas fa-bars iconoMiCuenta" />
                                <h4>Mi cuenta</h4>
                            </Row>
                            <NavDropdown.Divider className="divisor" />
                            <Row>
                                <i className="fas fa-store iconosMenuLateral" />
                                <NavDropdown title="Productos" id="producto_drop">
                                    <NavDropdown.Item id="items">
                                        <Link to="/principalProductores/ListadoProductos" id="items">Listado de productos</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item id="items">
                                        <Link to="/principalProductores/NuevoProducto" id="items">Nuevo producto</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.2">Ofertas</NavDropdown.Item>
                                </NavDropdown>
                            </Row>
                            <Row>
                                <i className="fas fa-map-marker-alt iconosMenuLateral" id="market" />
                                <NavDropdown title="Puntos de entrega" id="puntoentrega_drop" className="iconoEntrega">
                                    <NavDropdown.Item id="items">
                                        <Link to="/principalProductores/ListadoPuntosEntrega" id="items">Listado puntos de entrega</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item id="items">
                                        <Link to="/principalProductores/IngresarPuntoEntrega" id="items">Nuevo punto de entrega</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Row>
                            <Row className="itemsMenuReservas">
                                <i className="fas fa-tasks iconosMenuLateral" />
                                <Link to={'/principalProductores/ListadoReservas'}>
                                    <p>Reservas</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-clipboard-list iconosMenuLateral" />
                                <p>Planificación</p>
                            </Row>
                            <Row>
                                <i className="fas fa-chart-line iconosMenuLateral" />
                                <Link to={'/principalProductores/Estadisticas'}>
                                    <p>Estadísticas</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-history iconosMenuLateral" />
                                <Link to={'/principalProductores/CargarHistorico'}>
                                    <p>Histórico</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-bell iconosMenuLateral" />
                                <Link to={'/principalProductores/Alertas'}>
                                    <p>Alertas</p>
                                </Link>
                            </Row>
                            <Row>
                                <i className="fas fa-cogs iconosMenuLateral" />
                                <NavDropdown title="Configuración" id="config_drop" className="conf_drop">
                                    <NavDropdown.Item>
                                        <Link to="/principalProductores/EditarDatos" id="items">Editar mis datos</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <Link to="/principalProductores/ModificarContraseña" id="items">Modificar contraseña</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Row>
                        </Col>
                        <Col className="ruteo">
                            <Route path='/principalProductores/Alertas'
                                render={(props) => <AlertaProductorRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/NuevoProducto'
                                render={(props) => <NuevoProductoRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/CargarHistorico'
                                render={(props) => <HitoricoRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/modificarContraseña'
                                render={(props) => <ModificarContraseniaRouter usuario={this.state.user} />} />
                            <Route path='/principalProductores/EditarDatos'
                                render={(props) => <EditarDatosRouter usuario={this.state.user} />} />
                            <Route path={'/principalProductores/ListadoReservas'}
                                render={(props) => <ListadoReservasRouter id_usuario={this.state.id} />} />
                            <Route path={'/principalProductores/IngresarPuntoEntrega'}
                                render={(props) => <IngresarPuntoEntregaRouter id_productor={this.state.id} />} />
                            <Route path={'/principalProductores/ListadoPuntosEntrega'}
                                render={(props) => <ListadoPuntosEntrega id_productor={this.state.id} />} />
                            <Route path='/principalProductores/ListadoProductos'
                                render={(props) => <ListadoProductosRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/Estadisticas'
                                render={(props) => <EstadisticasRouter id_productor={this.state.id} />} />
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    };
}
export default PantallaPrincipalProductores;