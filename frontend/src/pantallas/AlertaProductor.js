import '../diseños/estilosGlobales.css';
import '../diseños/Alertas.css';
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


class AlertaProductor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//Acá debería estar trayendo la opción que haya guardado
			selectedRadioOption: "Nunca",
			id:this.props.id_productor
		};

		this.handleCheckChange = this.handleCheckChange.bind(this);
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
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

	componentDidMount(){

alert(this.state.id);

	}

	mostrarPantallaPrincipal(){

		this.props.history.push({
	pathname:'/principalProductores',
	state:{id:this.state.id}
	})

	}

	render() {

		return (
			<div className="container">
			<div className="titulosPrincipales">Alertas</div>
				<form onSubmit={this.handleFormSubmit}>
					
					<div className="radioButtons" align="left">	
					
					<h5>Notificarme:</h5>

						<label className="radio1">
							<input type="radio"
								value="radio1"
								checked={this.state.selectedRadioOption === "radio1"}
								onChange={this.handleRadioChange}
								className="radio-button-input"
							/> Nunca
						</label>

						<label className="radio2">
							<input type="radio"
								value="radio2"
								checked={this.state.selectedRadioOption === "radio2"}
								onChange={this.handleRadioChange}
								className="radio-button-input"
							/> Diariamente
						</label>

						<label className="radio3">
							<input type="radio"
								value="radio3"
								checked={this.state.selectedRadioOption === "radio3"}
								onChange={this.handleRadioChange}
								className="radio-button-input"
							/> Semanalmente
						</label>
					</div>

					<div className="checkboxes">

					<h5>Alertarme sobre:</h5>	
										
						<div className="checkbox">
							<label>
								<input type="checkbox"
									value="check1"
									checked={this.state.selectedCheckOption}
									onChange={this.handleCheckChange}
									className="checkbox-input"
								/> Nuevas reservas
						</label>
						</div>

						<div className="checkbox">
							<label>
								<input type="checkbox"
									value="check2"
									checked={this.state.selectedCheckOption}
									onChange={this.handleCheckChange}
									className="checkbox-input"
								/> Actualización de reservas
						</label>
						</div>

					</div>
				</form>
				<div className="botones">
								<div className="botonAtras">
									<Button variant="success" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
								</div>
								<div className="botonCrear">
									<Button variant="success" type="submit" onClick={this.handleFormSubmit}>Guardar</Button>
								</div>
					</div>
			</div>
		);
	};
}

export default AlertaProductor;