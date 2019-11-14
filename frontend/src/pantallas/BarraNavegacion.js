import '../diseños/PrincipalUsuarios.css';
import '../diseños/EstilosGenerales.css';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import React, { Component } from 'react';
import { MDBCol, MDBRow } from "mdbreact";
import { Navbar, NavDropdown, Badge, Nav, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Notificaciones from './Notificaciones';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: this.props.usuario,
            busqueda: '',
        }
        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateParametroBusqueda = this.updateParametroBusqueda.bind(this);
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            if (this.busqueda.value.length > 0) {
                this.setState(
                    { busqueda: this.busqueda.value },
                    this.updateParametroBusqueda
                )
            }
        }
    }

    updateParametroBusqueda() {
        this.props.handleNuevaBusqueda(this.state.busqueda);
    }

    handleInputChange = e => {
        if (this.busqueda.value.length > 0) {
            this.setState(
                {
                    busqueda: this.busqueda.value
                },
                this.updateParametroBusqueda
            )
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        const rolDeUsuario = this.state.usuario.rol;
        const listado = this.props.notificaciones;
        return (
            <Navbar expand="lg" className="barraNavegacion sombraBarra" >
                <MDBCol md="2" className="culturaVerde">
                    <Navbar.Brand href="/">
                        <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                    </Navbar.Brand>
                </MDBCol>
                <MDBCol md="1" />
                {rolDeUsuario === "Consumidor" ? (
                    <MDBCol md="5">
                        <MDBRow className="alturaSeccionesBarra">
                            <InputGroup className="barraBusquedaNuevo">
                                <FormControl
                                    placeholder="Buscar productos y productores.."
                                    aria-label="Buscar productos y productores.."
                                    onKeyPress={this.onKeyPress}
                                    ref={input => (this.busqueda = input)}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text className="botonBusqueda cursorManito" onClick={this.handleInputChange}>
                                        <i className="fa fa-search iconoBusqueda" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </MDBRow>
                    </MDBCol>
                ) : (
                        <MDBCol md="5" />
                    )
                }
                {(rolDeUsuario === "Consumidor") ? (
                    <MDBCol>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="alturaSeccionesBarra">
                                <Nav.Item className="alturaSeccionesBarra separacionIconosBarra">
                                    <i className="fas fa-user iconosBarra" />
                                    <NavDropdown title={this.state.usuario.nombre} id="nav-dropdown" className="subMenu">
                                        <NavDropdown.Item>
                                            <Link to={'/principalConsumidores/MiCuenta'}>Mi cuenta</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item className="alturaSeccionesBarra separacionIconosBarra">
                                    <i id="notificaciones" className="fas fa-bell iconosBarra cursorManito" />
                                    <Notificaciones listado={listado} />
                                </Nav.Item>

                                <Nav.Item className="alturaSeccionesBarra separacionIconosBarra">
                                    <Link to={'/principalConsumidores/Carrito'}>
                                        <i className="fas fa-shopping-cart iconosBarra" />
                                        <Badge>{this.props.productosSeleccionados.length}</Badge>
                                    </Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </MDBCol>
                ) : (
                        <MDBCol>
                            <Nav className="alturaSeccionesBarra">
                                <Nav.Item className="alturaSeccionesBarra separacionIconosBarra">
                                    <i className="fas fa-user iconosBarra" />
                                    <NavDropdown onSelect={this.mostrarPantallaPrincipal} title={this.state.usuario.nombre} id="nav-dropdown" className="subMenu">
                                        <NavDropdown.Item>
                                            <Link to={'/principalProductores/MiCuenta'}>Mi cuenta</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item className="alturaSeccionesBarra separacionIconosBarra">
                                    <i id="notificaciones" className="fas fa-bell iconosBarra cursorManito" />
                                    <Notificaciones listado={listado} />
                                </Nav.Item>
                            </Nav>
                        </MDBCol>
                    )
                }
                <MDBCol md="1">
                    <Nav.Item className="alturaSeccionesBarra">
                        <i className="fas fa-info-circle iconosBarra" />
                    </Nav.Item>
                </MDBCol>
            </Navbar>
        );
    }
}
export default BarraNavegacion;