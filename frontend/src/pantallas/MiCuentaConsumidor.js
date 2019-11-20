import '../diseños/EstilosGenerales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CarouselProductos from './CarouselProductos'
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

class MiCuenta extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_usuario: this.props.id_usuario,
            rolUsuario: this.props.rolUsuario,
            usuario: this.props.usuario,
            loading: true,
            cantidadReservasDisponibles: "0",
            resultadoRequestReservas: 0,
            resultadoRequestProductos: 0,
            productosDePreferencia: [],
            paginaActual: 1,
            productosPerPage: 3,
            tamañoListado: 3,
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.mostrarReservas = this.mostrarReservas.bind(this);
        this.generarMensajeReservas = this.generarMensajeReservas.bind(this);
        this.mostrarDetalleProducto = this.mostrarDetalleProducto.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: { id: this.state.id_usuario }
        })
    }

    mostrarDetalleProducto = (productoSeleccionado) => {
        this.props.handleDetalleProducto(productoSeleccionado.id);
    }

    mostrarReservas() {
        this.props.history.push({
            pathname: '/principalConsumidores/ListadoReservas',
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
        var path_usuario = "http://" + window.$ip + ":3000/redAgro/obtenerCantidadReservasDisponiblesConsumidor?id_consumidor=" + _this.state.id_usuario;

        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestReservas: response.status
                })
                if (response.status === 200) {
                    response.text().then(
                        function (response) {
                            if (response > 0) {
                                _this.setState({
                                    cantidadReservasDisponibles: response
                                });
                            }
                            else {
                                _this.setState({
                                    cantidadReservasDisponibles: "0"
                                });
                            }
                            _this.setState({
                                loading: false
                            });
                        })
                } else {
                    console.log("Ocurrió un problema al obtener las reservas.");
                }
            })
    }

    componentDidMount() {
        var _this = this;
        _this.setState({
            loading: true
        });

        _this.obtenerProductosDePreferencia();
        _this.obtenerMensajeReservasPendiente();

        _this.setState({
            loading: false
        });
    }

    obtenerProductosDePreferencia() {
        var _this = this;
        _this.setState({
            loading: true
        });

        var path = "http://" + window.$ip + ":3000/redAgro/preferencias/obtenerProductos?id=" + _this.state.id_usuario;
        fetch(path)
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        _this.setState({
                            resultadoRequestProductos: response.status
                        });
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                        _this.setState({
                            loading: false,
                            resultadoRequestProductos: response.status
                        });
                    }
                } catch (error) {
                    console.log(error);
                    _this.setState({
                        loading: false,
                        resultadoRequestProductos: response.status
                    });
                }
            })
            .then(data => {
                if (data !== undefined) {
                    _this.setState({
                        productosDePreferencia: data.map((item) => {
                            return {
                                id: item.id,
                                categoria: item.producto.categoria,
                                tipo: item.producto.tipo,
                                titulo: item.titulo,
                                descripcion: item.descripcion,
                                stock: item.stock,
                                tipoDeUnidad: item.unidad_venta,
                                tipoDeProduccion: item.tipo_produccion,
                                precio: item.precio,
                                fechaDeVencimiento: item.fecha_vencimiento,
                                tiempoDePreparacion: item.tiempo_preparacion,
                                contenido: item.contenido,
                                imagenes: item.imagenes,
                                oferta: item.oferta
                            }
                        }),
                        loading: false,
                    })
                } else {
                    _this.setState({ loading: false });
                }
            })
    }

    generarMensajeReservas() {
        const mensaje = [
            this.state.resultadoRequestReservas === 200 ? (
                (this.state.cantidadReservasDisponibles === "0") ? (
                    <h4 className="textoMiCuenta"> No tenés reservas disponibles para retirar!</h4>
                ) : (
                        (this.state.cantidadReservasDisponibles === "1") ? (
                            <h4 className="textoMiCuenta"> Tenés {this.state.cantidadReservasDisponibles} reserva disponible para retirar. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito"> reservas</span>!</h4>
                        ) : (
                                <h4 className="textoMiCuenta"> Tenés {this.state.cantidadReservasDisponibles} reservas disponibles para retirar. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito"> reservas</span>!</h4>
                            )
                    )
            ) : (
                    <h4 className="textoMiCuenta"> Ups! Ocurrió un error al obtener las reservas pendientes. Por favor, reintentá en unos minutos!</h4>
                )
        ]
        return mensaje;
    }

    crearListaDeProductos(numberOfPages, productosPerPage, productos) {
        let nuevaLista = [];
        var indexOfLastProducto, indexOfFirstProducto;
        for (let i = 1; i <= numberOfPages; i++) {
            indexOfLastProducto = i * productosPerPage;
            indexOfFirstProducto = indexOfLastProducto - productosPerPage;
            let lista = productos.slice(indexOfFirstProducto, indexOfLastProducto)
            nuevaLista.push(lista);
        }
        return nuevaLista;
    }

    render() {
        const nombres = this.state.usuario.nombre;
        const { productosPerPage, productosDePreferencia } = this.state;
        const numberOfPages = Math.ceil(productosDePreferencia.length / productosPerPage);
        let lista = this.crearListaDeProductos(numberOfPages, productosPerPage, productosDePreferencia);

        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />;

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
                    <MDBCol>
                        {
                            (lista.length > 0) ?
                                <MDBCard>
                                    <MDBCardBody className="text-center">
                                        <MDBCardTitle className="margenTitulosResumen">
                                            <i className="fas fa-shopping-basket iconoTituloResumen" />
                                            <span className="textoTituloResumen"> Preferencias</span>
                                        </MDBCardTitle>
                                        <MDBCardText className="resumenCentrado">
                                            <CarouselProductos
                                                listadoProductos={lista}
                                                mostrarDetalleProducto={this.mostrarDetalleProducto} />
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                                :
                                <MDBCard className="boxSinPreferencias">
                                    <i className="fas fa-shopping-basket iconoBoxGris" />
                                    <h4 className="textoMiCuentaPreferencias"> Ups! No se encontraron productos publicados acordes a tus preferencias!</h4>
                                </MDBCard>
                        }
                    </MDBCol>
                </MDBRow>
            </div>
        );
    };
}
export default MiCuenta;