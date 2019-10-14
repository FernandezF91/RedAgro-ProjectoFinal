//este import para cabecera
import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'
import { NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import MiCuenta from './MiCuentaConsumidor';
import ListadoReservas from '../pantallas/ListadoReservas';
import AlertaConsumidor from '../pantallas/AlertaConsumidor';
import Carrito from '../pantallas/Carrito';
import PreferenciasConsumidor from '../pantallas/PreferenciasConsumidor';
import DatosDeUsuario from '../pantallas/DatosDeUsuario';
import ModificarContraseña from '../pantallas/ModificarContraseña';
import Geolocalizacion from '../pantallas/Geolocalizacion';
import BarraNavegacion from './BarraNavegacion';
import ResultadoBusqueda from './ResultadoBusqueda';
import DetalleProducto from './DetalleProducto';
import Checkout from './Checkout';

//hacerlo con todas las pantallas nuevas para que funcione el ruteo e ir pasando el ID del usuario
const MiCuentaRouter = withRouter(MiCuenta);
const ListadoReservasRouter = withRouter(ListadoReservas);
const AlertaConsumidorRouter = withRouter(AlertaConsumidor);
const PreferenciasConsumidorRouter = withRouter(PreferenciasConsumidor);
const EditarDatosRouter = withRouter(DatosDeUsuario);
const ModificarContraseniaRouter = withRouter(ModificarContraseña);
const GeolocalizacionRouter = withRouter(Geolocalizacion);
const ResultadoBusquedaRouter = withRouter(ResultadoBusqueda);
const CheckoutRouter = withRouter(Checkout);
const DetalleProductoRouter = withRouter(DetalleProducto);

class PantallaPrincipalconsumidores extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: localStorage.getItem('myLocalStorageIdConsumidor') || this.props.location.state.id, //paso id de usuario desde el LOGIN
            user: JSON.parse(localStorage.getItem('myLocalStorageUserConsumidor')) || this.props.location.state.user,
            rolUsuario: localStorage.getItem('myLocalStorageRolConsumidor') || this.props.location.state.rolUsuario,
            busqueda: '',
            productosSeleccionados: [],
            productos: [],
            detalleProducto: {},
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.handleNuevaBusqueda = this.handleNuevaBusqueda.bind(this);
        this.handleDetalleProducto = this.handleDetalleProducto.bind(this);
        this.actualizarProductosSeleccionados = this.actualizarProductosSeleccionados.bind(this);
        this.cargarProductos = this.cargarProductos.bind(this);
        this.actualizarUsuarioConsumidor = this.actualizarUsuarioConsumidor.bind(this);
    }

    componentDidMount() {

        localStorage.setItem('myLocalStorageIdConsumidor', this.state.id);
        localStorage.setItem('myLocalStorageUserConsumidor', JSON.stringify(this.state.user));
        localStorage.setItem('myLocalStorageRolConsumidor', this.state.rolUsuario);

        var _this = this;

        fetch("http://localhost:3000/redAgro/obtener_productos", {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    _this.setState({
                        visible: true,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intentá nuevamente"
                    });

                    return;
                }

                response.json().then(
                    function (response) {
                        response.forEach(element => {
                            _this.setState({ productos: [..._this.state.productos, element] });
                        });
                    });
            });
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: {
                id: this.state.id,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    actualizarUsuarioConsumidor(nuevoUsuario) {
        this.setState({ user: nuevoUsuario });
        this.mostrarPantallaPrincipal();
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

    handleDetalleProducto(productoSeleccionado) {
        this.setState({ detalleProducto: productoSeleccionado });
        this.props.history.push({
            pathname: '/principalConsumidores/DetalleProducto/',
            state: {
                producto: productoSeleccionado,
            }
        })
    }

    actualizarProductosSeleccionados(productos) {
        this.setState({ productosSeleccionados: productos })
    }

    cargarProductos() {
        let verduras = []
        let frutas = []
        let otros = []
        let tipos = []

        this.state.productos.forEach(p => p.categoria === "Verduras" ? verduras.push(p) : null)
        this.state.productos.forEach(p => p.categoria === "Frutas" ? frutas.push(p) : null)
        this.state.productos.forEach(p => p.categoria === "Otros" || p.categoria === "Variado" ? otros.push(p) : null)

        verduras.sort(function (a, b) {
            if (a.tipo > b.tipo) {
                return 1;
            }
            if (a.tipo < b.tipo) {
                return -1;
            }
            return 0;
        });
        frutas.sort(function (a, b) {
            if (a.tipo > b.tipo) {
                return 1;
            }
            if (a.tipo < b.tipo) {
                return -1;
            }
            return 0;
        });
        otros.sort(function (a, b) {
            if (a.tipo > b.tipo) {
                return 1;
            }
            if (a.tipo < b.tipo) {
                return -1;
            }
            return 0;
        });

        const item = [
            <Row>
                <Col className="scrollMenuCategorias">
                    {
                        verduras.map(v => { return <Row id="subTipos"><Link onClick={() => this.handleNuevaBusqueda(v.tipo)}>{v.tipo}</Link></Row> })
                    }
                </Col>
                <Col className="scrollMenuCategorias">
                    {
                        frutas.map(f => { return <Row id="subTipos"><Link onClick={() => this.handleNuevaBusqueda(f.tipo)}>{f.tipo}</Link></Row> })
                    }
                </Col>
                <Col className="scrollMenuCategorias">
                    {
                        otros.map(o => { return <Row id="subTipos"><Link onClick={() => this.handleNuevaBusqueda(o.tipo)}>{o.tipo}</Link></Row> })
                    }
                </Col>
            </Row>

        ]

        tipos.push(item)
        return tipos;
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
                                <Link to={'/principalConsumidores/MiCuenta'} className="linkMiCuenta">
                                    <i className="fas fa-bars iconoMiCuenta" />
                                    <h4>Mi cuenta</h4>
                                </Link>
                            </Row>
                            <NavDropdown.Divider className="divisor" />
                            <Row className="itemsSubmenu">
                                <i className="fas fa-shopping-basket iconosMenuLateral" />
                                <NavDropdown title="Comprar" id="compra_drop" className="com_drop">
                                    <NavDropdown.Item>
                                        <Link to="/principalConsumidores/Geolocalizacion" id="items">Geolocalización</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown title="Categorias" id="categoria_drop" drop="right">
                                        <NavDropdown.Item id="itemArea">
                                            <Row clasName="titulos">
                                                <Col id="categorias">Verduras</Col>
                                                <Col id="categorias">Frutas</Col>
                                                <Col id="categorias">Otros</Col>
                                            </Row>
                                            <NavDropdown.Divider />
                                            {this.cargarProductos()}
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
                            <Route path={'/principalConsumidores/MiCuenta'}
                                render={(props) =>
                                    <MiCuentaRouter
                                        id_usuario={this.state.id}
                                        rolUsuario={this.state.rolUsuario}
                                        usuario={this.state.user}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/ListadoReservas'}
                                render={(props) =>
                                    <ListadoReservasRouter
                                        id_usuario={this.state.id}
                                        rolUsuario={this.state.rolUsuario}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/Alertas'}
                                render={(props) =>
                                    <AlertaConsumidorRouter
                                        id_consumidor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/PreferenciasConsumidor'}
                                render={(props) =>
                                    <PreferenciasConsumidorRouter
                                        id_consumidor={this.state.id}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/Carrito'}
                                render={(props) =>
                                    <Carrito
                                        id_consumidor={this.state.id}
                                        productosSeleccionados={this.state.productosSeleccionados}
                                        actualizarProductosSeleccionados={this.actualizarProductosSeleccionados}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/EditarDatos'}
                                render={(props) =>
                                    <EditarDatosRouter
                                        usuario={this.state.user}
                                        actualizarUsuarioConsumidor={this.actualizarUsuarioConsumidor}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/modificarContraseña'}
                                render={(props) =>
                                    <ModificarContraseniaRouter
                                        usuario={this.state.user}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/Geolocalizacion'}
                                render={(props) =>
                                    <GeolocalizacionRouter
                                        id_consumidor={this.state.id}
                                        handleNuevaBusqueda={this.handleNuevaBusqueda}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/ResultadoBusqueda'}
                                render={(props) =>
                                    <ResultadoBusquedaRouter
                                        id_consumidor={this.state.id}
                                        busqueda={this.state.busqueda}
                                        productosSeleccionados={this.state.productosSeleccionados}
                                        handleDetalleProducto={this.handleDetalleProducto}
                                        actualizarProductosSeleccionados={this.actualizarProductosSeleccionados}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/Checkout'}
                                render={(props) =>
                                    <CheckoutRouter
                                        user={this.state.user}
                                        id_consumidor={this.state.id}
                                        productosSeleccionados={this.state.productosSeleccionados}
                                        actualizarProductosSeleccionados={this.actualizarProductosSeleccionados}
                                    />
                                }
                            />
                            <Route path={'/principalConsumidores/DetalleProducto'}
                                render={(props) =>
                                    <DetalleProductoRouter
                                        producto={this.state.detalleProducto}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    };
}
export default PantallaPrincipalconsumidores;