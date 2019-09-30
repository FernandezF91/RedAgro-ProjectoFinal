import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import PasosCheckout from './PasosCheckout'
import _ from 'lodash';
import '../diseños/estilosGlobales.css';
import '../diseños/Checkout.css'

const pasos = [
	'Confirmá tu datos personales',
	'Seleccioná un Punto de Entrega',
	'Elegí una fecha de Retiro',
	'Resumen de Reserva'
];

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
			setActiveStep: 0,
			puntosEntrega: [],
		}
	}

	componentDidMount() {
		//Busco los puntos de entrega de los productores seleccionados
		var productores = [];
		var productoresSinRepetidos = [];
		this.props.productosSeleccionados.forEach(item => {
			productores.push(item.productor.id);
		});
		productores.sort();
		productoresSinRepetidos = [... new Set(productores)];

		if (productoresSinRepetidos.length > 0) {
			var path = "http://localhost:3000/redAgro/ptos_entrega_productores?productores=" + productoresSinRepetidos;
			fetch(path, {
				method: "GET",
				// headers: { 'Content-type': 'application/json;' },
				// body: JSON.stringify(productoresSinRepetidos)
			})
				.catch(err => console.error(err))
				.then(response => { return response.json(); })
				.then(data => {
					this.setState({
						puntosEntrega: data
					});
				})
		}
	}

	handleNext = () => {
		this.setState({ activeStep: (this.state.activeStep + 1) });
	}

	handleBack = () => {
		this.setState({ activeStep: (this.state.activeStep - 1) });
	}

	handleReset = () => {
		this.setState({
			activeStep: 0,
			setActiveStep: 0
		})
	};

	datosPersonalesHandler = event => {
		event.preventDefault();
		event.target.className += " was-validated";
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	getTotalReserva(productosSeleccionados) {
		return _.sumBy(productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
	}

	render() {
		const activeStep = this.state.activeStep;
		return (
			<MDBContainer className="containerPrincipal">
				<div className="titulosPrincipales">Finalizar la Reserva</div>
				<Stepper className="pasos" activeStep={activeStep} orientation="vertical">
					{pasos.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>

							<StepContent>
								<PasosCheckout indexPasos={activeStep}
									usuario={this.props.user}
									datosPersonalesHandler={this.datosPersonalesHandler} />
								<div>
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={this.handleBack}>
											Atras
                  						</Button>
										<Button
											variant="success"
											type="submit"
											onClick={this.handleNext}>
											{activeStep === pasos.length - 1 ? 'Finalizar' : 'Continuar'}
										</Button>
									</div>
								</div>
							</StepContent>

						</Step>
					))}
				</Stepper>
			</MDBContainer>
		)
	}
}
export default Checkout;