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
                        <input type="radio"
                            value="radio1"
                            checked={this.state.selectedRadioOption === "radio1"}
                            onChange={this.handleRadioChange}
                            className="radio-button-input radioPrimero"
                        />
                        <span>Nunca</span>
                        <input type="radio"
                            value="radio2"
                            checked={this.state.selectedRadioOption === "radio2"}
                            onChange={this.handleRadioChange}
                            className="radio-button-input radio"
                        />
                        <span>Diariamente</span>
                        <input type="radio"
                            value="radio3"
                            checked={this.state.selectedRadioOption === "radio3"}
                            onChange={this.handleRadioChange}
                            className="radio-button-input radio"
                        />
                        <span>Semanalmente</span>
                    </div>
                    <br />
                    <div className="checkboxes">
                        <h5>Alertarme sobre:</h5>
                        <input type="checkbox"
                            value="check1"
                            checked={this.state.selectedCheckOption}
                            onChange={this.handleCheckChange}
                            className="checkbox-input checkbox"
                        />
                        <span>Modificaciones en reservas realizadas</span>
                        <br />
                        <input type="checkbox"
                            value="check2"
                            checked={this.state.selectedCheckOption}
                            onChange={this.handleCheckChange}
                            className="checkbox-input checkbox"
                        />
                        <span>Productos de interés</span>
                        <br />
                        <input type="checkbox"
                            value="check3"
                            checked={this.state.selectedCheckOption}
                            onChange={this.handleCheckChange}
                            className="checkbox-input checkbox"
                        />
                        <span>Resumen de reservas vía correo electrónico</span>
                        <br />
                        <input type="checkbox"
                            value="check4"
                            checked={this.state.selectedCheckOption}
                            onChange={this.handleCheckChange}
                            className="checkbox-input checkbox"
                        />
                        <span>Cambio de estado en una reserva vía correo electrónico</span>
                    </div>
                </form>
                <div className="botones">
                    <Button variant="success" type="submit" className="botonCrear" onClick={this.handleFormSubmit}>Guardar</Button>
                    <Button variant="success" className="botonAtras" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                </div>
            </div>
        );
    };
}

export default AlertaConsumidor;