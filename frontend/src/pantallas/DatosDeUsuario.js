import '../diseños/DatosDeUsuario.css';
import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import { DatePickerInput } from 'rc-datepicker';
import Modal from 'react-awesome-modal';
import { isDate } from 'moment';

const maxDate = new Date();

const regularExp = {
    onlyLetters: /^[a-zA-Z ]*$/,
    onlyNumbers: /^[0-9]+$/
}

class DatosDeUsuario extends Component {

    constructor(props) {

        super(props)

        this.state = {
            campos: [],
            errores: [],
            usuario: this.props.usuario,
            visible: false,
            mensaje: "",
            titulo: "",
            formOk: false,
            razon_social: "",
            id: this.props.usuario.id //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarStorage = this.actualizarStorage.bind(this);
    }

    componentDidMount() {
        let campos = {}

        campos["nombre"] = this.state.usuario.nombre;
        campos["apellido"] = this.state.usuario.apellido;
        campos["fecha_nac"] = new Date(this.state.usuario.fecha_nacimiento);
        campos["telefono"] = this.state.usuario.telefono;

        if (this.state.usuario.rol === "Productor") {
            var path = "http://localhost:3000/redAgro/productor/obtenerRazonSocial?id=" + this.state.id;
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
        campos["fecha_nac"] = e;
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
                    "fecha_nacimiento": this.state.campos["fecha_nac"],
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
                    "fecha_nacimiento": this.state.campos["fecha_nac"],
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

    mostrarPantallaPrincipal() {
        if (this.state.usuario.rol === "Productor") {
            this.props.actualizarUsuarioProductor(this.state.usuario);
        } else {
            this.props.actualizarUsuarioConsumidor(this.state.usuario);
        }
    }

    validarCampos() {
        if ((!this.state.campos["nombre"]) || (!this.state.campos["apellido"]) || (!this.state.campos["telefono"]) || (!this.state.campos["fecha_nac"]) ||
            (!regularExp.onlyLetters.test(this.state.campos["nombre"])) || (!regularExp.onlyLetters.test(this.state.campos["apellido"])) || (!isDate(this.state.campos["fecha_nac"])) ||
            (!regularExp.onlyNumbers.test(this.state.campos["telefono"])) || (this.state.campos["telefono"].length < 8) || (this.state.campos["telefono"].length > 14)) {

            this.setState({
                titulo: "Error",
                mensaje: "Datos incompletos o incorrectos",
                visible: true
            });

            return false;
        }

        if ((this.state.campos["nombre"] === this.state.usuario.nombre) &&
            (this.state.campos["apellido"] === this.state.usuario.apellido) &&
            (this.state.campos["telefono"] === this.state.usuario.telefono) &&
            (this.state.campos["razon_social"] === this.razon_social) &&
            (this.state.campos["fecha_nac"].getTime() === new Date(this.state.usuario.fecha_nacimiento).getTime())) {

            this.setState({
                titulo: "Error",
                mensaje: "No modificaste ningún dato",
                visible: true
            });

            return false;
        }
        return true;
    }

    handleSubmit(e) {
        var _this = this;

        if (_this.validarCampos()) {

            if (this.state.usuario.rol === "Productor" && (this.state.razon_social !== this.state.campos["razon_social"])) {
                var path = "http://localhost:3000/redAgro/productor/actualizarRazonSocial?id=" + this.state.id + "&razon_social=" + this.state.campos["razon_social"];
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
                                        visible: true,
                                        titulo: "Error",
                                        mensaje: response
                                    });
                                }
                                else {
                                    _this.actualizarStorage();
                                    _this.setState({
                                        visible: true,
                                        titulo: "Modificación exitosa",
                                        mensaje: "",
                                        formOk: true
                                    });
                                }
                            }
                        )
                    })
            }
            var path_principal = "http://localhost:3000/redAgro/update_usuario?id=";

            var path_final = path_principal + _this.state.id;

            fetch(path_final, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    "nombre": this.state.campos["nombre"],
                    "apellido": this.state.campos["apellido"],
                    "telefono": this.state.campos["telefono"],
                    "fecha_nacimiento": this.state.campos["fecha_nac"]
                }),
            })
                .then(function (response) {
                    if (response.status !== 200) {
                        _this.setState({
                            visible: true,
                            titulo: "Error",
                            mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                        });
                        return;
                    }

                    response.text().then(
                        function (response) {
                            _this.actualizarStorage();
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

    render() {
        return (
            <div>
                <div className="titulosPrincipales">Datos de usuario</div>
                <div className="contenidoDU">
                    <div className="nombreDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Nombre
									</Form.Label>
                            <Form.Control
                                required
                                type="nom"
                                name="nombre"
                                defaultValue={this.state.usuario.nombre}
                                pattern="^[a-zA-Z ]*$"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="apellidoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Apellido
									</Form.Label>
                            <Form.Control
                                required
                                type="ap"
                                name="apellido"
                                defaultValue={this.state.usuario.apellido}
                                pattern="^[a-zA-Z ]*$"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    {
                        this.state.usuario.rol === "Productor" ?
                            <div className="apellidoDU" >
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>
                                        Razón Social
									</Form.Label>
                                    <Form.Control
                                        required
                                        type="rs"
                                        name="razon_social"
                                        defaultValue={this.state.razon_social}
                                        pattern="^[a-zA-Z ]*$"
                                        onChange={(e) => this.detectarCambios(e)}
                                    />
                                </Form.Group>
                            </div>
                            : ''
                    }
                    <div className="fechaNac">
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>
                                Fecha de nacimiento
                                </Form.Label>
                            <DatePickerInput
                                ref="datePicker"
                                name="fecha_nac"
                                defaultValue={this.state.usuario.fecha_nacimiento}
                                displayFormat='DD/MM/YYYY'
                                maxDate={maxDate}
                                className="calend"
                                onChange={(e) => this.cambiosFecha(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="telefonoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Teléfono de contacto
									</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                name="telefono"
                                defaultValue={this.state.usuario.telefono}
                                pattern="[0-9]{8,14}"
                                maxLength="14"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit" onClick={(e) => this.handleSubmit(e)}>Guardar</Button>
                    </div>
                </div>
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="460"
                        height="120"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}>

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

export default DatosDeUsuario;