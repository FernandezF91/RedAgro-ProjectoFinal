import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MDBCol, MDBRow, MDBModal } from "mdbreact";
import { GoogleApiWrapper } from 'google-maps-react';
import { DatePickerInput } from 'rc-datepicker';
import TimeField from 'react-simple-timefield';
import Modal from 'react-awesome-modal';
import Geocode from "react-geocode";
import Loader from 'react-loader-spinner';
import moment from 'moment';

import '../diseños/NuevoPuntoEntrega.css';
import { isDate } from 'moment';

const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);

Geocode.setApiKey('AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI');
Geocode.setLanguage("es");
Geocode.setRegion("ar");

class NuevoPuntoEntrega extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            validaciones: [],
            id: this.props.id_productor,
            google: this.props.google,
            disabled: "true",
            disabeld2: "",
            mensaje: "",
            visible: "",
            visible2: "",
            direccion: "",
            direccOk: "",
            formOk: "",
            lat: "",
            lng: "",
            id_punto_entrega: "",
            loading: false,
            showModal: false,
            resultadoRequest: 0,
            nuevaFecha: false
        }

        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.cerrarSeguirCargando = this.cerrarSeguirCargando.bind(this);
        this.mostrarListadoDePuntos = this.mostrarListadoDePuntos.bind(this);
    }

    mostrarListadoDePuntos() {
        this.props.history.push({
            pathname: '/principalProductores/ListadoPuntosEntrega',
            state: {
                id: this.state.id
            }
        });
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
        this.mostrarListadoDePuntos();
    }

    cerrarSeguirCargando() {
        this.setState({
            showModal: false,
        })
        this.limpiarCampos();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_entrega"] = e;
        this.setState({ campos })
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        this.autocomplete = new this.state.google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["geocode"] });

        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {

        let campos = this.state.campos;
        const place = this.autocomplete.getPlace();
        let address = place.address_components;
        let formatted_address = place.formatted_address;

        try {

            campos["direccion"] = place.name;
            campos["localidad"] = address[2].short_name;
            campos["provincia"] = address[4].long_name;
            campos["codigoPostal"] = address[6].short_name;
            campos["pais"] = address[5].long_name;

            this.setState({ campos: campos, direccion: formatted_address, direccOk: true });

        } catch{

            this.setState({ direccOk: false });
        }
    }

    closeModal() {
        if (this.state.formOk === true) {
            this.mostrarPantallaPrincipal();
        }

        this.setState({
            visible: false
        });
    }

    limpiarCampos() {

        let campos = this.state.campos;
        campos["fecha_entrega"] = "";
        campos["hora_inicio"] = "";
        campos["hora_fin"] = "";

        this.setState({
            nuevaFecha: true,
            campos: campos
        });
    }

    detectarCambiosDescripcion(e) {
        let campos = this.state.campos;
        campos["descripcion"] = e.target.value;
        this.setState({
            campos
        })
    }

    cambiosHora(valor, hora) {
        let campos = this.state.campos;
        campos[hora] = valor;
        this.setState({
            campos
        })
    }

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (!this.state.campos["descripcion"]) {
            validaciones["descripcion"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["direccion"]) {
            validaciones["direccion_entrega"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["pais"] !== "Argentina") {
            validaciones["direccion_entrega"] = "Fuera de los límites permitidos";
            showModal = true;
        }

        if (!this.state.campos["pais"]) {
            validaciones["pais"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["provincia"]) {
            validaciones["provincia"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["localidad"]) {
            validaciones["localidad"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["direccion"]) {
            validaciones["direccion"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["codigoPostal"]) {
            validaciones["codigoPostal"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["fecha_entrega"]) {
            validaciones["fecha_entrega"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["fecha_entrega"] && moment(this.state.campos["fecha_entrega"], 'DD/MM/YYYY').format('YYYY-MM-DD') === "Invalid date") {
            validaciones["fecha_entrega"] = "Formato inválido";
            showModal = true;
        } else if (this.state.campos["fecha_entrega"] && moment(this.state.campos["fecha_entrega"]).diff(moment(), "days") <= 0) {
            validaciones["fecha_entrega"] = "Fecha inválida";
            showModal = true;
        }

        if (!this.state.campos["hora_inicio"]) {
            validaciones["hora_inicio"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["hora_inicio"] === undefined) {
            validaciones["hora_inicio"] = "Horario incorrecto";
            showModal = true;
        }

        if (!this.state.campos["hora_fin"]) {
            validaciones["hora_fin"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["hora_fin"] === undefined) {
            validaciones["hora_fin"] = "Horario incorrecto";
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
            var hora_inicio = this.state.campos["hora_inicio"].replace(/:/g, '');
            var hora_fin = this.state.campos["hora_fin"].replace(/:/g, '');

            if (parseInt(hora_inicio) >= parseInt(hora_fin)) {
                validaciones["hora_inicio"] = " ";
                validaciones["hora_fin"] = " ";
                showModal = true;
                this.setState({
                    validaciones: validaciones,
                    showModal: showModal,
                    mensaje: "Ups! El horario ingresado es incorrecto. Por favor, intentá nuevamente",
                    loading: false,
                    resultadoRequest: 0
                });
                return false;

            } else {
                return true;
            }
        }
    }

    handleSubmit(e) {
        var _this = this;

        _this.setState({
            loading: true
        });
        e.preventDefault();
        if (_this.validarCampos()) {
            if (this.state.id_punto_entrega !== "") {
                this.setState({
                    loading: true
                });
                const path = "http://localhost:3000/redAgro/subir_fecha_entrega?id_punto_entrega=";

                const path_final = path + _this.state.id_punto_entrega

                let fecha_entrega = this.state.campos["fecha_entrega"]
                let dia;
                if (fecha_entrega.getDate() < 10) {
                    dia = "0" + fecha_entrega.getDate().toString();
                } else {
                    dia = fecha_entrega.getDate().toString();
                }
                let mes = fecha_entrega.getMonth() + 1;
                let año = fecha_entrega.getFullYear();
                var fecha = dia + '-' + mes + '-' + año;

                fetch(path_final, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify({

                        "fecha": fecha,
                        "hora_fin": this.state.campos["hora_fin"],
                        "hora_inicio": this.state.campos["hora_inicio"]
                    }),
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            response.text().then(
                                function (response) {
                                    _this.setState({
                                        showModal: true,
                                        resultadoRequest: 0,
                                        mensaje: response,
                                        loading: false
                                    });
                                })
                            return;
                        }
                        response.text().then(
                            function (response) {
                                _this.setState({
                                    loading: false,
                                    resultadoRequest: 200,
                                    showModal: true,
                                    direccion: "",
                                    lat: "",
                                    lng: ""
                                })
                            });
                    });

                return;

            }


            if (this.state.direccOk === false) {
                this.setState({
                    visible: true,
                    mensaje: "Ingresaste una dirección incorrecta",
                    titulo: "Error"
                });

                return;
            }

            Geocode.fromAddress(_this.state.direccion).then(
                response => {

                    const { lat, lng } = response.results[0].geometry.location;

                    _this.setState({ lat: lat, lng: lng });

                    const path = "http://localhost:3000/redAgro/subir_punto_entrega?id_productor=";

                    let fecha_entrega = this.state.campos["fecha_entrega"]
                    let dia;
                    if (fecha_entrega.getDate() < 10) {
                        dia = "0" + fecha_entrega.getDate().toString();
                    } else {
                        dia = fecha_entrega.getDate().toString();
                    }
                    let mes = fecha_entrega.getMonth() + 1;
                    let año = fecha_entrega.getFullYear();
                    var fecha = dia + '-' + mes + '-' + año;

                    const path_final = path + _this.state.id + "&descripcion=" + this.state.campos["descripcion"] + "&fecha_entrega=" + fecha
                        + "&hora_inicio=" + this.state.campos["hora_inicio"] + "&hora_fin=" + this.state.campos["hora_fin"]

                    fetch(path_final, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json;charset=UTF-8',
                        },
                        body: JSON.stringify({

                            "pais": this.state.campos["pais"],
                            "provincia": this.state.campos["provincia"],
                            "localidad": this.state.campos["localidad"],
                            "direccion": this.state.campos["direccion"],
                            "cod_postal": this.state.campos["codigoPostal"],
                            "latitud": this.state.lat,
                            "longitud": this.state.lng
                        }),
                    })
                        .then(function (response) {
                            if (response.status !== 200) {
                                response.text().then(
                                    function (response) {
                                        _this.setState({
                                            showModal: true,
                                            resultadoRequest: 0,
                                            mensaje: response,
                                            loading: false
                                        });
                                    })
                                return;
                            }
                            response.text().then(
                                function (response) {

                                    _this.setState({
                                        id_punto_entrega: response,
                                        loading: false,
                                        resultadoRequest: 200,
                                        showModal: true,
                                        mensaje: "Punto de entrega cargado correctamente!",
                                        lat: "",
                                        lng: ""
                                    })

                                });
                        });
                },
                error => {

                    _this.setState({
                        showModal: true,
                        mensaje: "Ocurrió un error al guardar el punto de entrega. Intenta nuevamente",
                        loading: false,
                        resultadoRequest: 0
                    });
                    return;
                }
            );
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
                <div className="titulosPrincipales">Nuevo punto de entrega</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Nombre</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="descripcion"
                                    value={this.state.campos["descripcion"]}
                                    maxLength="100"
                                    onChange={(e) => this.detectarCambiosDescripcion(e)}
                                    className="col-md-8"
                                    disabled={this.state.nuevaFecha}
                                />
                                {
                                    (this.state.validaciones["descripcion"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["descripcion"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["descripcion"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Ubicación</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    ref={this.autocompleteInput}
                                    id="autocomplete"
                                    name="direccion_entrega"
                                    disabled={this.state.nuevaFecha}
                                    className="col-md-8"
                                    placeholder=""
                                />
                                {
                                    (this.state.validaciones["direccion_entrega"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["direccion_entrega"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["direccion_entrega"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>País</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="pais"
                                    disabled="true"
                                    value={this.state.campos["pais"]}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["pais"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["pais"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["pais"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Provincia</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="provincia"
                                    value={this.state.campos["provincia"]}
                                    disabled={this.state.disabled}
                                    className="col-md-8"
                                />  {
                                    (this.state.validaciones["provincia"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["provincia"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["provincia"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Localidad</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="localidad"
                                    value={this.state.campos["localidad"]}
                                    disabled={this.state.disabled}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["localidad"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["localidad"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["localidad"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Dirección</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="direccion"
                                    value={this.state.campos["direccion"]}
                                    disabled={this.state.disabled}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["direccion"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["direccion"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["direccion"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Código postal</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    name="codigoPostal"
                                    value={this.state.campos["codigoPostal"]}
                                    disabled={this.state.disabled}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["codigoPostal"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["codigoPostal"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["codigoPostal"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Fecha de entrega</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <DatePickerInput
                                    name="fecha_entrega"
                                    displayFormat='DD/MM/YYYY'
                                    minDate={minDate}
                                    className="col-md-3 padding0Inputs"
                                    value={this.state.campos["fecha_entrega"]}
                                    onChange={(e) => this.cambiosFecha(e)}
                                />
                                {
                                    (this.state.validaciones["fecha_entrega"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["fecha_entrega"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["fecha_entrega"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Horario de entrega desde</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="text-aling-start">
                            <MDBRow>
                                <TimeField
                                    className="hora col-md-2"
                                    name="hora_inicio"
                                    value={this.state.campos["hora_inicio"]}
                                    onChange={(event, valor) => this.cambiosHora(valor, "hora_inicio")}
                                />
                                {
                                    (this.state.validaciones["hora_inicio"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["hora_inicio"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["hora_inicio"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Horario de entrega hasta</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="text-aling-start">
                            <MDBRow>
                                <TimeField
                                    className="hora col-md-2"
                                    name="hora_fin"
                                    value={this.state.campos["hora_fin"]}
                                    onChange={(event, valor) => this.cambiosHora(valor, "hora_fin")}
                                />
                                {
                                    (this.state.validaciones["hora_fin"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["hora_fin"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["hora_fin"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit">Guardar</Button>
                    </div>
                </Form>
                <br />
                <br />
                <br />
                {
                    (this.state.resultadoRequest === 200) ?
                        (
                            <MDBModal isOpen={this.state.showModal} centered>
                                <div className="modalMargenes" tabindex="0">
                                    <i className="fas fa-check-circle iconoModalOk" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                    <h5>¿Vas a estar en el mismo lugar en otra fecha? Agendala!</h5>

                                    <div className="botones">
                                        <Button variant="light" type="submit" onClick={this.cerrarModal}>No</Button>
                                        <Button variant="success" type="submit" onClick={this.cerrarSeguirCargando}>Si</Button>
                                    </div>
                                </div>
                            </MDBModal>
                        ) : (
                            <MDBModal isOpen={this.state.showModal} centered size="sm">
                                <div className="modalMargenes" tabindex="0">
                                    <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                    <br />
                                    <i className="fas fa-exclamation-circle iconoModalError" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                </div>
                            </MDBModal>
                        )
                }
            </div >
        );
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(NuevoPuntoEntrega);