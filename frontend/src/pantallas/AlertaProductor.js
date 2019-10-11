import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';

class AlertaProductor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_productor,
            alertas: [],
            selectedRadioOptionNuevas: "",
            disabledNuevas: true,
            selectedRadioOptionActualizacion: "",
            disabledActualizacion: true,
            resultadoRequest: 0,
            showModal: false,
            loading: true
        };

        this.handleCheckChangeNuevas = this.handleCheckChangeNuevas.bind(this);
        this.handleRadioChangeNuevas = this.handleRadioChangeNuevas.bind(this);
        this.handleCheckChangeActualizacion = this.handleCheckChangeActualizacion.bind(this);
        this.handleRadioChangeActualizacion = this.handleRadioChangeActualizacion.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    componentDidMount() {
        var _this = this;
        var path = "http://localhost:3000/redAgro/obtenerConfiguracionAlertas?id_usuario=" + _this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                return response.json();
            })
            .then(data => {
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

    handleCheckChangeNuevas(e) {
        if (e.target.checked === true) {
            this.setState({
                disabledNuevas: false,
                selectedRadioOptionNuevas: "En el momento"
            });
        } else {
            this.setState({
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

    handleCheckChangeActualizacion(e) {
        if (e.target.checked === true) {
            this.setState({
                disabledActualizacion: false,
                selectedRadioOptionActualizacion: "En el momento"
            });
        } else {
            this.setState({
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

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        console.log(this.state.selectedRadioOption);
        console.log(this.state.checkNuevas);
        console.log(this.state.checkActualizacion);
    };

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }
    
    cargoAlerta(item) {
        console.log(item.alerta);
        if (item.alerta === "Nuevas reservas") {
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
                                    checked={this.state.checkNuevas}
                                    onChange={this.handleCheckChangeNuevas}
                                    className="checkbox-input checkbox"
                                />
                                Nuevas reservas
                            </label>
                        </h5>
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
                        <br />
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
                        <br />
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
                    </div>
                    <hr />
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
                        <br />
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
                        <br />
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
                    </div>
                </form >
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
            </div >
        );
    };
}

export default AlertaProductor;