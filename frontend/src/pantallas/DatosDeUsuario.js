import '../diseños/DatosDeUsuario.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { MDBCol, MDBRow, MDBModal } from 'mdbreact';
import { DatePickerInput } from 'rc-datepicker';
import Loader from 'react-loader-spinner';
import moment from 'moment';

const maxDate = new Date();

const regularExp = {
    letras: /^[a-zA-Z\s]*$/,
    telefono: /^[0-9]{8,14}$/,
}

class DatosDeUsuario extends Component {

    constructor(props) {

        super(props)

        this.state = {
            campos: [],
            validaciones: [],
            usuario: this.props.usuario,
            showModal: false,
            mensaje: "",
            razon_social: "",
            resultadoRequest: 0,
            loading: false,
            id: this.props.usuario.id //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarStorage = this.actualizarStorage.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    componentDidMount() {
        let campos = {}

        campos["nombre"] = this.state.usuario.nombre;
        campos["apellido"] = this.state.usuario.apellido;
        campos["fecha_nacimiento"] = new Date(this.state.usuario.fecha_nacimiento);
        campos["telefono"] = this.state.usuario.telefono;

        if (this.state.usuario.rol === "Productor") {
            var path = "http://"+window.$ip+":3000/redAgro/productor/obtenerRazonSocial?id=" + this.state.id;
            fetch(path)
                .catch(error => console.error(error))
                .then(response => {
                    try {
                        if (response.status === 200) {
                            this.setState({
                                resultadoRequest: response.status
                            });
                            return response.json();
                        }
                        else {
                            console.log(response.status);
                            this.setState({
                                loading: false,
                                resultadoRequest: response.status
                            });
                        }
                    } catch (error) {
                        console.log(error);
                        this.setState({
                            loading: false,
                            resultadoRequest: response.status
                        });
                    }
                })
                .then(data => {
                    if (data !== undefined) {
                        campos["razon_social"] = data.razon_social;
                        this.setState({
                            campos: campos,
                            razon_social: data.razon_social
                        });
                    }
                })
        } else {
            this.setState({ campos: campos });
        }
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    cambiosFecha(e) {
        let campos = this.state.campos;

        campos["fecha_nacimiento"] = e;

        this.setState({ campos })
    }

    actualizarStorage() {
        if (this.state.usuario.rol === "Consumidor") {
            this.setState({
                usuario: JSON.parse(JSON.stringify({
                    "id": this.state.usuario.id,
                    "nombre": this.state.campos["nombre"],
                    "apellido": this.state.campos["apellido"],
                    "telefono": this.state.campos["telefono"],
                    "fecha_nacimiento": this.state.campos["fecha_nacimiento"],
                    "usuario": this.state.usuario.usuario,
                    "contraseña": this.state.usuario.contraseña,
                    "rol": this.state.usuario.rol,
                    "activo": this.state.usuario.activo,
                    "alertas": []
                }))
            })
            localStorage.removeItem('myLocalStorageUserConsumidor');
            localStorage.setItem('myLocalStorageUserConsumidor', JSON.stringify(this.state.usuario));
        } else {
            this.setState({
                usuario: JSON.parse(JSON.stringify({
                    "id": this.state.usuario.id,
                    "nombre": this.state.campos["nombre"],
                    "apellido": this.state.campos["apellido"],
                    "telefono": this.state.campos["telefono"],
                    "fecha_nacimiento": this.state.campos["fecha_nacimiento"],
                    "usuario": this.state.usuario.usuario,
                    "contraseña": this.state.usuario.contraseña,
                    "rol": this.state.usuario.rol,
                    "activo": this.state.usuario.activo,
                    "razon_social": this.state.razon_social,
                    "alertas": []
                }))
            })
            localStorage.removeItem('myLocalStorageUserProductor');
            localStorage.setItem('myLocalStorageUserProductor', JSON.stringify(this.state.usuario));
        }
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
        this.mostrarPantallaPrincipal();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    mostrarPantallaPrincipal() {
        if (this.state.usuario.rol === "Productor") {
            this.props.actualizarUsuarioProductor(this.state.usuario);
        } else {
            this.props.actualizarUsuarioConsumidor(this.state.usuario);
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

        if (this.state.usuario.rol === "Productor" && !this.state.campos["razon_social"]) {
            validaciones["razon_social"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["telefono"]) {
            validaciones["telefono"] = "Campo requerido";
            showModal = true;
        } else if (!regularExp.telefono.test(this.state.campos["telefono"])) {
            validaciones["telefono"] = "Formato inválido";
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

        e.preventDefault();

        if (_this.validarCampos()) {

            if (this.state.usuario.rol === "Productor" && (this.state.razon_social !== this.state.campos["razon_social"])) {
                var path = "http://"+window.$ip+":3000/redAgro/productor/actualizarRazonSocial?id=" + this.state.id + "&razon_social=" + this.state.campos["razon_social"];
                fetch(path, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                })
                    .then(function (response) {
                        var status = response.status;
                        response.text().then(
                            function (response) {
                                if (status !== 200) {
                                    _this.setState({
                                        showModal: true,
                                        mensaje: response,
                                        resultadoRequest: 0,
                                        loading: false
                                    });
                                }
                                else {
                                    _this.actualizarStorage();
                                    _this.setState({
                                        showModal: true,
                                        resultadoRequest: 200,
                                        mensaje: "Datos actualizados correctamente!",
                                        loading: false
                                    });
                                }
                            }
                        )
                    })
            }

            var path = "http://"+window.$ip+":3000/redAgro/update_usuario?id=" + _this.state.id;

            fetch(path, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    "nombre": this.state.campos["nombre"],
                    "apellido": this.state.campos["apellido"],
                    "telefono": this.state.campos["telefono"],
                    "fecha_nacimiento": this.state.campos["fecha_nacimiento"]
                }),
            })
                .then(function (response) {
                    if (response.status !== 200) {
                        _this.setState({
                            showModal: true,
                            mensaje: "Ocurrió un error al actualizar tus datos. Por favor, reintentá en unos minutos.",
                            resultadoRequest: 0,
                            loading: false
                        });
                        return;
                    }

                    response.text().then(
                        function (response) {
                            _this.actualizarStorage();
                            _this.setState({
                                showModal: true,
                                resultadoRequest: 200,
                                mensaje: "Datos actualizados correctamente!",
                                loading: false
                            });

                        });
                });
        }
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
                <div className="titulosPrincipales">Datos de usuario</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Nombre</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["nombre"]}
                                    name="nombre"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
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
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Apellido</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["apellido"]}
                                    name="apellido"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
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
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Fecha de nacimiento</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <DatePickerInput
                                    ref="datePicker"
                                    defaultValue={this.state.usuario.fecha_nacimiento}
                                    displayFormat='DD/MM/YYYY'
                                    maxDate={maxDate}
                                    onChange={(e) => this.cambiosFecha(e)}
                                    className="col-md-3 padding0Inputs"
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
                    {
                        this.state.usuario.rol === "Productor" &&
                        (
                            <Form.Group className="col-md-12">
                                <MDBCol md="4" top>
                                    <Form.Label column>Razón Social</Form.Label>
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBRow>
                                        <Form.Control
                                            value={this.state.campos["razon_social"]}
                                            name="razon_social"
                                            onChange={(e) => this.detectarCambios(e)}
                                            className="col-md-6"
                                        />
                                        {
                                            (this.state.validaciones["razon_social"]) &&
                                            <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                        }
                                    </MDBRow>
                                    {
                                        (this.state.validaciones["razon_social"]) &&
                                        <MDBRow>
                                            <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["razon_social"]}</div>
                                        </MDBRow>
                                    }
                                </MDBCol>
                            </Form.Group>
                        )
                    }
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Teléfono de contacto</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["telefono"]}
                                    name="telefono"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-6"
                                    type="number"
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
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
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
            </div >
        );
    };
}

export default DatosDeUsuario;