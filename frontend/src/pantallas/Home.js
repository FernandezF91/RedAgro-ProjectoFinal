import React, { Component } from 'react';
import { Navbar, Nav, Row, InputGroup, FormControl } from 'react-bootstrap';
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
                                <InputGroup className="barraBusquedaNuevo">
                                    {/*<FormControl
                                        placeholder="Buscar productos y productores.."
                                        aria-label="Buscar productos y productores.."
                                        onKeyPress={this.onKeyPress}
                                        ref={input => (this.busqueda = input)}
                                    />*/}
                                    <FormControl
                                        placeholder="Buscar productos y productores.."
                                        aria-label="Buscar productos y productores.."
                                    />
                                    <InputGroup.Append>
                                        {/*<InputGroup.Text className="botonBusqueda cursorManito" onClick={this.handleInputChange}>*/}
                                        <InputGroup.Text className="botonBusqueda cursorManito">
                                            <i className="fa fa-search iconoBusqueda" />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
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
