
import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import '../diseños/ModificarContraseña.css';

class ModificarContraseña extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields: [],
            errores: [],
            usuario: {},
            visible: false,
            mensaje: "",
            titulo: "",
            formOk: false,
            user: this.props.usuario //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    detectarCambios(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    closeModal() {

        if (this.state.formOk === false) {

            this.setState({
                visible: false
            });

            return;

        }

        this.setState({
            visible: false
        });

        this.mostrarPantallaPrincipal();

    }


    validarDatos() {


        if ((!this.state.fields["contraseñaNueva"] || !this.state.fields["contraseñaActual"] || !this.state.fields["confirmarContraseña"]) ||
            ((this.state.fields["contraseñaNueva"]) !== (this.state.fields["confirmarContraseña"])) ||
            ((this.state.fields["contraseñaActual"]) !== (this.state.user.contraseña))) {

            this.setState({
                titulo: "Error",
                mensaje: "Datos incompletos o incorrectos",
                visible: true
            });

            return false;

        }

        if (this.state.fields["contraseñaActual"] === this.state.fields["contraseñaNueva"]) {


            this.setState({
                titulo: "Error",
                mensaje: "No modificaste tu contraseña",
                visible: true
            });

            return false;


        }

        return true;

    }

    modificarContraseña() {

        const path_principal = "http://localhost:3000/redAgro/modificar_contraseña?c=";

        var password = this.state.fields["contraseñaNueva"];

        var id = this.state.user.id;

        const final_path = path_principal + password + "&id=" + id;

        console.log(final_path);

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

                        // alert("Ocurrió algún problema. Intenta nuevamente")

                        let mensajeError = "Ocurrió algun problema, intenta nuevamente"

                        _this.setState({
                            visible: true,
                            titulo: "Error",
                            mensaje: mensajeError
                        });

                        return;

                    }

                    response.text().then(

                        function (response) {

                            _this.setState({
                                visible: true,
                                titulo: "Modificación exitosa",
                                mensaje: "",
                                formOk: true
                            });


                        });
                });
        }
    }


    mostrarPantallaPrincipal() {

        this.state.user.rol === "Productor" ?

            this.props.history.push({
                pathname: '/principalProductores',
                state: { id: this.state.user.id }
            })
            :

            this.props.history.push("/principalConsumidores", { id: this.state.user.id });

    }

    render() {

        return (
            <div>
                <div className="titulosPrincipales">Modificar contraseña</div>
                <div className="contenidoMF">
                    <div className="contraseñaActual" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Contraseña actual
									</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="contraseñaActual"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="contraseñaNueva" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Contraseña nueva
									</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="contraseñaNueva"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="confirmarContraseña" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Confirmar contraseña
									</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="confirmarContraseña"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="botonesNuevoProducto">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Guardar</Button>
                    </div>
                </div>
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="460"
                        height="120"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>{this.state.mensaje}</p>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Cerrar</a>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}

export default ModificarContraseña;