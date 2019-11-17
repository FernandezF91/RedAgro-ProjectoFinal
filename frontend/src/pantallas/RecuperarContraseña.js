
import '../diseños/recuperaremail.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Navbar, Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { MDBCol, MDBModal } from 'mdbreact';
import Loader from 'react-loader-spinner';

import culturaVerde from '../imagenes/cultura-verde-2.png';

class RecuperarContraseña extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields: [],
            errores: [],
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
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    validarDatos() {
        if ((!this.state.fields["contraseñaNueva"] || !this.state.fields["confirmarContraseña"]) ||
            ((this.state.fields["contraseñaNueva"]) !== (this.state.fields["confirmarContraseña"]))) {

            this.setState({
                mensaje: "Datos incompletos o incorrectos",
                showModal: true,
                resultadoRequest: 0,
                loading: false
            });
            return false;
        }
        return true;
    }

    modificarContraseña() {
        this.setState({
            loading: true
        });
        const path_principal = "http://localhost:3000/redAgro/modificar_contraseña?c=";
        var password = this.state.fields["contraseñaNueva"];
        var id = this.state.id;
        const final_path = path_principal + password + "&id=" + id;
        var _this = this;

        if (_this.validarDatos()) {

            fetch(final_path, {
                method: "PUT"
            })
                .then(function (response) {
                    if (response.status !== 200) {
                        _this.setState({
                            showModal: true,
                            mensaje: "Ocurrió un error al actualizar la contraseña. Reintentá en unos minutos.",
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
                    <Loader
                        type="Grid"
                        color="#28A745"
                        height={150}
                        width={150}
                        className="loader loaderWhitesmoke"
                    />
                </Container>
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
                    <div className="formularioLogin">
                        <h2>Modificar contraseña</h2>
                        <div className="encabezadoRecucontra">
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column>Contraseña nueva</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="contraseñaNueva"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column>Confirmar contraseña</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="confirmarContraseña"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="camposDatosDeUsuario"
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarLogin}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Guardar</Button>
                    </div>
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