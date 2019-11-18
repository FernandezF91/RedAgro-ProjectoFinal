import '../diseños/recuperaremail.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { MDBModal, MDBCol, MDBRow } from 'mdbreact';

import culturaVerde from '../imagenes/cultura-verde-2.png';

const regularExp = {
    mail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

class RecuperarEmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            validaciones: [],
            mensaje: "",
            showModal: false,
            resultadoRequest: 0
        }

        this.validarCampos = this.validarCampos.bind(this);
        this.enviarMail = this.enviarMail.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.mostrarLogin = this.mostrarLogin.bind(this);
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.enviarMail(e);
        }
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

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (!this.state.campos["emailuser"]) {
            validaciones["emailuser"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.mail.test(this.state.campos["emailuser"])) {
            validaciones["emailuser"] = "Formato inválido";
            showModal = true;
        }

        if (showModal) {
            this.setState({
                validaciones: validaciones,
                showModal: showModal,
                mensaje: "Ups! Campo incompleto o incorrecto",
                loading: false,
                resultadoRequest: 0
            });
            return false;
        } else {
            return true;
        }
    }

    enviarMail(e) {
        var _this = this;

        _this.setState({
            loading: true
        })

        e.preventDefault();

        if (_this.validarCampos()) {
            const path = "http://"+window.$ip+":3000/redAgro/recuperar_email?email=" + this.state.campos["emailuser"];

            fetch(path, {
                method: "GET",

            })
                .then(function (response) {
                    if (response.status !== 200) {
                        response.text().then(
                            function (response) {
                                _this.setState({
                                    showModal: true,
                                    mensaje: response,
                                    resultadoRequest: 0,
                                    loading: false
                                });
                            })
                        return;
                    }

                    response.text().then(
                        function (response) {
                            _this.setState({
                                showModal: true,
                                mensaje: "No te preocupes! Te enviamos un email para que puedas restablecer tu contraseña",
                                resultadoRequest: 200,
                                loading: false
                            });

                        });
                });
        }
    }

    mostrarLogin() {
        this.props.history.push({
            pathname: '/login'
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
                    <h2 className="titulosPaginasLogin">Recuperar contraseña</h2>
                    <Form ref="form" onSubmit={(e) => this.enviarMail(e)}>
                        <Form.Group className="col-md camposGeneral">
                            <MDBCol md="5" top>
                                <Form.Label column>Email</Form.Label>
                            </MDBCol>
                            <MDBCol md="7">
                                <MDBRow>
                                    <Form.Control
                                        value={this.state.campos["emailuser"]}
                                        name="emailuser"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="camposDatosDeUsuario"
                                        onKeyPress={this.onKeyPress}
                                    />
                                    {
                                        (this.state.validaciones["emailuser"]) &&
                                        <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                    }
                                </MDBRow>
                                {
                                    (this.state.validaciones["emailuser"]) &&
                                    <MDBRow>
                                        <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["emailuser"]}</div>
                                    </MDBRow>
                                }
                            </MDBCol>
                        </Form.Group>
                        <div className="botones">
                            <Button variant="light" href='/login'>Cancelar</Button>
                            <Button variant="success" type="submit">Confirmar</Button>
                        </div>
                    </Form>
                    {
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes" tabindex="0">
                                {(this.state.resultadoRequest === 200) ?
                                    (
                                        <div>
                                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                            <br />
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                            <br />
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