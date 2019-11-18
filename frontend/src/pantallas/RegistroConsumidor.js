import 'rc-datepicker/lib/style.css';
import '../diseños/Registro.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Navbar, Container, Form, Row, Button, Nav } from 'react-bootstrap';
import { MDBCol, MDBRow, MDBModal } from 'mdbreact'
import { DatePickerInput } from 'rc-datepicker';
import moment from 'moment';
import Loader from 'react-loader-spinner';

import culturaVerde from '../imagenes/cultura-verde-2.png';
import 'moment/locale/es';

const maxDate = new Date();

const regularExp = {
    letras: /^[a-zA-Z\s]*$/,
    telefono: /^[0-9]{8,14}$/,
    mail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

class RegistroConsumidor extends Component {

    constructor() {
        super()

        this.state = {
            campos: [],
            validaciones: [],
            showModal: false,
            mensaje: "",
            resultadoRequest: 0,
            loading: false
        }

        this.limpiarCampos = this.limpiarCampos.bind(this);
        this.mostrarLogin = this.mostrarLogin.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (!this.state.campos["nombre"]) {
            validaciones["nombre"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.letras.test(this.state.campos["nombre"])) {
            validaciones["nombre"] = "Formato inválido";
            showModal = true;
        }

        if (!this.state.campos["apellido"]) {
            validaciones["apellido"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.letras.test(this.state.campos["apellido"])) {
            validaciones["apellido"] = "Formato inválido";
            showModal = true;
        }

        if (!this.state.campos["fecha_nacimiento"]) {
            validaciones["fecha_nacimiento"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["fecha_nacimiento"] && moment(this.state.campos["fecha_nacimiento"], 'DD/MM/YYYY').format('YYYY-MM-DD') === "Invalid date") {
            validaciones["fecha_nacimiento"] = "Formato inválido";
            showModal = true;
        }

        if (!this.state.campos["telefono"]) {
            validaciones["telefono"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.telefono.test(this.state.campos["telefono"])) {
            validaciones["telefono"] = "Formato inválido";
            showModal = true;
        }

        if (!this.state.campos["mail"]) {
            validaciones["mail"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.mail.test(this.state.campos["mail"])) {
            validaciones["mail"] = "Formato inválido";
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
                mensaje: "Ups! Campos incompletos o incorrectos",
                loading: false,
                resultadoRequest: 0
            });
            return false;
        } else {
            return true;
        }
    }

    handleSubmit(e) {
        var _this = this;

        _this.setState({
            validaciones: [],
            loading: true
        })

        e.preventDefault();

        if (_this.validarCampos()) {
            this.crearUsuario(e);
        }
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
        this.mostrarLogin();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_nacimiento"] = e;
        this.setState({ campos })
    }

    limpiarCampos() {
        let campos = this.state.campos;
        campos["nombre"] = "";
        campos["apellido"] = "";
        campos["mail"] = "";
        campos["password"] = "";
        campos["fecha_nacimiento"] = "";
        campos["telefono"] = "";

        this.setState({
            campos: campos,
            validaciones: [],
        });
    }

    mostrarLogin() {
        this.props.history.push({
            pathname: '/login',
        })
    }

    crearUsuario(e) {
        var _this = this;

        var path = "http://"+window.$ip+":3000/redAgro/validar_usuario_duplicado?mail=";
        path = path + _this.state.campos["mail"];

        fetch(path, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
        })
            .then(function (response) {
                if (response.status === 400) {
                    response.text().then(
                        function (response) {
                            _this.setState({
                                showModal: true,
                                mensaje: response,
                                loading: false,
                                resultadoRequest: 400
                            })
                            return;
                        }
                    )
                } else if (response.status === 200) {
                    fetch("http://"+window.$ip+":3000/redAgro/usuario_consumidor", {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8',
                        },
                        body: JSON.stringify({
                            "nombre": _this.state.campos["nombre"],
                            "apellido": _this.state.campos["apellido"],
                            "usuario": _this.state.campos["mail"],
                            "contraseña": _this.state.campos["password"],
                            "fecha_nacimiento": _this.state.campos["fecha_nacimiento"],
                            "telefono": _this.state.campos["telefono"],
                            "rol": "Consumidor"
                        }),
                    })
                        .then(function (response) {
                            if (response.status !== 200) {
                                _this.setState({
                                    showModal: true,
                                    mensaje: "Ups, hubo un error al generar tu cuenta. Intentá nuevamente",
                                    loading: false,
                                    resultadoRequest: 0
                                });
                                return;
                            }
                            response.text().then(
                                function (response) {
                                    _this.setState({
                                        showModal: true,
                                        mensaje: "Bienvenido/a! Para finalizar con el registro, te enviamos un email para confirmar tu cuenta ;)",
                                        loading: false,
                                        resultadoRequest: 200
                                    });
                                });
                        });
                } else {
                    _this.setState({
                        loading: false,
                        showModal: true,
                        mensaje: "Ups, hubo un error al generar tu cuenta. Intentá nuevamente",
                        resultadoRequest: 0
                    })
                    return;
                }
            });
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
                    <div className="titulosPrincipales">
                        Creá tu cuenta en Cultura Verde
                    </div>

                    <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="contenidoRegistro">
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label column sm={2}>Nombre</Form.Label>
                                <MDBCol sm={10}>
                                    <MDBRow>
                                        <Form.Control
                                            value={this.state.campos["nombre"]}
                                            name="nombre"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                            onKeyPress={this.onKeyPress}
                                        />
                                        {
                                            (this.state.validaciones["nombre"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["nombre"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["nombre"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label column sm={2}>Apellido</Form.Label>
                                <MDBCol sm={10}>
                                    <MDBRow>
                                        <Form.Control
                                            value={this.state.campos["apellido"]}
                                            name="apellido"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                            onKeyPress={this.onKeyPress}
                                        />
                                        {
                                            (this.state.validaciones["apellido"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["apellido"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["apellido"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label className="labelLargo" column sm={3}>Fecha de nacimiento</Form.Label>
                                <MDBCol sm={10}>
                                    <MDBRow>
                                        <DatePickerInput
                                            name="fecha_nacimiento"
                                            displayFormat='DD/MM/YYYY'
                                            maxDate={maxDate}
                                            className="calendario"
                                            onChange={(e) => this.cambiosFecha(e)}
                                            value={this.state.campos["fecha_nacimiento"]}
                                            onKeyPress={this.onKeyPress}
                                        />
                                        {
                                            (this.state.validaciones["fecha_nacimiento"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["fecha_nacimiento"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["fecha_nacimiento"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label className="labelLargo" column sm={3}>Teléfono de contacto</Form.Label>
                                <MDBCol sm={10}>
                                    <MDBRow>
                                        <Form.Control
                                            value={this.state.campos["telefono"]}
                                            name="telefono"
                                            type="number"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                            onKeyPress={this.onKeyPress}
                                        />
                                        {
                                            (this.state.validaciones["telefono"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["telefono"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["telefono"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label column sm={2}>Email</Form.Label>
                                <MDBCol sm={10}>
                                    <MDBRow>
                                        <Form.Control
                                            value={this.state.campos["mail"]}
                                            name="mail"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                            onKeyPress={this.onKeyPress}
                                        />
                                        {
                                            (this.state.validaciones["mail"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["mail"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["mail"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                            <Form.Group as={Row} className="camposGeneral">
                                <Form.Label column sm={2}>Password</Form.Label>
                                <MDBCol sm={10}>
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
                        </div>
                        <div className="botones">
                            <Button variant="light" href='/seleccionUsuario'>Atrás</Button>
                            <Button variant="light" onClick={this.limpiarCampos}>Limpiar</Button>
                            <Button variant="success" type="submit">Crear</Button>
                        </div>
                    </Form>
                    {
                        (this.state.resultadoRequest === 200) ?
                            <MDBModal isOpen={this.state.showModal} centered>
                                <div className="modalMargenes" tabIndex="0">
                                    <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                    <br />
                                    <i className="fas fa-check-circle iconoModalOk" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                </div>
                            </MDBModal>
                            :
                            <MDBModal isOpen={this.state.showModal} centered size="sm">
                                <div className="modalMargenes" tabIndex="0">
                                    <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                    <br />
                                    <i className="fas fa-exclamation-circle iconoModalError" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                </div>
                            </MDBModal>
                    }
                </Container>
            </div>
        );
    };
}

export default RegistroConsumidor;