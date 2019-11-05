import React, { Component } from 'react'
import { Container, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/estilosGlobales.css';
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
                <div className="barraNavegacion">
                    <Navbar className="alturaBarra">
                        <Link to={'/'} className="culturaVerde">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </Link>
                    </Navbar>
                </div>
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