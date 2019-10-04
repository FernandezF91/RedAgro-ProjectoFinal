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
            selector: {
                fechasEntrega: [],
                puntosEntrega: [],
            },
            seleccionado: {
                fechaEntrega: [],
                puntoEntrega: [],
            },
            selectedRadioButtonRetiro: "radio1",
            resultadoRequest: 0,
            loading: true,
        }

        this.actualizarPuntoEntrega = this.actualizarPuntoEntrega.bind(this);
        this.actualizarFechaEntrega = this.actualizarFechaEntrega.bind(this);
        this.obtenerFechasEntrega = this.obtenerFechasEntrega.bind(this);
        
    }

    componentDidMount() {
        var path = "http://localhost:3000/redAgro/puntos_productor_activos?id=1"// + this.props.productosSeleccionados[0].productor.id;
        fetch(path)
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        this.setState({
                            resultadoRequest: response.status
                        });
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                        this.setState({
                            loading: false,
                            resultadoRequest: response.status
                        });
                    }
                } catch (error) {
                    console.log(error);
                    this.setState({
                        loading: false,
                        resultadoRequest: response.status
                    });
                }
            }).then(data => {
                if (data !== undefined) {
                    this.setState({
                        puntosEntrega: data,
                        selector: {
                            puntosEntrega: data.map(item => {
                                return {
                                    label: item.direccion + ", " + item.cod_postal + ". " + item.localidad + ", " + item.provincia,
                                    value: item.id
                                }
                            }),
                        },
                        loading: false
                    })
                }
            })
    }

    obtenerFechasEntrega(idPtoEntrega) {
        var fechaPreparación = this.calculoFechaMinimaEntrega();
        var path = "http://localhost:3000/redAgro/fechas_punto_entrega?id_punto_entrega=" + idPtoEntrega;
        fetch(path)
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        this.setState({
                            resultadoRequest: response.status
                        });
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                        this.setState({
                            loading: false,
                            resultadoRequest: response.status
                        });
                    }
                } catch (error) {
                    console.log(error);
                    this.setState({
                        loading: false,
                        resultadoRequest: response.status
                    });
                }
            }).then(data => {
                if (data !== undefined) {
                    this.setState({
                        puntosEntrega: data,
                        selector: {
                            fechasEntrega: data.map(item => {
                                var fecha = new Date(item.fecha);
                                return {
                                    label: fecha.getDate().toString() + "/" + (fecha.getMonth() + 1).toString() + "/" + fecha.getFullYear().toString(),
                                    value: item.id
                                }
                                // if (fecha.getTime() >= fechaPreparación.getTime()) {
                                   
                                // }
                            })
                        },
                        loading: false
                    })
                }
            })
    }

    calculoFechaMinimaEntrega() {
        let fecha = new Date();
        var tiempoPreparacion = [];
        this.props.productosSeleccionados.forEach(item => {
            tiempoPreparacion.push(item.tiempoDePreparacion);
        });
        tiempoPreparacion.sort((a, b) => (b - a));
        fecha.setDate(fecha.getDate() + tiempoPreparacion[0]);
        return fecha;
    }

    actualizarPuntoEntrega(newPunto) {
        var nuevoPuntoEntrega = []
        nuevoPuntoEntrega.push(newPunto);
        this.obtenerFechasEntrega(newPunto.value);
        this.setState({ seleccionado: { puntoEntrega: nuevoPuntoEntrega } });
    }

    actualizarFechaEntrega(newFecha) {
        var nuevaFechaEntrega = []
        nuevaFechaEntrega.push(newFecha);
        this.setState({ seleccionado: { fechaEntrega: nuevaFechaEntrega } });
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
                                puntosEntrega={this.state.puntosEntrega}
                                selector={this.state.selector}
                                seleccionado={this.state.seleccionado}
                                puntoEntregaSeleccionado={this.state.puntoEntregaSeleccionado}
                                actualizarPuntoEntrega={this.actualizarPuntoEntrega}
                                actualizarFechaEntrega={this.actualizarFechaEntrega} />
                            : ''
                    }
                    <div>
                        <Button
                            variant="light"
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
                </MuiThemeProvider>
            </div>
        )
    }
}
export default Checkout;