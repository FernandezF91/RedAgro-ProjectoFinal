import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { GoogleApiWrapper } from 'google-maps-react';
import { DatePickerInput } from 'rc-datepicker';
import TimeField from 'react-simple-timefield';
import Modal from 'react-awesome-modal';
import Geocode from "react-geocode";
import Loader from 'react-loader-spinner';

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
            id: this.props.id_productor,
            google: this.props.google,
            disabled: "true",
            disabeld2: "",
            titulo: "",
            mensaje: "",
            visible: "",
            visible2: "",
            direccion: "",
            direccOk: "",
            formOk: "",
            lat: "",
            lng: "",
            id_punto_entrega: ""
        }

        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
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
            campos["cod_postal"] = address[6].short_name;
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

    closeModalSi() {

        let campos = this.state.campos;
        campos["fecha_entrega"] = "";
        campos["hora_inicio"] = "";
        campos["hora_fin"] = "";
        campos["descripcion"] = "";

        this.setState({
            visible2: false,
            formOk: false,
            disabled2: true,
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

    validarFormulario() {

        var _this = this;

        if (this.state.campos["hora_inicio"] === undefined || this.state.campos["hora_fin"] === undefined) {
            this.setState({
                visible: true,
                titulo: "Error",
                mensaje: "El horario ingresado es incorrecto. Intentá nuevamente"
            });
            return
        } else {

            var hora_inicio = this.state.campos["hora_inicio"].replace(/:/g, '');
            var hora_fin = this.state.campos["hora_fin"].replace(/:/g, '');

            if (parseInt(hora_inicio) >= parseInt(hora_fin)) {
                this.setState({
                    visible: true,
                    titulo: "Error",
                    mensaje: "El horario ingresado es incorrecto. Intentá nuevamente"
                });
                return
            }
        }

        if (this.state.campos["fecha_entrega"] === undefined) {
            this.setState({
                visible: true,
                titulo: "Error",
                mensaje: "Te olvidaste de seleccionar una fecha de entrega. Por favor, intentá nuevamente"
            });
            return
        }

        if (this.state.id_punto_entrega !== "") {
            this.setState({
                loading: true
            });
            const path = "http://localhost:3000/redAgro/subir_fecha_entrega?id_punto_entrega=";

            const path_final = path + _this.state.id_punto_entrega

            let fecha_entrega = this.state.campos["fecha_entrega"]
            let dia = fecha_entrega.getDate();
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
                                    visible: true,
                                    titulo: "Error",
                                    mensaje: response,
                                });
                            })
                        return;
                    }
                    response.text().then(
                        function (response) {
                            _this.setState({
                                loading: false,
                                visible2: true,
                                formOk: true,
                                direccion: "",
                                lat: "",
                                lng: ""
                            })
                        });
                });

            return;

        }

        if (!this.state.campos["descripcion"] || !this.state.campos["provincia"] || !this.state.campos["localidad"] || !this.state.campos["direccion"]
            || !this.state.campos["cod_postal"] || !isDate(this.state.campos["fecha_entrega"])
            || !this.state.campos["fecha_entrega"] || !this.state.campos["hora_fin"] || !this.state.campos["hora_inicio"]) {

            this.setState({ visible: true, mensaje: "Campos incompletos o incorrectos", titulo: "Error" })

            return;
        }

        if (this.state.direccOk === false) {
            this.setState({ visible: true, mensaje: "Ingresaste una dirección incorrecta", titulo: "Error" });

            return;
        }

        Geocode.fromAddress(_this.state.direccion).then(
            response => {

                const { lat, lng } = response.results[0].geometry.location;

                _this.setState({ lat: lat, lng: lng });

                const path = "http://localhost:3000/redAgro/subir_punto_entrega?id_productor=";

                let fecha_entrega = this.state.campos["fecha_entrega"]
                let dia = fecha_entrega.getDate();
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
                        "cod_postal": this.state.campos["cod_postal"],
                        "latitud": this.state.lat,
                        "longitud": this.state.lng
                    }),
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            response.text().then(
                                function (response) {
                                    _this.setState({
                                        visible: true,
                                        titulo: "Error",
                                        mensaje: response,
                                    });
                                })
                            return;
                        }
                        response.text().then(
                            function (response) {

                                _this.setState({ id_punto_entrega: response, visible2: true, formOk: true, direccion: "", lat: "", lng: "" })

                            });
                    });
            },
            error => {

                _this.setState({
                    visible: true,
                    titulo: "Error",
                    mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                });
                return;
            }
        );
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
            <div className="container">
                <div className="titulosPrincipales">Nuevo punto de entrega</div>
                <div className="formularioPuntoEntrega">
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Nombre
                            </Form.Label>
                            <Form.Control
                                id="descripcion"
                                type="titulo"
                                placeholder="Ingresá el nombre con el que vas a identificar a este punto de entrega"
                                value={this.state.campos["descripcion"]}
                                onChange={(e) => this.detectarCambiosDescripcion(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Ubicación
                        </Form.Label>
                            <input
                                ref={this.autocompleteInput}
                                id="autocomplete"
                                placeholder="Ingresá la dirección de tu punto de entrega"
                                name="direccion_entrega"
                                disabled={this.state.disabled2}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                País
                        </Form.Label>
                            <input
                                name="pais"
                                disabled="true"
                                value={this.state.campos["pais"]}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Provincia
                        </Form.Label>
                            <input
                                name="provincia"
                                value={this.state.campos["provincia"]}
                                disabled={this.state.disabled}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Localidad
                        </Form.Label>
                            <input
                                name="localidad"
                                value={this.state.campos["localidad"]}
                                disabled={this.state.disabled}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Dirección
                            </Form.Label>
                            <input
                                name="direccion"
                                value={this.state.campos["direccion"]}
                                disabled={this.state.disabled}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Código postal
                            </Form.Label>
                            <input
                                name="cod_postal"
                                value={this.state.campos["cod_postal"]}
                                disabled={this.state.disabled}
                                className="inputAutocomplete"
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Fecha de entrega
                            </Form.Label>
                            <DatePickerInput
                                className="fecha_entrega"
                                name="fecha_entrega"
                                displayFormat='DD/MM/YYYY'
                                minDate={minDate}
                                onChange={(e) => this.cambiosFecha(e)}
                                value={this.state.campos["fecha_entrega"]}
                            />
                        </Form.Group>
                    </div>
                    <div className="inputs">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Horario de entrega
                            </Form.Label>
                            <div>
                                <TimeField
                                    className="hora_inicio"
                                    name="hora_inicio"
                                    value={this.state.campos["hora_inicio"]}
                                    onChange={(event, valor) => this.cambiosHora(valor, "hora_inicio")}
                                    style={{ width: 100 }}
                                />
                                a
                                <TimeField
                                    className="hora_fin"
                                    name="hora_fin"
                                    value={this.state.campos["hora_fin"]}
                                    onChange={(event, valor) => this.cambiosHora(valor, "hora_fin")}
                                    style={{ width: 100 }}
                                />
                                hs
                            </div>
                        </Form.Group>
                    </div>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" onClick={() => this.validarFormulario()}>Guardar</Button>
                    </div>
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
                            <h1>{this.state.titulo}</h1>
                            <p>{this.state.mensaje}</p>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.visible2}
                        width="450"
                        height="220"
                        effect="fadeInUp"
                    >
                        <div>
                            <h1>Punto de entrega guardado</h1>
                            <p>¿Vas a estar en el mismo lugar en otra fecha? agendala!</p>
                            <Button variant="light" onClick={() => this.closeModal()}>Salir</Button>
                            <Button variant="success" onClick={() => this.closeModalSi()}>Agendar</Button>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(NuevoPuntoEntrega);