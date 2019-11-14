
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
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        });
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
            ((this.state.fields["contraseñaNueva"]) !== (this.state.fields["confirmarContraseña"]))) {
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

        const path_principal = "http://localhost:3000/redAgro/usuario/modificar_contraseña?u=";
        var usuario = this.props.usuario.usuario;
        var passwordActual = this.state.fields["contraseñaActual"];
        var password = this.state.fields["contraseñaNueva"];
        var id = this.state.user.id;
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
                                    fields: []
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
                    )
                }
            </div>
        );
    };
}

export default ModificarContraseña;