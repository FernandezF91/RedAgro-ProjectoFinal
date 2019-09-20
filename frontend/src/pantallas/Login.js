import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Login.css';
import '../diseños/estilosGlobales.css';
import Modal from 'react-awesome-modal';

class LoginForm extends Component {
    constructor(props) {

        super(props)

        this.state = {
            fields: [],
            errores: [],
            usuario: {},
            visible: false,
            mensajeError: "",
            rolUsuario: ""
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.mostrarPantallaProductor = this.mostrarPantallaProductor.bind(this);
        this.mostrarPantallaConsumidor = this.mostrarPantallaConsumidor.bind(this);
    }

    detectarCambios(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })

    }

    closeModal() {
        this.setState({
            visible: false
        });
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
            const path_principal = "http://localhost:3000/redAgro/login?u=";

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
                    if (response.status !== 200) {

                        // alert("Ocurrió algún problema. Intenta nuevamente")

                        let mensajeError = "Ocurrió algun problema, intenta nuevamente"
                        _this.setState({
                            visible: true,
                            mensajeError: mensajeError
                        });
                        return;
                    }

                    response.text().then(
                        function (response) {
                            if (response !== "") {
                                _this.setState({ usuario: JSON.parse(response) });
                                if (_this.state.usuario.rol === "Productor") {
                                    _this.mostrarPantallaProductor();
                                } else {
                                    _this.mostrarPantallaConsumidor();
                                }

                            } else {
                                let mensajeError = "Cuenta inexistente o datos incorrectos";
                                _this.setState({
                                    visible: true,
                                    mensajeError: mensajeError
                                });
                            }

                        });
                });
        }

        this.setState({
            errores
        })
    }

    mostrarPantallaProductor() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.usuario.id, user: this.state.usuario, rolUsuario: this.state.usuario.rol }
        })

    }

    mostrarPantallaConsumidor() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: {
                id: this.state.usuario.id,
                user: this.state.usuario,
                rolUsuario: this.state.usuario.rol
            }
        })
    }

    render() {
        const { data, loading } = this.state

        return (
            <div className="fondo">
                <Navbar className="barraNavegacion">
                    <Link to={'/'} className="culturaVerde">
                        <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                    </Link>
                </Navbar>
                <Container fluid className="contenedor">
                    <div className="formularioLogin">
                        <h2>Acceso de usuarios</h2>
                        <div className="encabezadoLogin">
                            <Form>
                                <div className="usuarioLogin">
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}>
                                            Usuario
                                </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="email" name="username" onChange={(e) => this.detectarCambios(e)} />
                                            <div className="error">
                                                {this.state.errores["username"]}
                                            </div>
                                        </Col>

                                    </Form.Group>
                                </div>
                                <div className="passwordLogin">
                                    <Form.Group as={Row} controlId="formHorizontalPassword" >
                                        <Form.Label column sm={2}>
                                            Password
                                </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="password" name="password" onChange={(e) => this.detectarCambios(e)} />
                                            <div className="error">
                                                {this.state.errores["password"]}
                                            </div>
                                        </Col>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                        <div className="botonesLogin">
                            <Button variant="success" onClick={this.validarDatos}>Ingresar</Button>
                            <a href='/seleccionUsuario'>
                                <Button variant="success">Registrar</Button>
                            </a>
                        </div>
                        <a href="/recupero_email">
                            olvidé mi contraseña
                        </a>
                    </div>
                    <section>
                        <Modal
                            visible={this.state.visible}
                            width="400"
                            height="120"
                            effect="fadeInUp"
                            onClickAway={() => this.closeModal()}
                        >
                            <div>
                                <h1>Error</h1>
                                <p>
                                    {this.state.mensajeError}
                                </p>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                            </div>
                        </Modal>
                    </section>
                </Container>
            </div>
        );
    };
}

export default LoginForm;