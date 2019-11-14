import React, { Component } from 'react'
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { MDBCol } from 'mdbreact';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/EstilosGenerales.css';
import '../diseños/seleccionUsuario.css';

class SeleccionUsuario extends Component {

    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <div className="fondo">
                <Navbar className="barraNavegacion alturaBarra">
                    <MDBCol md="2" className="culturaVerde">
                        <Navbar.Brand href="/">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </Navbar.Brand>
                    </MDBCol>
                    <MDBCol />
                    <MDBCol md="1">
                        <Nav.Item className="alturaSeccionesBarra">
                            <i className="fas fa-info-circle iconosBarra" />
                        </Nav.Item>
                    </MDBCol>
                </Navbar>
                <Container fluid className="contenedor">
                    <div className="contenidoSeleccion">
                        <div className="tituloSeleccion">
                            <h3>Selecciona un tipo de usuario</h3>
                        </div>
                        <div className="botones">
                            <Button variant="success" href="/registroProductor">
                                <i className="fas fa-tractor iconoBotones" />
                                Soy productor
                            </Button>
                            <Button variant="success" href="/registroConsumidor">
                                <i className="fas fa-shopping-basket iconoBotones" />
                                Soy consumidor
                            </Button>
                        </div>
                        <Button variant="light" href="javascript:history.back()" className="atras">Atras</Button>
                    </div>
                </Container>
            </div>
        );
    };
}

export default SeleccionUsuario;