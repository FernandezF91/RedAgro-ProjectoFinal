//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { MDBCol, MDBRow, MDBContainer } from 'mdbreact';

import MiCuenta from './MiCuentaProductor';
import AlertaProductor from '../pantallas/AlertaProductor';
import NuevoProducto from '../pantallas/NuevoProducto';
import CargarHistorico from '../pantallas/CargarHistorico';
import ModificarContraseña from '../pantallas/ModificarContraseña';
import DatosDeUsuario from '../pantallas/DatosDeUsuario';
import ListadoReservas from '../pantallas/ListadoReservas';
import NuevoPuntoEntrega from '../pantallas/NuevoPuntoEntrega';
import ListadoPuntosEntrega from '../pantallas/ListadoPuntosEntrega';
import ListadoProductos from '../pantallas/ListadoProductos';
import Estadisticas from '../pantallas/Estadisticas';
import BarraNavegacion from './BarraNavegacion';
import Planificación from '../pantallas/Planificacion';
import ListadoCalificaciones from '../pantallas/ListadoCalificaciones';
import EditarProducto from "../pantallas/EditarProducto";

//hacerlo con todas las pantallas nuevas para que funcione el ruteo e ir pasando el ID del usuario
const MiCuentaRouter = withRouter(MiCuenta);
const NuevoProductoRouter = withRouter(NuevoProducto);
const AlertaProductorRouter = withRouter(AlertaProductor);
const ModificarContraseniaRouter = withRouter(ModificarContraseña);
const EditarDatosRouter = withRouter(DatosDeUsuario);
const ListadoReservasRouter = withRouter(ListadoReservas);
const NuevoPuntoEntregaRouter = withRouter(NuevoPuntoEntrega);
const ListadoProductosRouter = withRouter(ListadoProductos);
const EstadisticasRouter = withRouter(Estadisticas);
const HitoricoRouter = withRouter(CargarHistorico);
const PlanificacionRouter = withRouter(Planificación);
const ListadoCalificacionesRouter = withRouter(ListadoCalificaciones);
const EditarProductoRouter = withRouter(EditarProducto);

