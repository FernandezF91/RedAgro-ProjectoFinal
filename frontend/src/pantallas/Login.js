import '../diseños/Login.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { MDBCol, MDBRow, MDBModal } from 'mdbreact';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import culturaVerde from '../imagenes/cultura-verde-2.png';

const regularExp = {
    mail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

class LoginForm extends Component {
    constructor(props) {

        super(props)

        this.state = {
            campos: [],
            validaciones: [],
            usuario: {},
            showModal: false,
            mensaje: "",
            rolUsuario: "",
            resultadoRequest: 0,
            loading: false
        }

        this.validarCampos = this.validarCampos.bind(this);
        this.mostrarPantallaProductor = this.mostrarPantallaProductor.bind(this);
        this.mostrarPantallaConsumidor = this.mostrarPantallaConsumidor.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.validarCampos();
        }
    }

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (!this.state.campos["username"]) {
            validaciones["username"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.mail.test(this.state.campos["username"])) {
            validaciones["username"] = "Formato inválido";
            showModal = true;
        }

        if (!this.state.campos["password"]) {
            validaciones["password"] = "Campo requerido";
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

    iniciarSesion(e) {
        var _this = this;

        _this.setState({
            validaciones: [],
            loading: true
        })

        e.preventDefault();

        if (_this.validarCampos()) {
            const path_principal = "http://"+window.$ip+":3000/redAgro/login/usuario?u=";

            var username = this.state.campos["username"];
            var password = this.state.campos["password"];

            const final_path = path_principal + username + "&c=" + password;

            var _this = this;

            fetch(final_path, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
            })
                .then(function (response) {
                    var status = response.status;
                    response.text().then(
                        function (response) {
                            if (status === 200) {
                                _this.setState({ usuario: JSON.parse(response) });
                                if (_this.state.usuario.rol === "Productor") {
                                    _this.mostrarPantallaProductor();
                                } else {
                                    _this.mostrarPantallaConsumidor();
                                }
                            } else if (status === 400) {
                                let mensaje = response;
                                _this.setState({
                                    showModal: true,
                                    mensaje: mensaje,
                                    loading: false
                                });
                            } else if (status === 500) {
                                let mensaje = response;
                                _this.setState({
                                    showModal: true,
                                    mensaje: mensaje,
                                    loading: false
                                });
                            } else {
                                let mensaje = "Ocurrió un error al obtener los datos de tu usuario. Por favor, reintentá en unos minutos.";
                                _this.setState({
                                    showModal: true,
                                    mensaje: mensaje,
                                    loading: false
                                });
                            }
                        }
                    )
                });
        }
    }

    mostrarPantallaProductor() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.usuario.id,
                user: this.state.usuario,
                rolUsuario: this.state.usuario.rol
            }
        })
    }

    mostrarPantallaConsumidor() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: {
                id: this.state.usuario.id,
                user: this.state.usuario,
                rolUsuario: this.state.usuario.rol
            }
        })
    }

    render() {
        if (this.state.loading) return (
            <div className="fondo">
                <div className="divLoaderWhitesmoke">
                    <Loader
                        type="Grid"
                        color="#28A745"
                        height={150}
                        width={150}
                        className="loader loaderWhitesmoke"
                    />
                </div>
            </div>
        )

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
                    <h2 className="titulosPaginasLogin">Acceso de usuarios</h2>
                    <Form ref="form" onSubmit={(e) => this.iniciarSesion(e)}>
                        <Form.Group className="col-md camposGeneral">
                            <MDBCol md="5" top>
                                <Form.Label column>Email</Form.Label>
                            </MDBCol>
                            <MDBCol md="7">
                                <MDBRow>
                                    <Form.Control
                                        value={this.state.campos["username"]}
                                        name="username"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="camposDatosDeUsuario"
                                        onKeyPress={this.onKeyPress}
                                    />
                                    {
                                        (this.state.validaciones["username"]) &&
                                        <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                    }
                                </MDBRow>
                                {
                                    (this.state.validaciones["username"]) &&
                                    <MDBRow>
                                        <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["username"]}</div>
                                    </MDBRow>
                                }
                            </MDBCol>
                        </Form.Group>
                        <Form.Group className="col-md camposGeneral">
                            <MDBCol md="5" top>
                                <Form.Label column>Contraseña</Form.Label>
                            </MDBCol>
                            <MDBCol md="7">
                                <MDBRow>
                                    <Form.Control
                                        value={this.state.campos["password"]}
                                        name="password"
                                        type="password"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="camposDatosDeUsuario"
                                        onKeyPress={this.onKeyPress}
                                    />
                                    {
                                        (this.state.validaciones["password"]) &&
                                        <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                    }
                                </MDBRow>
                                {
                                    (this.state.validaciones["password"]) &&
                                    <MDBRow>
                                        <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["password"]}</div>
                                    </MDBRow>
                                }
                            </MDBCol>
                        </Form.Group>
                        <div className="botones">
                            <Button variant="light" href="/seleccionUsuario">Registrar</Button>
                            <Button variant="success" type="submit">Ingresar</Button>
                        </div>
                    </Form>
                    <a href="/recupero_email">Olvidé mi contraseña</a>
                    {
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes" tabindex="0">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                <div>
                                    <i className="fas fa-exclamation-circle iconoModalError" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                </div>
                            </div>
                        </MDBModal>
                    }
                </Container>
            </div>
        );
    };
}

export default LoginForm;