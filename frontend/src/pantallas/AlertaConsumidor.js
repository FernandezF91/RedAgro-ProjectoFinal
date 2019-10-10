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
            selectedRadioOptionProducto: "",
            disabledProducto: true,
            selectedRadioOptionResumen: "",
            disabledResumen: true,
            selectedRadioOptionCambio: "",
            disabledCambio: true,
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
    }

    componentDidMount() {
        var path = "http://localhost:3000/redAgro/obtenerConfiguracionAlertas?id_usuario=" + this.state.id_consumidor;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    seleccionados: {
                        
                    },
                    loading: false
                });
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

    handleCheckChangeModificacion(e) {
        if (e.target.checked === true) {
            this.setState({
                disabledModificacion: false,
                selectedRadioOptionModificacion: "En el momento"
            });
        } else {
            this.setState({
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
                disabledProducto: false,
                selectedRadioOptionProducto: "En el momento"
            });
        } else {
            this.setState({
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
                disabledResumen: false,
                selectedRadioOptionResumen: "En el momento"
            });
        } else {
            this.setState({
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
                disabledCambio: false,
                selectedRadioOptionCambio: "En el momento"
            });
        } else {
            this.setState({
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

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        //  Chequear como lo guardo
    };

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
                                            <h5>Se aplicaron los cambios!</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-exclamation-circle iconoModalError" />
                                            <br />
                                            <br />
                                            <h5>Ups! Ocurrio un error! </h5>
                                            <h6>Por favor, intenta nuevamente</h6>
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