import '../diseños/PrincipalUsuarios.css';
import '../diseños/estilosGlobales.css';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import React, { Component } from 'react';
import { Navbar, NavDropdown, Badge, Nav, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rolUsuario: this.props.rolUsuario,
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
        const rolDeUsuario = this.state.rolUsuario;
        return (
            <Navbar collapseOnSelect expand="lg" className="barraNavegacion sombraBarra" >
                <Navbar.Brand className="culturaVerde" href="/">
                    <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {rolDeUsuario === "Consumidor" &&
                        <div>
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
                        </div>
                    }

                    {(rolDeUsuario === "Consumidor") ? (
                        <Nav className="iconos">
                            <Nav className="menuUsuario">
                                <i className="fas fa-user iconosBarra" />
                                <NavDropdown title="Usuario" id="nav-dropdown" className="subMenu">
                                    <NavDropdown.Item>
                                        <Link to={'/principalConsumidores/MiCuenta'}>Mi cuenta</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="menuUsuario">
                                <i className="fas fa-bell iconosBarra" />
                            </Nav>

                            <Nav.Item className="menuUsuario">
                                <Link to={'/principalConsumidores/Carrito'}>
                                    <i className="fas fa-shopping-cart iconosBarra" />
                                    <Badge>{this.props.productosSeleccionados.length}</Badge>
                                </Link>
                            </Nav.Item>
                            <div className="verticalDivider" role="separator" />
                            <Nav.Item className="menuUsuario">
                                <i className="fas fa-info-circle iconosBarra" />
                            </Nav.Item>
                        </Nav>
                    ) : (
                            <Nav className="iconosProd">
                                <Nav className="menuUsuario">
                                    <i className="fas fa-user iconosBarra" />
                                    <NavDropdown onSelect={this.mostrarPantallaPrincipal} title="Usuario" id="nav-dropdown" className="subMenu">
                                        <NavDropdown.Item>
                                            <Link to={'/principalProductores/MiCuenta'}>Mi cuenta</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Nav className="menuUsuario">
                                    <i className="fas fa-bell iconosBarra" />
                                </Nav>
                                <div className="verticalDivider" role="separator" />
                                <Nav.Item className="menuUsuario">
                                    <i className="fas fa-info-circle iconosBarra" />
                                </Nav.Item>
                            </Nav>
                        )}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default BarraNavegacion;