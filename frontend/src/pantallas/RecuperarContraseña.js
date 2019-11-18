
import '../diseños/recuperaremail.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { MDBCol, MDBModal, MDBRow } from 'mdbreact';
import Loader from 'react-loader-spinner';

import culturaVerde from '../imagenes/cultura-verde-2.png';

class RecuperarContraseña extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            validaciones: [],
            usuario: {},
            showModal: false,
            mensaje: "",
            resultadoRequest: 0,
            loading: false,
            id: this.props.match.params.id
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.mostrarLogin = this.mostrarLogin.bind(this);
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
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

    mostrarLogin() {
        this.props.history.push({
            pathname: '/login',
        })
    }

    componentDidMount() {
        if (isNaN(parseInt(this.state.id))) {
            this.props.history.push({
                pathname: '/*',
            })
        }
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    validarDatos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (!this.state.campos["contraseñaNueva"]) {
            validaciones["contraseñaNueva"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["confirmarContraseña"]) {
            validaciones["confirmarContraseña"] = "Campo requerido";
            showModal = true;
        }

        if ((this.state.campos["contraseñaNueva"]) !== (this.state.campos["confirmarContraseña"])) {
            validaciones["contraseñaNueva"] = " ";
            validaciones["confirmarContraseña"] = "Las contraseñas no coinciden";
            showModal = true;
        }

        if (showModal) {
            this.setState({
                validaciones: validaciones,
                showModal: showModal,
                mensaje: "Ups! Campos incompletos o incorrectos",
                loading: false,
                resultadoRequest: 0
            });
            return false;
        } else {
            return true;
        }
    }

    modificarContraseña(e) {
        this.setState({
            loading: true
        });

        e.preventDefault();

        var path = "http://"+window.$ip+":3000/redAgro/modificar_contraseña?c=" + this.state.campos["contraseñaNueva"];
        path = path + "&id=" + this.state.id;

        var _this = this;

        if (_this.validarDatos()) {

            fetch(path, {
                method: "PUT"
            })
                .then(function (response) {
                    if (response.status !== 200) {
                        _this.setState({
                            showModal: true,
                            mensaje: "Ocurrió un error al actualizar la contraseña. Por favor, reintentá en unos minutos.",
                            resultadoRequest: 0,
                            loading: false
                        });
                        return;
                    }

                    response.text().then(
                        function (response) {
                            _this.setState({
                                showModal: true,
                                mensaje: "Contraseña actualizada correctamente",
                                resultadoRequest: 200,
                                loading: false
                            });
                        });
                });
        }
    }

    render() {
        if (this.state.loading) return (
            <div className="fondo">
                <Loader
                    type="Grid"
                    color="#28A745"
                    height={150}
                    width={150}
                    className="loader loaderWhitesmoke"
                />
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
                    <h2 className="titulosPaginasLogin">Modificar contraseña</h2>
                    <Form ref="form" onSubmit={(e) => this.modificarContraseña(e)}>
                        <Form.Group className="col-md camposGeneral">
                            <MDBCol md="5" top>
                                <Form.Label column>Contraseña nueva</Form.Label>
                            </MDBCol>
                            <MDBCol md="7">
                                <MDBRow>
                                    <Form.Control
                                        value={this.state.campos["contraseñaNueva"]}
                                        type="password"
                                        name="contraseñaNueva"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="camposDatosDeUsuario"
                                        onKeyPress={this.onKeyPress}
                                    />
                                    {
                                        (this.state.validaciones["contraseñaNueva"]) &&
                                        <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                    }
                                </MDBRow>
                                {
                                    (this.state.validaciones["contraseñaNueva"]) &&
                                    <MDBRow>
                                        <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["contraseñaNueva"]}</div>
                                    </MDBRow>
                                }
                            </MDBCol>
                        </Form.Group>
                        <Form.Group className="col-md camposGeneral">
                            <MDBCol md="5" top>
                                <Form.Label column>Confirmar contraseña</Form.Label>
                            </MDBCol>
                            <MDBCol md="7">
                                <MDBRow>
                                    <Form.Control
                                        value={this.state.campos["confirmarContraseña"]}
                                        type="password"
                                        name="confirmarContraseña"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="camposDatosDeUsuario"
                                        onKeyPress={this.onKeyPress}
                                    />
                                    {
                                        (this.state.validaciones["confirmarContraseña"]) &&
                                        <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                    }
                                </MDBRow>
                                {
                                    (this.state.validaciones["confirmarContraseña"]) &&
                                    <MDBRow>
                                        <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["confirmarContraseña"]}</div>
                                    </MDBRow>
                                }
                            </MDBCol>
                        </Form.Group>
                        <div className="botones">
                            <Button variant="light" onClick={this.mostrarLogin}>Cancelar</Button>
                            <Button variant="success" type="submit">Guardar</Button>
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

export default RecuperarContraseña;