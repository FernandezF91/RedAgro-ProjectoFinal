
import '../diseños/DatosDeUsuario.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MDBModal, MDBCol, MDBRow } from 'mdbreact';
import Loader from 'react-loader-spinner';

class ModificarContraseña extends Component {

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
            user: this.props.usuario //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        });
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

        if (!this.state.campos["contraseñaActual"]) {
            validaciones["contraseñaActual"] = "Campo requerido";
            showModal = true;
        }

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

        const path_principal = "http://" + window.$ip + ":3000/redAgro/usuario/modificar_contraseña?u=";
        var usuario = this.props.usuario.usuario;
        var passwordActual = this.state.campos["contraseñaActual"];
        var password = this.state.campos["contraseñaNueva"];
        const final_path = path_principal + usuario + "&ca=" + passwordActual + "&cn=" + password;

        var _this = this;

        if (_this.validarDatos()) {

            fetch(final_path, {
                method: "PUT",
            })
                .then(function (response) {
                    var status = response.status;
                    response.text().then(
                        function (response) {
                            if (status === 200) {
                                _this.setState({
                                    showModal: true,
                                    resultadoRequest: 200,
                                    mensaje: response,
                                    loading: false,
                                    campos: []
                                });
                            } else {
                                _this.setState({
                                    showModal: true,
                                    resultadoRequest: 0,
                                    mensaje: response,
                                    loading: false
                                });
                                return;
                            }
                        });
                });
        }
    }

    mostrarPantallaPrincipal() {
        this.state.user.rol === "Productor" ?
            this.props.history.push({
                pathname: '/principalProductores/MiCuenta',
                state: { id: this.state.user.id }
            })
            :
            this.props.history.push("/principalConsumidores/MiCuenta", { id: this.state.user.id });
    }

    render() {
        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
        )

        return (
            <div>
                <div className="titulosPrincipales">Modificar contraseña</div>
                <Form ref="form" onSubmit={(e) => this.modificarContraseña(e)}>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Contraseña actual</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    type="password"
                                    name="contraseñaActual"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
                                />
                                {
                                    (this.state.validaciones["contraseñaActual"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["contraseñaActual"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["contraseñaActual"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Contraseña nueva</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    type="password"
                                    name="contraseñaNueva"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
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
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Confirmar contraseña</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    type="password"
                                    name="confirmarContraseña"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
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
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Guardar</Button>
                    </div>
                </Form>
                {
                    <MDBModal isOpen={this.state.showModal} centered size="sm">
                        <div className="modalMargenes" tabIndex="0">
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
            </div>
        );
    };
}

export default ModificarContraseña;