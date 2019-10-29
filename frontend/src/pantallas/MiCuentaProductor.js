import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ResumenCalificaciones from "./principales/ResumenCalificaciones";
import ResumenFechasEntrega from "./principales/ResumenFechasEntrega";
import ResumenProductosProductor from "./principales/ResumenProductosProductor";
import moment from 'moment';

class MiCuenta extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_usuario: this.props.id_usuario,
            rolUsuario: this.props.rolUsuario,
            usuario: this.props.usuario,
            loading: true,
            cantidadReservasDisponibles: 0,
            resultadoRequestReservas: 0,
            cantidadEstrellas: 0,
            listaCalificaciones: [],
            resultadoRequestCalificaciones: 0,
            listaFechasEntrega: [],
            resultadoRequestFechasEntrega: 0,
            listaProductosProductor: [],
            resultadoRequestProductosProductor: 0,
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.mostrarReservas = this.mostrarReservas.bind(this);
        this.generarMensajeReservas = this.generarMensajeReservas.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id_usuario }
        })
    }

    mostrarReservas() {
        this.props.history.push({
            pathname: '/principalProductores/ListadoReservas',
            state: {
                id_usuario: this.state.id_usuario,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    obtenerMensajeReservasPendiente() {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path_usuario = "http://localhost:3000/redAgro/obtenerCantidadReservasPendientesProductor?id_productor=" + _this.state.id_usuario;

        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestReservas: response.status
                })
                if (response.status === 200) {
                    return JSON.stringify(response);
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
            })
            .then(data => {
                if (data > 0) {
                    _this.setState({
                        cantidadReservasDisponibles: data
                    });
                }
                else {
                    _this.setState({
                        cantidadReservasDisponibles: 0
                    });
                }
                _this.setState({
                    loading: false
                });
            })
    }

    obtenerPromedioCalificaciones() {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path_usuario = "http://localhost:3000/redAgro/obtenerPromedioCalificaciones?id_productor=" + _this.state.id_usuario;

        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    response.text().then(
                        function (response) {
                            if (!isNaN(response) && response > 0) {
                                _this.setState({
                                    cantidadEstrellas: response
                                });
                            }
                            else {
                                _this.setState({
                                    cantidadEstrellas: 0
                                });
                            }
                        });
                } else {
                    _this.setState({
                        cantidadEstrellas: -1
                    });
                }
            })
    }

    obtenerListadoCalificaciones() {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path = "http://localhost:3000/redAgro/obtenerUltimasCalificacionesPorProductor?id_productor=" + _this.state.id_usuario;

        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestCalificaciones: response.status
                })
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
                        listaCalificaciones: data.map((item) => {
                            return {
                                id: item.id,
                                fecha: moment(item.fechaCalificacion, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                                valor: item.valor,
                                comentario: item.comentario
                            }
                        }),
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    obtenerListadoFechasEntrega() {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path = "http://localhost:3000/redAgro/obtenerEntregasProximoMes?id_productor=" + _this.state.id_usuario;

        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestFechasEntrega: response.status
                })
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
                        listaFechasEntrega: data.map((item) => {
                            return {
                                fecha: moment(item.fechaEntrega, 'DD-MM-YYYY').format('DD/MM/YYYY'),
                                localidad: item.localidad,
                                direccion: item.direccion
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    obtenerProductosARevisar() {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path = "http://localhost:3000/redAgro/obtenerProductosARevisar?id_productor=" + _this.state.id_usuario;

        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestProductosProductor: response.status
                })
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
                        listaProductosProductor: data.map((item) => {
                            var fecha = "-";
                            if (item.fecha_vencimiento !== null) {
                                fecha = moment(item.fecha_vencimiento).format('DD/MM/YYYY')
                            }
                            return {
                                titulo: item.titulo,
                                stock: item.stock,
                                fecha: fecha
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    componentDidMount() {
        var _this = this;
        _this.setState({
            loading: true
        });

        _this.obtenerMensajeReservasPendiente();
        _this.obtenerPromedioCalificaciones();
        _this.obtenerListadoCalificaciones();
        _this.obtenerListadoFechasEntrega();
        _this.obtenerProductosARevisar();

        _this.setState({
            loading: false
        });
    }

    generarMensajeReservas() {
        const mensaje = [
            this.state.resultadoRequestReservas === 200 ? (
                (this.state.cantidadReservasDisponibles === 0) ? (
                    <h4 className="textoMiCuenta"> No tenes reservas pendientes!</h4>
                ) : (
                        (this.state.cantidadReservasDisponibles === 1) ? (
                            <h4 className="textoMiCuenta"> Tenes {this.state.cantidadReservasDisponibles} reserva pendiente. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito"> reservas</span>!</h4>
                        ) : (
                                <h4 className="textoMiCuenta"> Tenes {this.state.cantidadReservasDisponibles} reservas pendientes. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito">reservas</span>!</h4>
                            )
                    )
            ) : (
                    <h4 className="textoMiCuenta"> Ups! Ocurrió un error al obtener las reservas pendientes. Reintentá en unos minutos!</h4>
                )
        ]
        return mensaje;
    }

    generoItemCalificaciones(item) {
        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>{item.fecha}</td>
                <td>{item.valor}</td>
                <td>
                    <div className="overflowTexto" title={item.comentario}>
                        {item.comentario}
                    </div>
                </td>
            </tr>
        ];
        return itemRows;
    }

    generoItemFechas(item) {
        const itemRows = [
            <tr key={"row-data-" + item.fecha}>
                <td>{item.fecha}</td>
                <td>{item.localidad}</td>
                <td>{item.direccion}</td>
            </tr>
        ];
        return itemRows;
    }

    generoItemProducto(item) {
        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>
                    <div className="overflowTexto" title={item.titulo}>
                        {item.titulo}
                    </div>
                </td>
                <td>{item.stock}</td>
                <td>{item.fecha}</td>
            </tr>
        ];
        return itemRows;
    }

    render() {
        const nombres = this.state.usuario.nombre;
        const { listaCalificaciones, listaFechasEntrega, listaProductosProductor } = this.state;
        let bodyCalificaciones = [];
        listaCalificaciones.forEach(item => {
            bodyCalificaciones.push(this.generoItemCalificaciones(item));
        })
        let bodyFechas = [];
        listaFechasEntrega.forEach(item => {
            bodyFechas.push(this.generoItemFechas(item));
        })
        let bodyProductos = [];
        listaProductosProductor.forEach(item => {
            bodyProductos.push(this.generoItemProducto(item));
        })

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
            <div>
                <div className="titulosPrincipales tituloMiCuenta">Hola, <strong>{nombres}</strong></div>
                <MDBRow>
                    <MDBCol>
                        <MDBCard className="mb-4 boxMiCuenta">
                            <i className="fas fa-tasks iconoBox" />
                            {this.generarMensajeReservas()}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className="col-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h4><i className="fas fa-store" /> Productos a revisar</h4>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <ResumenProductosProductor
                                        listadoProductosProductor={bodyProductos}
                                        resultadoRequest={this.state.resultadoRequestCalificaciones}
                                    />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className="col-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h4><i className="fas fa-map-marker-alt" /> Próximas fechas de entrega</h4>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <ResumenFechasEntrega
                                        listadoPuntosEntrega={bodyFechas}
                                        resultadoRequest={this.state.resultadoRequestFechasEntrega}
                                        vistaProductor={true}
                                    />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className="col-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h4><i className="fas fa-star" /> Calificaciones</h4>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <ResumenCalificaciones
                                        cantidadEstrellas={this.state.cantidadEstrellas}
                                        listadoCalificaciones={bodyCalificaciones}
                                        resultadoRequest={this.state.resultadoRequestProductosProductor}
                                    />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    };
}
export default MiCuenta;