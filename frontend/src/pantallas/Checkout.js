import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { Button } from 'react-bootstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PasosCheckout from './PasosCheckout'
import _ from 'lodash';
import '../diseños/estilosGlobales.css';
import '../diseños/Checkout.css'

const pasos = [
    'Confirmá tu datos personales',
    'Elegí una forma de retiro',
    'Resumen de la reserva'
];

const theme = createMuiTheme({
    overrides: {
        MuiStepIcon: {
            root: {
                '&$active': {
                    color: '#28a745',
                },
                '&$completed': {
                    color: '#28a745',
                }
            },
            text: {
                fontWeight: "bold",
            }
        },
        MuiTypography: {
            body1: {
                fontSize: 18,
            }
        },
        MuiStepLabel: {
            label: {
                '&$active': {
                    fontWeight: 400,
                    alignContent: "center",
                },
                '&$completed': {
                    fontWeight: 400,
                    alignContent: "center",
                }
            }
        },
        MuiStepper: {
            root: {
                display: 'flex',
                padding: '50'
            }
        }
    }
});
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            setActiveStep: 0,
            puntosEntrega: [],
            selectedRadioButtonRetiro: "radio1",
        }
    }

    componentDidMount() {
        //Busco los puntos de entrega de los productores seleccionados
        var productores = [];
        var productoresSinRepetidos = [];
        var parametro = '';
        this.props.productosSeleccionados.forEach(item => {
            productores.push(item.productor.id);
        });
        productores.sort();
        productoresSinRepetidos = [... new Set(productores)];

        productoresSinRepetidos.forEach((item, index) => {
            if (index === 0) {
                parametro = parametro + "productores=" + item;
            } else {
                parametro = parametro + "&productores=" + item;
            }
        });

        if (productoresSinRepetidos.length > 0) {
            var path = "http://localhost:3000/redAgro/ptos_entrega_productores?" + parametro;
            fetch(path, {
                method: "GET",
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

    handleRadioRetiroChange = changeEvent => {
        this.setState({
            selectedRadioButtonRetiro: changeEvent.target.value
        });
    };

    getTotalReserva(productosSeleccionados) {
        return _.sumBy(productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
    }

    render() {
        const activeStep = this.state.activeStep;
        return (
            <div className="containerPrincipal">
                <div className="titulosPrincipales">Finalizar la Reserva</div>
                <MuiThemeProvider theme={theme}>
                    <Stepper alternativeLabel nonLinear activeStep={activeStep} >
                        {pasos.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {
                        activeStep <= pasos.length ?
                            <PasosCheckout indexPasos={activeStep}
                                usuario={this.props.user}
                                datosPersonalesHandler={this.datosPersonalesHandler}
                                selectedRadioButtonRetiro={this.state.selectedRadioButtonRetiro}
                                handleRadioRetiroChange={this.handleRadioRetiroChange}
                                productosSeleccionados={this.props.productosSeleccionados}
                                getTotalReserva={this.getTotalReserva}
                                puntosEntrega={this.state.puntosEntrega} />
                            : ''
                    }
                    <div>
                        <Button
                            variant="light"
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                        >Atras
                            </Button>
                        <Button
                            variant="success"
                            type="submit"
                            onClick={this.handleNext}>
                            {activeStep === pasos.length - 1 ? 'Finalizar' : 'Continuar'}
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default Checkout;