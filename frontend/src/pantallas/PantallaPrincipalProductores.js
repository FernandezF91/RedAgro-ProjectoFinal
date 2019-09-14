//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { Navbar, NavDropdown, Col, Row, Container } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

//imagenes para barra
import culturaVerde from '../imagenes/cultura-verde-2.png';

import AlertaProductor from '../pantallas/AlertaProductor';
import NuevoProducto from '../pantallas/NuevoProducto';
import CargarHistorico from '../pantallas/CargarHistorico';
import ModificarContraseña from '../pantallas/ModificarContraseña';
import DatosDeUsuario from '../pantallas/DatosDeUsuario';
import ListadoReservas from '../pantallas/ListadoReservas';
import IngresarPuntoEntrega from '../pantallas/IngresarPuntoEntrega';
import ListadoProductos from '../pantallas/ListadoProductos';
import Estadisticas from '../pantallas/Estadisticas';

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
            id: this.props.location.state.id //paso id de usuario desde el LOGIN
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    componentDidMount() {
        alert(this.state.id);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
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
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </div>
                        <div className="iconosProd">
                            <Row>
                                <i class="fas fa-user iconosBarra" />
                                <div className="menuUsuario">
                                    <NavDropdown onSelect={this.mostrarPantallaPrincipal} title="Usuario" id="nav-dropdown">
                                        <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/login">Salir</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                <i class="fas fa-bell iconosBarra" />
                            </Row>
                        </div>
                    </Navbar>
                </div>
                <Container fluid className="contenedor">
                    <Row className="filaContenedora">
                        <Col sm={2} className="menuConsumidor">
                            <div className="cuenta">
                                <Row>
                                    <i class="fas fa-bars iconoMiCuenta" />
                                    <h4>Mi cuenta</h4>
                                </Row>
                            </div>
                            <div className="divisor">
                                <NavDropdown.Divider />
                            </div>
                            <div className="subMenu">
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-store iconosMenuLateral" />
                                        <div className="prod_drop">
                                            <NavDropdown title="Productos" id="producto_drop">
                                                <NavDropdown.Item>
                                                    <Link to="/principalProductores/ListadoProductos">Listado de Productos</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <Link to="/principalProductores/NuevoProducto">Nuevo Producto</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="#action/3.2">Ofertas</NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    </Row>
                                </div>
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-map-marker-alt iconosMenuLateral" />
                                        <div className="puntoentrega_drop">
                                            <NavDropdown title="Puntos de Entrega" id="puntoentrega_drop">
                                                <NavDropdown.Item href="#action/3.1">Desactivar Puntos de entrega</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <Link to="/principalProductores/IngresarPuntoEntrega">Nuevo Punto de entrega</Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    </Row>
                                </div>
                                <div className="itemsMenuReservas">
                                    <Row>
                                        <i class="fas fa-tasks iconosMenuLateral" />
                                        <Link to={'/principalProductores/ListadoReservas'}>
                                            <p>Reservas</p>
                                        </Link>
                                    </Row>
                                </div>
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-clipboard-list iconosMenuLateral" />
                                        <p>Planificación</p>
                                    </Row>
                                </div>
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-chart-line iconosMenuLateral" />
                                        <Link to={'/principalProductores/Estadisticas'}>
                                            <p>Estadísticas</p>
                                        </Link>
                                    </Row>
                                </div>
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-history iconosMenuLateral" />
                                        <Link to={'/principalProductores/CargarHistorico'}>
                                            <p>Histórico</p>
                                        </Link>
                                    </Row>
                                </div>
                                <div className="itemsMenu">
                                    <Row>
                                        <i class="fas fa-bell iconosMenuLateral" />
                                        <Link to={'/principalProductores/Alertas'}>
                                            <p>Alertas</p>
                                        </Link>
                                    </Row>
                                </div>
                                <div className="itemsMenuConfig">
                                    <Row>
                                        <i class="fas fa-cogs iconosMenuLateral" />
                                        <div className="conf_drop">
                                            <NavDropdown title="Configuración" id="config_drop">
                                                <NavDropdown.Item>
                                                    <Link to="/principalProductores/EditarDatos">Editar mis datos</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <Link to="/principalProductores/ModificarContraseña">Modificar contraseña</Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col className="ruteo">
                            <Route path='/principalProductores/Alertas'
                                render={(props) => <AlertaProductorRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/NuevoProducto'
                                render={(props) => <NuevoProductoRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/CargarHistorico'
                                render={(props) => <HitoricoRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/modificarContraseña'
                                render={(props) => <ModificarContraseniaRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/EditarDatos'
                                render={(props) => <EditarDatosRouter id_productor={this.state.id} />} />
                            <Route path={'/principalProductores/ListadoReservas'}
                                render={(props) => <ListadoReservasRouter id_usuario={this.state.id} />} />
                            <Route path={'/principalProductores/IngresarPuntoEntrega'}
                                render={(props) => <IngresarPuntoEntregaRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/ListadoProductos'
                                render={(props) => <ListadoProductosRouter id_productor={this.state.id} />} />
                            <Route path='/principalProductores/Estadisticas'
                                render={(props) => <EstadisticasRouter id_productor={this.state.id} />} />
                        </Col>
                    </Row>
                </Container>
            </body>
        );
    };
}
export default PantallaPrincipalProductores;