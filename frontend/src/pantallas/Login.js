import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Login.css';
import '../diseños/estilosGlobales.css';
import { MDBModal } from 'mdbreact';

class LoginForm extends Component {
    constructor(props) {

        super(props)

        this.state = {
            fields: [],
            errores: [],
            usuario: {},
            showModal: false,
            mensajeError: "",
            rolUsuario: ""
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.mostrarPantallaProductor = this.mostrarPantallaProductor.bind(this);
        this.mostrarPantallaConsumidor = this.mostrarPantallaConsumidor.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    detectarCambios(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.validarDatos();
        }
    }

    validarDatos() {
        this.setState({
            errores: []
        })

        let errores = {};

        if ((!this.state.fields["username"]) && (!this.state.fields["password"])) {
            errores["username"] = "*Campo inválido";
            errores["password"] = "*Campo inválido";

        } else if (!this.state.fields["username"]) {
            errores["username"] = "*Campo inválido";

        } else if (!this.state.fields["password"]) {
            errores["password"] = "*Campo inválido";

        } else {
            const path_principal = "http://localhost:3000/redAgro/login/usuario?u=";

            var username = this.state.fields["username"];
            var password = this.state.fields["password"];

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
                                let mensajeError = response;
                                _this.setState({
                                    showModal: true,
                                    mensajeError: mensajeError
                                });
                            } else if (status === 500) {
                                let mensajeError = response;
                                _this.setState({
                                    showModal: true,
                                    mensajeError: mensajeError
                                });
                            } else {
                                let mensajeError = "Ocurrió un error al obtener los datos de tu usuario. Reintentá en unos minutos.";
                                _this.setState({
                                    showModal: true,
                                    mensajeError: mensajeError
                                });
                            }
                        }
                    )
                });
        }
        this.setState({
            errores
        })
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
        return (
            <div className="fondo">
                <Navbar className="barraNavegacion alturaBarra">
                    <Link to={'/'} className="culturaVerde">
                        <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                    </Link>
                </Navbar>
                <Container fluid className="contenedor">
                    <div className="formularioLogin">
                        <h2>Acceso de usuarios</h2>
                        <div className="encabezadoLogin">
                            <Form>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>Usuario</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            name="username"
                                            onChange={(e) => this.detectarCambios(e)}
                                            onKeyPress={this.onKeyPress}
                                            className="camposDatosDeUsuario"
                                        />
                                        <div className="error">
                                            {this.state.errores["username"]}
                                        </div>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword" className="passwordLogin">
                                    <Form.Label column sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            onChange={(e) => this.detectarCambios(e)}
                                            onKeyPress={this.onKeyPress}
                                            className="camposDatosDeUsuario"
                                        />
                                        <div className="error">
                                            {this.state.errores["password"]}
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="botones">
                            <Button variant="light" href="/seleccionUsuario">Registrar</Button>
                            <Button variant="success" onClick={this.validarDatos}>Ingresar</Button>
                        </div>
                        <a href="/recupero_email">Olvidé mi contraseña</a>
                    </div>
                    {
                        (this.state.showModal) &&
                        (
                            <MDBModal isOpen={this.state.showModal} centered size="sm">
                                <div className="modalMargenes">
                                    <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                    <br />
                                    <div>
                                        <i className="fas fa-exclamation-circle iconoModalError" />
                                        <br />
                                        <br />
                                        <h5>{this.state.mensajeError}</h5>
                                    </div>
                                </div>

                            </MDBModal>
                        )
                    }
                </Container>
            </div>
        );
    };
}

export default LoginForm;