class PantallaPrincipalProductores extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: localStorage.getItem('myLocalStorageIdProductor') || this.props.location.state.id, //paso id de usuario desde el LOGIN
            user: JSON.parse(localStorage.getItem('myLocalStorageUserProductor')) || this.props.location.state.user,//paso el usuario desde el LOGIN
            rolUsuario: localStorage.getItem('myLocalStorageRolProductor') || this.props.location.state.rolUsuario,
            productoAEditar: {},
            notificaciones: []
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarUsuarioProductor = this.actualizarUsuarioProductor.bind(this);
        this.editarProductoProductor = this.editarProductoProductor.bind(this);
    }

    editarProductoProductor(productoAEditar) {
        this.setState({ productoAEditar });
        this.props.history.push({
            pathname: '/principalProductores/EditarProducto/' + productoAEditar.id,
            state: {
                productoAEditar: this.state.productoAEditar
            }
        })
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    actualizarUsuarioProductor(nuevoUsuario) {
        this.setState({ user: nuevoUsuario });
        this.mostrarPantallaPrincipal();
    }

    componentDidMount() {
        localStorage.setItem('myLocalStorageIdProductor', this.state.id);
        localStorage.setItem('myLocalStorageUserProductor', JSON.stringify(this.state.user));
        localStorage.setItem('myLocalStorageRolProductor', this.state.rolUsuario);
        this.obtenerNotificaciones();
    }

    obtenerNotificaciones() {
        var _this = this;
        var path = "http://localhost:3000/redAgro/AlertaNotificaciones/obtenerAlertasByUsuario?id_usuario=" + localStorage.getItem('myLocalStorageIdProductor');
        fetch(path, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        _this.setState({
                            resultadoRequest: response.status
                        });
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                        _this.setState({
                            loading: false,
                            resultadoRequest: response.status
                        });
                    }
                } catch (error) {
                    console.log(error);
                    _this.setState({
                        loading: false,
                        resultadoRequest: response.status
                    });
                }
            })
            .then(data => {
                if (data !== undefined) {
                    _this.setState({
                        notificaciones: data.map((item) => {
                            return {
                                id: item.id,
                                titulo: item.titulo,
                                descripcion: item.descripcion,
                            }
                        })
                    })
                }
            })
    }

    render() {
        return (
            <div className="fondo">
                <BarraNavegacion
                    usuario={this.state.user}
                    notificaciones={this.state.notificaciones}
                />
                <MDBContainer fluid className="contenedor">
                    <MDBRow className="filaContenedora">
                        <MDBCol md="2" className="menuConsumidor">
                            <div className="paddingMenuLateral">
                                <MDBRow>
                                    <Link to={'/principalProductores/MiCuenta'} className="linkMiCuenta">
                                        <i className="fas fa-bars iconoMiCuenta" />
                                        <h4>Mi cuenta</h4>
                                    </Link>
                                </MDBRow>
                                <NavDropdown.Divider />
                                <MDBRow>
                                    <i className="fas fa-store iconosMenuLateral" />
                                    <NavDropdown title="Productos" id="producto_drop">
                                        <NavDropdown.Item id="items">
                                            <Link to="/principalProductores/ListadoProductos" id="items">Listado de productos</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item id="items">
                                            <Link to="/principalProductores/NuevoProducto" id="items">Nuevo producto</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </MDBRow>
                                <MDBRow>
                                    <i className="fas fa-map-marker-alt iconosMenuLateral" id="market" />
                                    <NavDropdown title="Puntos de entrega" id="puntoentrega_drop" className="iconoEntrega">
                                        <NavDropdown.Item id="items">
                                            <Link to="/principalProductores/ListadoPuntosEntrega" id="items">Listado puntos de entrega</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item id="items">
                                            <Link to="/principalProductores/NuevoPuntoEntrega" id="items">Nuevo punto de entrega</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </MDBRow>
                                <MDBRow className="itemsMenuReservas">
                                    <i className="fas fa-tasks iconosMenuLateral" />
                                    <Link to={'/principalProductores/ListadoReservas'}>
                                        <p>Reservas</p>
                                    </Link>
                                </MDBRow>
                                <MDBRow>
                                    <i className="fas fa-star iconosMenuLateral" />
                                    <Link to={'/principalProductores/ListadoCalificaciones'}>
                                        <p>Calificaciones</p>
                                    </Link>
                                </MDBRow>
                                <MDBRow>
                                    <i className="fas fa-clipboard-list iconosMenuLateral" />
                                    <Link to={'/principalProductores/Planificacion'}>
                                        <p>Planificación</p>
                                    </Link>
                                </MDBRow>

                                <MDBRow>
                                    <i className="fas fa-chart-line iconosMenuLateral" />
                                    <Link to={'/principalProductores/Estadisticas'}>
                                        <p>Estadísticas</p>
                                    </Link>
                                </MDBRow>
                                <MDBRow>
                                    <i className="fas fa-history iconosMenuLateral" />
                                    <Link to={'/principalProductores/CargarHistorico'}>
                                        <p>Histórico</p>
                                    </Link>
                                </MDBRow>
                                <MDBRow>
                                    <i className="fas fa-bell iconosMenuLateral" />
                                    <Link to={'/principalProductores/Alertas'}>
                                        <p>Alertas</p>
                                    </Link>
                                </MDBRow>
                                <MDBRow>
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
                                </MDBRow>
                            </div>
                        </MDBCol>
                        <MDBCol className="ruteo">
                            <Route path={'/principalProductores/MiCuenta'}
                                render={(props) =>
                                    <MiCuentaRouter
                                        id_usuario={this.state.id}
                                        rolUsuario={this.state.rolUsuario}
                                        usuario={this.state.user}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/Alertas'}
                                render={(props) =>
                                    <AlertaProductorRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/NuevoProducto'}
                                render={(props) =>
                                    <NuevoProductoRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/CargarHistorico'}
                                render={(props) =>
                                    <HitoricoRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/modificarContraseña'}
                                render={(props) =>
                                    <ModificarContraseniaRouter
                                        usuario={this.state.user}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/EditarDatos'}
                                render={(props) =>
                                    <EditarDatosRouter
                                        usuario={this.state.user}
                                        actualizarUsuarioProductor={this.actualizarUsuarioProductor}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/ListadoReservas'}
                                render={(props) =>
                                    <ListadoReservasRouter
                                        usuario={this.state.user}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/NuevoPuntoEntrega'}
                                render={(props) =>
                                    <NuevoPuntoEntregaRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/ListadoPuntosEntrega'}
                                render={(props) =>
                                    <ListadoPuntosEntrega
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/ListadoProductos'}
                                render={(props) =>
                                    <ListadoProductosRouter
                                        id_productor={this.state.id}
                                        editarProductoProductor={this.editarProductoProductor}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/Estadisticas'}
                                render={(props) =>
                                    <EstadisticasRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/Planificacion'}
                                render={(props) =>
                                    <PlanificacionRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/ListadoCalificaciones'}
                                render={(props) =>
                                    <ListadoCalificacionesRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalProductores/EditarProducto/:idProducto'}
                                render={(props) =>
                                    <EditarProductoRouter
                                        id_productor={this.state.id}
                                    />
                                }
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    };
}
export default PantallaPrincipalProductores;