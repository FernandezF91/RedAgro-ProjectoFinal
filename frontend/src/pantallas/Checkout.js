import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MDBModal } from 'mdbreact';
import PasosCheckout from './PasosCheckout'
import moment from 'moment';
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
            body2: {
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
    },
    typography: {
        useNextVariants: true,
    }
});

const regularExp = {
    onlyLetters: /^[a-zA-Z\s]*$/,
    onlyNumbers: /^[0-9]+$/
}

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            setActiveStep: 0,
            puntosEntrega: [],
            fechasEntrega: [],
            selector: {
                fechasEntrega: [],
                puntosEntrega: [],
            },
            seleccionado: {
                puntoEntrega: [],
                fechaEntrega: [],
            },
            selectedRadioButtonRetiro: "radio1",
            datosPersonaRetiro: {
                checkbox: false,
                nombre: this.props.user.nombre,
                apellido: this.props.user.apellido,
                disabled: true,
            },
            datosReserva: {
                id: '',
                consumidor: { id: this.props.id_consumidor },
                productor: { id: this.props.productosSeleccionados[0].productor.id },
                punto_entrega: { id: '' },
                estado_reserva: { id: 1 },
                total_reserva: this.getTotalReserva(this.props.productosSeleccionados),
                persona_retiro: this.props.user.nombre + " " + this.props.user.apellido,
                forma_retiro: "Acuerda con Productor",
                fecha: '',
                detallesReserva: [],
            },
            resultadoRequest: 0,
            loading: true,
            titulo: '',
            mensaje: '',
            showModal: false,
        }

        this.actualizarPuntoEntrega = this.actualizarPuntoEntrega.bind(this);
        this.actualizarFechaEntrega = this.actualizarFechaEntrega.bind(this);
        this.obtenerFechasEntrega = this.obtenerFechasEntrega.bind(this);
        this.getTotalReserva = this.getTotalReserva.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.crearReserva = this.crearReserva.bind(this);
        this.handleCheckboxRetiro = this.handleCheckboxRetiro.bind(this);
        this.handleDatosPersonales = this.handleDatosPersonales.bind(this);
    }

    componentDidMount() {
        this.actualizarDetalleReserva();
        var fechaPreparación = this.calculoFechaMinimaEntrega();
        var path = "http://localhost:3000/redAgro/puntos_productor_activos?id=";
        path = path + this.props.productosSeleccionados[0].productor.id + "&fecha=" + moment(fechaPreparación).format("DD-MM-YYYY");
        fetch(path)
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        this.setState({
                            resultadoRequest: response.status,
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

    actualizarDetalleReserva() {
        var detalleDeReserva = this.props.productosSeleccionados.map(item => {
            return {
                id_reserva: '',
                id_producto: item.id,
                activo: true,
                cantidad: item.cantidad,
                precio_por_unidad: item.precio
            }
        })
        this.setState({
            datosReserva: {
                ...this.state.datosReserva,
                detallesReserva: detalleDeReserva
            }
        });
    }

    obtenerFechasEntrega(idPtoEntrega) {
        var fechaPreparación = this.calculoFechaMinimaEntrega();
        var path = "http://localhost:3000/redAgro/fechas_entrega/filtradasPor?id_punto_entrega=" + idPtoEntrega + "&fecha=" + moment(fechaPreparación).format("DD-MM-YYYY");
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
                        fechasEntrega: data,
                        selector: {
                            ...this.state.selector,
                            fechasEntrega: data.map(item => {
                                return {
                                    label: moment(item.fecha, 'DD-MM-YYYY').format("DD/MM/YYYY"),
                                    value: item.id,
                                }
                            })
                        },
                        loading: false
                    })
                }
            })
    }

    calculoFechaMinimaEntrega() {
        var tiempoPreparacion = [];
        this.props.productosSeleccionados.forEach(item => {
            tiempoPreparacion.push(item.tiempoDePreparacion);
        });
        tiempoPreparacion.sort((a, b) => (b - a));
        var fecha = moment().add(tiempoPreparacion[0], 'days');
        return fecha;
    }

    actualizarPuntoEntrega(newPunto) {
        var nuevoPuntoEntrega = []
        this.obtenerFechasEntrega(newPunto.value);
        nuevoPuntoEntrega.push(newPunto);
        this.setState({
            seleccionado: {
                ...this.state.seleccionado,
                puntoEntrega: nuevoPuntoEntrega,
            },
            datosReserva: {
                ...this.state.datosReserva,
                punto_entrega: { id: newPunto.value },
            }
        });
    }

    actualizarFechaEntrega(newFecha) {
        var nuevaFechaEntrega = []
        let fechasDeEntrega = this.state.fechasEntrega.filter(function (item) {
            return item.id === newFecha.value;
        });
        var fechaSeleccionada = moment(fechasDeEntrega[0].fecha, 'DD-MM-YYYY').format("YYYY-MM-DD");
        nuevaFechaEntrega.push(newFecha);
        this.setState({
            seleccionado: {
                ...this.state.seleccionado,
                fechaEntrega: nuevaFechaEntrega
            },
            datosReserva: {
                ...this.state.datosReserva,
                fecha: fechaSeleccionada,
            }
        });
    }

    handleNext = () => {
        switch (this.state.activeStep) {
            case 0: {
                if ((!this.state.datosPersonaRetiro.nombre) || (!this.state.datosPersonaRetiro.apellido) ||
                    (!regularExp.onlyLetters.test(this.state.datosPersonaRetiro.nombre)) || (!regularExp.onlyLetters.test(this.state.datosPersonaRetiro.apellido))) {
                    this.setState({
                        titulo: "Error",
                        mensaje: "Datos incompletos o incorrectos",
                        showModal: true,
                    });
                    return false;
                }
            }
            case 1: {
                if (this.state.selectedRadioButtonRetiro === "radio2") {
                    if (this.state.seleccionado.puntoEntrega.length === 0 || this.state.seleccionado.fechaEntrega.length === 0) {
                        this.setState({
                            titulo: "Error",
                            mensaje: "Por favor, complete los datos para la entrega",
                            showModal: true,
                        });
                        return false;
                    }
                }
            }
        }

        if (this.state.activeStep === pasos.length - 1) {
            this.crearReserva(this.state.datosReserva);
        }
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

    handleDatosPersonales = e => {
        if (e.target.name === "nombre") {
            this.setState({
                datosPersonaRetiro: {
                    ...this.state.datosPersonaRetiro,
                    nombre: e.target.value,
                }
            })
        }
        else {
            if (e.target.name === "apellido") {
                this.setState({
                    datosPersonaRetiro: {
                        ...this.state.datosPersonaRetiro,
                        apellido: e.target.value,
                    }
                })
            }
        }
    };

    handleCheckboxRetiro = e => {
        if (this.state.datosPersonaRetiro.disabled === true) {
            this.setState({
                datosPersonaRetiro: {
                    ...this.state.datosPersonaRetiro,
                    checkbox: e.target.checked,
                    disabled: false,
                }
            })
        }
        else {
            this.setState({
                datosPersonaRetiro: {
                    nombre: this.props.user.nombre,
                    apellido: this.props.user.apellido,
                    checkbox: e.target.checked,
                    disabled: true,
                }
            })
        }
    }

    handleRadioRetiroChange = changeEvent => {
        var forma;
        if (changeEvent.target.value === "radio1") {
            forma = "Acuerda con Productor";
        } else {
            forma = "Por punto de entrega";
        }
        this.setState({
            selectedRadioButtonRetiro: changeEvent.target.value,
            datosReserva: {
                ...this.state.datosReserva,
                forma_retiro: forma,
            }
        });
    };

    getTotalReserva(productosSeleccionados) {
        return _.sumBy(productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })

        if (this.state.resultadoRequest !== 200) {
            this.handleReset();
        }
    }

    crearReserva(datosReserva) {
        var path = "http://localhost:3000/redAgro/generarReserva";
        var _this = this;
        fetch(path, {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(datosReserva)
        })
            .then(function (response) {
                _this.setState({
                    loading: false,
                    showModal: true,
                    resultadoRequest: response.status
                })
                return;
            })
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
                        activeStep === pasos.length ?
                            <div>
                                {(this.state.showModal) &&
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
                                                        <h5>Reserva generada!</h5>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <i className="fas fa-exclamation-circle iconoModalError" />
                                                        <br />
                                                        <br />
                                                        <h5>Ups! Ocurrió un error! </h5>
                                                        <h6>Por favor, intenta nuevamente</h6>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </MDBModal>
                                }

                            </div>
                            :
                            <div>
                                <PasosCheckout
                                    indexPasos={activeStep}
                                    usuario={this.props.user}
                                    selector={this.state.selector}
                                    seleccionado={this.state.seleccionado}
                                    puntosEntrega={this.state.puntosEntrega}
                                    datosReserva={this.state.datosReserva}
                                    datosPersonaRetiro={this.state.datosPersonaRetiro}
                                    selectedRadioButtonRetiro={this.state.selectedRadioButtonRetiro}
                                    handleCheckboxRetiro={this.handleCheckboxRetiro}
                                    handleDatosPersonales={this.handleDatosPersonales}
                                    handleRadioRetiroChange={this.handleRadioRetiroChange}
                                    productosSeleccionados={this.props.productosSeleccionados}
                                    getTotalReserva={this.getTotalReserva}
                                    actualizarPuntoEntrega={this.actualizarPuntoEntrega}
                                    actualizarFechaEntrega={this.actualizarFechaEntrega} />

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
                    }
                </MuiThemeProvider>

            </div>
        )
    }
}
export default Checkout;