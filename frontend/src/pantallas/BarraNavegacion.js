import React, { Component } from 'react';
import { Navbar, NavDropdown, Container, Row, Col, Badge, Nav } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';

import culturaVerde from '../imagenes/cultura-verde-2.png';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
        }
    }

    onKeyPress = (e) => {
        if (e.which === 13) {
            console.log("Esta levantando el enter");
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="barraNavegacion" >
                <Navbar.Brand className="culturaVerde" href="/">
                    <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="BarraBusqueda">
                        <input type="text" placeholder="Buscar productos y productores.. " name="search"
                            onKeyPress={this.onKeyPress} />
                        <button type="submit"> <i class="fa fa-search" /> </button>
                    </Nav>

                    <Nav className="iconos">
                        <Nav className="menuUsuario">
                            <i class="fas fa-user iconosBarra" />
                            <NavDropdown onSelect={this.mostrarPantallaPrincipal} title="Usuario" id="nav-dropdown">
                                <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login">Salir</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <i class="fas fa-bell iconosBarra" />
                        </Nav>

                        <Nav.Item>
                            <Link to={'/principalConsumidores/Carrito'}>
                                <i class="fas fa-shopping-cart iconosBarra" />
                                <Badge>1</Badge>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default BarraNavegacion;