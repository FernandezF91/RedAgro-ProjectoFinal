
import React, { Component } from 'react'
import { Navbar, Container, Form, Row, Button } from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import '../diseños/RecuperarContraseña.css';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import { Link } from 'react-router-dom';

class RecuperarContraseña extends Component {

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
            id: this.props.match.params.id
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
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
        if ((!this.state.fields["contraseñaNueva"] || !this.state.fields["confirmarContraseña"]) ||
            ((this.state.fields["contraseñaNueva"]) !== (this.state.fields["confirmarContraseña"]))) {

            this.setState({
                titulo: "Error",
                mensaje: "Datos incompletos o incorrectos",
                visible: true
            });

            return false;
        }
        return true;
    }

    modificarContraseña() {
        const path_principal = "redAgro/modificar_contraseña?c=";
        var password = this.state.fields["contraseñaNueva"];
        var id = this.state.id;
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
        this.props.history.push({
            pathname: '/login',
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
                    <br>
                    </br>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div className="titulosPrincipales">Modificar contraseña</div>
                    <div className="mF">
                        <div className="contraseñaNueva" >
                            <Form.Group as={Row}>
                                <Form.Label column sm={4}>
                                    Contraseña nueva
									</Form.Label>
                                <Form.Control
                                    id="passCN"
                                    required
                                    type="password"
                                    name="contraseñaNueva"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="camposDatosDeUsuario"
                                />
                            </Form.Group>
                        </div>
                        <div className="confirmarContraseña" >
                            <Form.Group as={Row}>
                                <Form.Label column sm={4}>
                                    Confirmar contraseña
									</Form.Label>
                                <Form.Control
                                    id="passCC"
                                    required
                                    type="password"
                                    name="confirmarContraseña"
                                    className="camposDatosDeUsuario"
                                    onChange={(e) => this.detectarCambios(e)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Guardar</Button>
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
                </Container>

            </div>
        );
    };
}

export default RecuperarContraseña;