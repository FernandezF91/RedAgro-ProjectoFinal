import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBRow, MDBCol } from 'mdbreact';

class AlertaProductor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_productor,
            selectedRadioOptionNuevas: "",
            disabledNuevas: true,
            checkNuevas: false,
            selectedRadioOptionActualizacion: "",
            disabledActualizacion: true,
            checkActualizacion: false,
            selectedRadioOptionMensajes: "",
            disabledMensajes: true,
            checkMensajes: false,
            mensaje: "",
            resultadoRequest: 0,
            showModal: false,
            loading: true
        };

        this.handleCheckChangeNuevas = this.handleCheckChangeNuevas.bind(this);
        this.handleRadioChangeNuevas = this.handleRadioChangeNuevas.bind(this);
        this.handleCheckChangeActualizacion = this.handleCheckChangeActualizacion.bind(this);
        this.handleRadioChangeActualizacion = this.handleRadioChangeActualizacion.bind(this);
        this.handleCheckChangeMensajes = this.handleCheckChangeMensajes.bind(this);
        this.handleRadioChangeMensajes = this.handleRadioChangeMensajes.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    componentDidMount() {
        var _this = this;
        var path = "redAgro/obtenerConfiguracionAlertas?id_usuario=" + _this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
            })
            .then(data => {
                if (data !== void (0)) {
                    _this.setState({
                        alertas: data.map((item) => {
                            return {
                                id: item.id,
                                frecuencia: item.frecuencia.frecuencia,
                                alerta: item.alerta.nombre
                            }
                        }),
                        loading: false
                    })
                    const { alertas } = this.state;
                    let body = [];
                    alertas.forEach(item => {
                        body.push(this.cargoAlerta(item));
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    handleCheckChangeNuevas(e) {
        if (e.target.checked === true) {
            this.setState({
                checkNuevas: true,
                disabledNuevas: false,
                selectedRadioOptionNuevas: "En el momento"
            });
        } else {
            this.setState({
                checkNuevas: false,
                disabledNuevas: true,
                selectedRadioOptionNuevas: ""
            });
        }
    };

    handleRadioChangeNuevas = changeEvent => {
        this.setState({
            selectedRadioOptionNuevas: changeEvent.target.value,
        });
    };

    handleCheckChangeMensajes(e) {
        if (e.target.checked === true) {
            this.setState({
                checkMensajes: true,
                disabledMensajes: false,
                selectedRadioOptionMensajes: "En el momento"
            });
        } else {
            this.setState({
                checkMensajes: false,
                disabledMensajes: true,
                selectedRadioOptionMensajes: ""
            });
        }
    };

    handleRadioChangeMensajes = changeEvent => {
        this.setState({
            selectedRadioOptionMensajes: changeEvent.target.value,
        });
    };

    handleCheckChangeActualizacion(e) {
        if (e.target.checked === true) {
            this.setState({
                checkActualizacion: true,
                disabledActualizacion: false,
                selectedRadioOptionActualizacion: "En el momento"
            });
        } else {
            this.setState({
                checkActualizacion: false,
                disabledActualizacion: true,
                selectedRadioOptionActualizacion: ""
            });
        }
    };

    handleRadioChangeActualizacion = changeEvent => {
        this.setState({
            selectedRadioOptionActualizacion: changeEvent.target.value,
        });
    };

    generarListadoAlertas(configuraciones) {
        if (this.state.checkNuevas) {
            configuraciones.push({
                alertaNombre: "Nuevas calificaciones",
                frecuencia: this.state.selectedRadioOptionNuevas
            });
        }
        if (this.state.checkActualizacion) {
            configuraciones.push({
                alertaNombre: "Actualización de reservas",
                frecuencia: this.state.selectedRadioOptionActualizacion
            });
        }
        if (this.state.checkMensajes) {
            configuraciones.push({
                alertaNombre: "Nuevos mensajes",
                frecuencia: this.state.selectedRadioOptionMensajes
            });
        }
        return configuraciones;
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        var _this = this;
        var configuraciones = [];
        configuraciones = _this.generarListadoAlertas(configuraciones);

        this.setState({
            loading: true
        })

        var path = "redAgro/guardarConfiguracionAlertas?id_usuario=" + this.state.id;
        fetch(path, {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(configuraciones)
        })
            .then(function (response) {
                if (response.status !== 504) {
                    response.text().then(
                        function (response) {
                            _this.setState({
                                loading: false,
                                showModal: true,
                                mensaje: response
                            })
                        }
                    )
                    _this.setState({
                        resultadoRequest: response.status,
                        loading: false
                    });
                    return;
                } else {
                    _this.setState({
                        mensaje: "Ocurrió un error al guardar las alertas. Por favor, reintentá en unos minutos.",
                        resultadoRequest: response.status,
                        showModal: true,
                        loading: false
                    });
                    return;
                }

            })
    };

    cargoAlerta(item) {
        if (item.alerta === "Nuevas calificaciones") {
            this.setState({
                checkNuevas: true,
                selectedRadioOptionNuevas: item.frecuencia,
                disabledNuevas: false
            });
        }

        if (item.alerta === "Actualización de reservas") {
            this.setState({
                checkActualizacion: true,
                selectedRadioOptionActualizacion: item.frecuencia,
                disabledActualizacion: false
            });
        }

        if (item.alerta === "Nuevos mensajes") {
            this.setState({
                checkMensajes: true,
                selectedRadioOptionMensajes: item.frecuencia,
                disabledMensajes: false
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
            <div className="container">
                <div className="titulosPrincipales">Alertas</div>
                <br />
                <div className="descripcionPagina">
                    <h5>Configurá las alertas que recibiras por mail:</h5>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkActualizacion}
                                    onChange={this.handleCheckChangeActualizacion}
                                    className="checkbox-input checkbox"
                                />
                                Actualización de reservas
                            </label>
                        </h5>
                        <MDBRow>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="En el momento"
                                        checked={this.state.selectedRadioOptionActualizacion === "En el momento"}
                                        onChange={this.handleRadioChangeActualizacion}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledActualizacion}
                                    />
                                    En el momento
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Diariamente"
                                        checked={this.state.selectedRadioOptionActualizacion === "Diariamente"}
                                        onChange={this.handleRadioChangeActualizacion}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledActualizacion}
                                    />
                                    Diariamente
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Semanalmente"
                                        checked={this.state.selectedRadioOptionActualizacion === "Semanalmente"}
                                        onChange={this.handleRadioChangeActualizacion}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledActualizacion}
                                    />
                                    Semanalmente
                                </label>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <br />
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkMensajes}
                                    onChange={this.handleCheckChangeMensajes}
                                    className="checkbox-input checkbox"
                                />
                                Nuevos mensajes
                            </label>
                        </h5>
                        <MDBRow>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="En el momento"
                                        checked={this.state.selectedRadioOptionMensajes === "En el momento"}
                                        onChange={this.handleRadioChangeMensajes}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledMensajes}
                                    />
                                    En el momento
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Diariamente"
                                        checked={this.state.selectedRadioOptionMensajes === "Diariamente"}
                                        onChange={this.handleRadioChangeMensajes}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledMensajes}
                                    />
                                    Diariamente
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Semanalmente"
                                        checked={this.state.selectedRadioOptionMensajes === "Semanalmente"}
                                        onChange={this.handleRadioChangeMensajes}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledMensajes}
                                    />
                                    Semanalmente
                                </label>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <br />
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkNuevas}
                                    onChange={this.handleCheckChangeNuevas}
                                    className="checkbox-input checkbox"
                                />
                                Nuevas calificaciones
                            </label>
                        </h5>
                        <MDBRow>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="En el momento"
                                        checked={this.state.selectedRadioOptionNuevas === "En el momento"}
                                        onChange={this.handleRadioChangeNuevas}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledNuevas}
                                    />
                                    En el momento
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Diariamente"
                                        checked={this.state.selectedRadioOptionNuevas === "Diariamente"}
                                        onChange={this.handleRadioChangeNuevas}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledNuevas}
                                    />
                                    Diariamente
                                </label>
                            </MDBCol>
                            <MDBCol>
                                <label className="radio-inline">
                                    <input
                                        type="radio"
                                        value="Semanalmente"
                                        checked={this.state.selectedRadioOptionNuevas === "Semanalmente"}
                                        onChange={this.handleRadioChangeNuevas}
                                        className="radio-button-input radio"
                                        disabled={this.state.disabledNuevas}
                                    />
                                    Semanalmente
                                </label>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </form>
                <br />
                <div className="botones">
                    <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                    <Button variant="success" type="submit" onClick={this.handleFormSubmit}>Guardar</Button>
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

export default AlertaProductor;