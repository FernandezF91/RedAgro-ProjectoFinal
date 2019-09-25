import React, { Component } from 'react';
import { Navbar, Nav, Row } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Home.css';
import '../diseños/estilosGlobales.css';

class HomePage extends Component {
    render() {
        return (
            <div className="fondo">
                <div className="barraNavegacion">
                    <Navbar>
                        <div className="culturaVerde">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </div>
                        <div className="barraBusqueda">
                            <Row>
                                <input type="text" placeholder="Buscar productos y productores.. " name="search" />
                                <button type="submit">
                                    <i className="fa fa-search" />
                                </button>
                            </Row>
                        </div>
                        <div className="textos">
                            <Nav>
                                <Nav.Link href='/login'>Ingresar</Nav.Link>
                                <Nav.Link href='/seleccionUsuario'>Creá tu cuenta</Nav.Link>
                            </Nav>
                        </div>
                    </Navbar>
                </div>
            </div>
        );
    }
}

export default HomePage;
