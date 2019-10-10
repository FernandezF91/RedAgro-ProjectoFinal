import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Home.css';
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { Navbar, Nav, Row, InputGroup, FormControl, Container } from 'react-bootstrap';
import ResultadoBusquedaSinLogin from './ResultadoBusquedaSinLogin';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            busqueda: '',
        }
    }

    handleInputChange = e => {
        this.setState({ busqueda: this.busqueda.value });
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            if (this.busqueda.value.length > 0) {
                this.setState({ busqueda: this.busqueda.value });
            }
        }
    }

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
                <Container fluid className="contenedor">
                    {
                        this.state.busqueda !== '' ?
                            <ResultadoBusquedaSinLogin busqueda={this.state.busqueda} />
                            : ' '
                    }
                </Container>
            </div>
        );
    }
}

export default HomePage;
