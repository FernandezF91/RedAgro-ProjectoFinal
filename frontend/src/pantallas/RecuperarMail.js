import '../diseños/recuperaremail.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Navbar, Container, Row, Form, Col, Button, Nav } from 'react-bootstrap';
import { MDBModal, MDBCol } from 'mdbreact';

import culturaVerde from '../imagenes/cultura-verde-2.png';

class RecuperarEmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            titulo: "",
            mensaje: "",
            error: "",
            showModal: false,
            mensajeError: "",
            resultadoRequest: 0
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.mostrarLogin = this.mostrarLogin.bind(this);
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
        this.mostrarLogin();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    validarDatos() {

        if (!this.state.campos["emailuser"]) {

            this.setState({ error: "*Campo inválido" });
            return;
        }

        const path = "http://localhost:3000/redAgro/recuperar_email?email="

        const final_path = path + this.state.campos["emailuser"];

        var _this = this;

        fetch(final_path, {
            method: "GET",

        })
            .then(function (response) {
                if (response.status !== 200) {
                    //Cambiar aca
                    response.text().then(
                        function (response) {
                            _this.setState({
                                showModal: true,
                                mensaje: response,
                                resultadoRequest: 0
                            });
                        })
                    return;
                }

                response.text().then(
                    function (response) {
                        _this.setState({
                            showModal: true,
                            mensaje: "No te preocupes! Te enviamos un email para que puedas reestablecer tu contraseña",
                            resultadoRequest: 200
                        });

                    });
            });
    }

    mostrarLogin() {
        this.props.history.push({
            pathname: '/login',

        })
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
                    <div className="formularioLogin">
                        <h2>Recuperar contraseña</h2>
                        <div className="encabezadoRecucontra">
                            <Form>
                                <div className="contenidoRegistro">
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column >Mail</Form.Label>
                                        <Col sm={11}>
                                            <Form.Control
                                                type="username"
                                                name="emailuser"
                                                onChange={(e) => this.detectarCambios(e)}
                                                className="camposDatosDeUsuario"
                                            />
                                            <div className="error">{this.state.error}</div>
                                        </Col>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="botones">
                        <Button variant="light" href='/login'>Cancelar</Button>
                        <Button variant="success" onClick={this.validarDatos}>Confirmar</Button>
                    </div>
                    {
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes" tabindex="0">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                {(this.state.resultadoRequest === 200) ?
                                    (
                                        <div>
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-exclamation-circle iconoModalError" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    )
                                }
                            </div>
                        </MDBModal>
                    }
                </Container>
            </div>
        );
    };
}

export default RecuperarEmail;