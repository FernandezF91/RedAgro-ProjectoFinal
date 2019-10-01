import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AlertaConsumidor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id_consumidor,
            //Acá debería estar trayendo la opción que haya guardado
            selectedRadioOption: "Nunca"
        };

        this.handleCheckChange = this.handleCheckChange.bind(this)

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })

    }

    handleRadioChange = changeEvent => {
        this.setState({
            selectedRadioOption: changeEvent.target.value
        });
    };

    handleCheckChange(e) {
        this.setState({
            [e.target.name]: e.target.checked
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        //  Chequear como lo guardo
    };

    render() {
        return (
            <div className="container">
                <div className="titulosPrincipales">Alertas</div>
                <form onSubmit={this.handleFormSubmit}>

                    <div className="radioButtons">
                        <h5>Notificarme:</h5>
                        <label class="radio-inline">
                            <input type="radio"
                                value="radio1"
                                checked={this.state.selectedRadioOption === "radio1"}
                                onChange={this.handleRadioChange}
                                className="radio-button-input radioPrimero"
                            />
                            Nunca
                            </label>
                        <label class="radio-inline">
                            <input type="radio"
                                value="radio2"
                                checked={this.state.selectedRadioOption === "radio2"}
                                onChange={this.handleRadioChange}
                                className="radio-button-input radio"
                            />
                            Diariamente
                            </label>
                        <label class="radio-inline">
                            <input type="radio"
                                value="radio3"
                                checked={this.state.selectedRadioOption === "radio3"}
                                onChange={this.handleRadioChange}
                                className="radio-button-input radio"
                            />
                            Semanalmente
                            </label>
                    </div>
                    <br />
                    <div className="checkboxes">
                        <h5>Alertarme sobre:</h5>
                        <label class="checkbox-inline">
                            <input type="checkbox"
                                value="check1"
                                checked={this.state.selectedCheckOption}
                                onChange={this.handleCheckChange}
                                className="checkbox-input checkbox"
                            />
                            Modificaciones en reservas realizadas
                            </label>
                        <br />
                        <label class="checkbox-inline">
                            <input type="checkbox"
                                value="check2"
                                checked={this.state.selectedCheckOption}
                                onChange={this.handleCheckChange}
                                className="checkbox-input checkbox"
                            />
                            Productos de interés
                        </label>
                        <br />
                        <label class="checkbox-inline">
                            <input type="checkbox"
                                value="check3"
                                checked={this.state.selectedCheckOption}
                                onChange={this.handleCheckChange}
                                className="checkbox-input checkbox"
                            />
                            Resumen de reservas vía correo electrónico
                        </label>
                        <br />
                        <label class="checkbox-inline">
                            <input type="checkbox"
                                value="check4"
                                checked={this.state.selectedCheckOption}
                                onChange={this.handleCheckChange}
                                className="checkbox-input checkbox"
                            />
                            Cambio de estado en una reserva vía correo electrónico
                        </label>
                    </div>
                </form>
                <div className="botones">
                    <Button variant="success" className="botonAtras" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                    <Button variant="success" type="submit" className="botonCrear" onClick={this.handleFormSubmit}>Guardar</Button>
                </div>
            </div>
        );
    };
}

export default AlertaConsumidor;