
import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import { MDBModal } from 'mdbreact';
import Loader from 'react-loader-spinner';

class ModificarContraseña extends Component {

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
            user: this.props.usuario //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        });

        this.mostrarPantallaPrincipal();
    }

    cerrarModalError() {
        this.setState({
            showModal: false,
        })
    }

    detectarCambios(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    validarDatos() {
        if ((!this.state.fields["contraseñaNueva"] || !this.state.fields["contraseñaActual"] || !this.state.fields["confirmarContraseña"]) ||
            ((this.state.fields["contraseñaNueva"]) !== (this.state.fields["confirmarContraseña"])) ||
            ((this.state.fields["contraseñaActual"]) !== (this.state.user.contraseña))) {
            this.setState({
                mensaje: "Datos incompletos o incorrectos",
                resultadoRequest: 0,
                showModal: true,
                loading: false
            });

            return false;
        }

        if (this.state.fields["contraseñaActual"] === this.state.fields["contraseñaNueva"]) {
            this.setState({
                resultadoRequest: 0,
                mensaje: "No modificaste tu contraseña",
                showModal: true,
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
        var id = this.state.user.id;
        const final_path = path_principal + password + "&id=" + id;

        var _this = this;

        if (_this.validarDatos()) {

            fetch(final_path, {
                method: "PUT",
                // headers: {
                //     'Content-type': 'application/json;charset=UTF-8',
                // },
            })
                .then(function (response) {
                    if (response.status !== 200) {
                        let mensajeError = "Ocurrió un error al actualizar la contraseña. Reintentá en unos minutos."
                        _this.setState({
                            showModal: true,
                            resultadoRequest: 0,
                            mensaje: mensajeError,
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
                                loading: false,
                                fields: []
                            });
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
        return (
            <div>
                <div className="titulosPrincipales">Modificar contraseña</div>
                <div className="contenidoMF">
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Contraseña actual</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="contraseñaActual"
                            onChange={(e) => this.detectarCambios(e)}
                            className="camposDatosDeUsuario"
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Contraseña nueva</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="contraseñaNueva"
                            onChange={(e) => this.detectarCambios(e)}
                            className="camposDatosDeUsuario"
                        />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Confirmar contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="confirmarContraseña"
                            onChange={(e) => this.detectarCambios(e)}
                            className="camposDatosDeUsuario"
                        />
                    </Form.Group>

                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Guardar</Button>
                    </div>
                </div>
                {
                    (this.state.showModal) &&
                    (
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes">
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
                    )
                }
            </div>
        );
    };
}

export default ModificarContraseña;