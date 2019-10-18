import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';

class AlertaConsumidor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id_consumidor,
            selectedRadioOptionModificacion: "",
            disabledModificacion: true,
            checkModificacion: false,
            selectedRadioOptionProducto: "",
            disabledProducto: true,
            checkProductos: false,
            selectedRadioOptionResumen: "",
            disabledResumen: true,
            checkResumen: false,
            selectedRadioOptionCambio: "",
            disabledCambio: true,
            checkCambio: false,
            mensaje: "",
            resultadoRequest: 0,
            showModal: false,
            loading: true,
        };

        this.handleCheckChangeModificacion = this.handleCheckChangeModificacion.bind(this);
        this.handleRadioChangeModificacion = this.handleRadioChangeModificacion.bind(this);
        this.handleCheckChangeProducto = this.handleCheckChangeProducto.bind(this);
        this.handleRadioChangeProducto = this.handleRadioChangeProducto.bind(this);
        this.handleCheckChangeResumen = this.handleCheckChangeResumen.bind(this);
        this.handleRadioChangeResumen = this.handleRadioChangeResumen.bind(this);
        this.handleCheckChangeCambio = this.handleCheckChangeCambio.bind(this);
        this.handleRadioChangeCambio = this.handleRadioChangeCambio.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    componentDidMount() {
        var _this = this;
        var path = "http://localhost:3000/redAgro/obtenerConfiguracionAlertas?id_usuario=" + this.state.id;
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
            pathname: '/principalConsumidores/MiCuenta',
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

    handleCheckChangeModificacion(e) {
        if (e.target.checked === true) {
            this.setState({
                checkModificacion: true,
                disabledModificacion: false,
                selectedRadioOptionModificacion: "En el momento"
            });
        } else {
            this.setState({
                checkModificacion: false,
                disabledModificacion: true,
                selectedRadioOptionModificacion: ""
            });
        }

    };

    handleRadioChangeModificacion = changeEvent => {
        this.setState({
            selectedRadioOptionModificacion: changeEvent.target.value,
        });
    };

    handleCheckChangeProducto(e) {
        if (e.target.checked === true) {
            this.setState({
                checkProductos: true,
                disabledProducto: false,
                selectedRadioOptionProducto: "En el momento"
            });
        } else {
            this.setState({
                checkProductos: false,
                disabledProducto: true,
                selectedRadioOptionProducto: ""
            });
        }

    };

    handleRadioChangeProducto = changeEvent => {
        this.setState({
            selectedRadioOptionProducto: changeEvent.target.value,
        });
    };

    handleCheckChangeResumen(e) {
        if (e.target.checked === true) {
            this.setState({
                checkResumen: true,
                disabledResumen: false,
                selectedRadioOptionResumen: "En el momento"
            });
        } else {
            this.setState({
                checkResumen: false,
                disabledResumen: true,
                selectedRadioOptionResumen: ""
            });
        }

    };

    handleRadioChangeResumen = changeEvent => {
        this.setState({
            selectedRadioOptionResumen: changeEvent.target.value,
        });
    };

    handleCheckChangeCambio(e) {
        if (e.target.checked === true) {
            this.setState({
                checkCambio: true,
                disabledCambio: false,
                selectedRadioOptionCambio: "En el momento"
            });
        } else {
            this.setState({
                checkCambio: false,
                disabledCambio: true,
                selectedRadioOptionCambio: ""
            });
        }

    };

    handleRadioChangeCambio = changeEvent => {
        this.setState({
            selectedRadioOptionCambio: changeEvent.target.value,
        });
    };

    generarListadoAlertas(configuraciones) {
        if (this.state.checkModificacion) {
            configuraciones.push({
                alertaNombre: "Modificaciones en reservas realizadas",
                frecuencia: this.state.selectedRadioOptionModificacion
            });
        }
        if (this.state.checkProductos) {
            configuraciones.push({
                alertaNombre: "Productos de interés",
                frecuencia: this.state.selectedRadioOptionProducto
            });
        }
        if (this.state.checkResumen) {
            configuraciones.push({
                alertaNombre: "Resumen de reservas vía correo electrónico",
                frecuencia: this.state.selectedRadioOptionResumen
            });
        }
        if (this.state.checkCambio) {
            configuraciones.push({
                alertaNombre: "Cambio de estado en una reserva vía correo electrónico",
                frecuencia: this.state.selectedRadioOptionCambio
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

        var path = "http://localhost:3000/redAgro/guardarConfiguracionAlertas?id_usuario=" + this.state.id;
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
        if (item.alerta === "Modificaciones en reservas realizadas") {
            this.setState({
                checkModificacion: true,
                selectedRadioOptionModificacion: item.frecuencia,
                disabledModificacion: false
            });
        }

        if (item.alerta === "Productos de interés") {
            this.setState({
                checkProductos: true,
                selectedRadioOptionProducto: item.frecuencia,
                disabledProducto: false
            });
        }

        if (item.alerta === "Resumen de reservas vía correo electrónico") {
            this.setState({
                checkResumen: true,
                selectedRadioOptionResumen: item.frecuencia,
                disabledResumen: false
            });
        }

        if (item.alerta === "Cambio de estado en una reserva vía correo electrónico") {
            this.setState({
                checkCambio: true,
                selectedRadioOptionCambio: item.frecuencia,
                disabledCambio: false
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
                <form onSubmit={this.handleFormSubmit}>
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkModificacion}
                                    onChange={this.handleCheckChangeModificacion}
                                    className="checkbox-input checkbox"
                                />
                                Modificaciones en reservas realizadas
                            </label>
                        </h5>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="En el momento"
                                checked={this.state.selectedRadioOptionModificacion === "En el momento"}
                                onChange={this.handleRadioChangeModificacion}
                                className="radio-button-input radio"
                                disabled={this.state.disabledModificacion}
                            />
                            En el momento
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Diariamente"
                                checked={this.state.selectedRadioOptionModificacion === "Diariamente"}
                                onChange={this.handleRadioChangeModificacion}
                                className="radio-button-input radio"
                                disabled={this.state.disabledModificacion}
                            />
                            Diariamente
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Semanalmente"
                                checked={this.state.selectedRadioOptionModificacion === "Semanalmente"}
                                onChange={this.handleRadioChangeModificacion}
                                className="radio-button-input radio"
                                disabled={this.state.disabledModificacion}
                            />
                            Semanalmente
                        </label>
                    </div>
                    <hr />
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkProductos}
                                    onChange={this.handleCheckChangeProducto}
                                    className="checkbox-input checkbox"
                                />
                                Productos de interés
                                </label>
                        </h5>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="En el momento"
                                checked={this.state.selectedRadioOptionProducto === "En el momento"}
                                onChange={this.handleRadioChangeProducto}
                                className="radio-button-input radio"
                                disabled={this.state.disabledProducto}
                            />
                            En el momento
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Diariamente"
                                checked={this.state.selectedRadioOptionProducto === "Diariamente"}
                                onChange={this.handleRadioChangeProducto}
                                className="radio-button-input radio"
                                disabled={this.state.disabledProducto}
                            />
                            Diariamente
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Semanalmente"
                                checked={this.state.selectedRadioOptionProducto === "Semanalmente"}
                                onChange={this.handleRadioChangeProducto}
                                className="radio-button-input radio"
                                disabled={this.state.disabledProducto}
                            />
                            Semanalmente
                        </label>
                    </div>
                    <hr />
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkResumen}
                                    onChange={this.handleCheckChangeResumen}
                                    className="checkbox-input checkbox"
                                />
                                Resumen de reservas vía correo electrónico
                                </label>
                        </h5>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="En el momento"
                                checked={this.state.selectedRadioOptionResumen === "En el momento"}
                                onChange={this.handleRadioChangeResumen}
                                className="radio-button-input radio"
                                disabled={this.state.disabledResumen}
                            />
                            En el momento
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Diariamente"
                                checked={this.state.selectedRadioOptionResumen === "Diariamente"}
                                onChange={this.handleRadioChangeResumen}
                                className="radio-button-input radio"
                                disabled={this.state.disabledResumen}
                            />
                            Diariamente
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Semanalmente"
                                checked={this.state.selectedRadioOptionResumen === "Semanalmente"}
                                onChange={this.handleRadioChangeResumen}
                                className="radio-button-input radio"
                                disabled={this.state.disabledResumen}
                            />
                            Semanalmente
                        </label>
                    </div>
                    <hr />
                    <div className="radioButtons" align="left">
                        <h5>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="check2"
                                    checked={this.state.checkCambio}
                                    onChange={this.handleCheckChangeCambio}
                                    className="checkbox-input checkbox"
                                />
                                Cambio de estado en una reserva vía correo electrónico
                                </label>
                        </h5>
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="En el momento"
                                checked={this.state.selectedRadioOptionCambio === "En el momento"}
                                onChange={this.handleRadioChangeCambio}
                                className="radio-button-input radio"
                                disabled={this.state.disabledCambio}
                            />
                            En el momento
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Diariamente"
                                checked={this.state.selectedRadioOptionCambio === "Diariamente"}
                                onChange={this.handleRadioChangeCambio}
                                className="radio-button-input radio"
                                disabled={this.state.disabledCambio}
                            />
                            Diariamente
                        </label>
                        <br />
                        <label className="radio-inline">
                            <input
                                type="radio"
                                value="Semanalmente"
                                checked={this.state.selectedRadioOptionCambio === "Semanalmente"}
                                onChange={this.handleRadioChangeCambio}
                                className="radio-button-input radio"
                                disabled={this.state.disabledCambio}
                            />
                            Semanalmente
                        </label>
                    </div>
                </form>
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

export default AlertaConsumidor;