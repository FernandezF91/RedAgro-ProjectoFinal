import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import NumberFormat from 'react-number-format';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCarousel, MDBCarouselItem, MDBCarouselInner, MDBCardImage, MDBContainer } from "mdbreact";

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
            resultadoRequestProductos: 0,
            productosDePreferencia: [],
            paginaActual: 1,
            productosPerPage: 3,
            tamañoListado: 3,
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.mostrarReservas = this.mostrarReservas.bind(this);
        this.generarMensajeReservas = this.generarMensajeReservas.bind(this);
        this.generarProductosDePreferencia = this.generarProductosDePreferencia.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: { id: this.state.id_usuario }
        })
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
        var path_usuario = "http://localhost:3000/redAgro/obtenerCantidadReservasDisponiblesConsumidor?id_consumidor=" + _this.state.id_usuario;

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

        var path = "http://localhost:3000/redAgro/preferencias/obtenerProductos?id=" + _this.state.id_usuario;
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
                (this.state.cantidadReservasDisponibles === 0) ? (
                    <h4 className="textoMiCuenta"> No tenes reservas disponibles para retirar!</h4>
                ) : (
                        (this.state.cantidadReservasDisponibles === 1) ? (
                            <h4 className="textoMiCuenta"> Tenes {this.state.cantidadReservasDisponibles} reserva disponible para retirar. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito"> reservas</span>!</h4>
                        ) : (
                                <h4 className="textoMiCuenta"> Tenes {this.state.cantidadReservasDisponibles} reservas disponibles para retirar. Para más detalle, consulta tus <span onClick={this.mostrarReservas} className="linkBox cursorManito"> reservas</span>!</h4>
                            )
                    )
            ) : (
                    <h4 className="textoMiCuenta"> Ups! Ocurrió un error al obtener las reservas pendientes. Reintentá en unos minutos!</h4>
                )
        ]
        return mensaje;
    }

    generarProductosAMostrar = (item) => {
        return (
            <MDBCol md="4" key={item.id}>
                <MDBCard className="mb-2">
                    <MDBCardImage
                        className="imagenesBusqueda"
                        src={"data:" + item.imagenes[0].tipo_contenido + ";base64," + item.imagenes[0].image}
                        alt="ImagenBusqueda"
                        overlay="white-slight"
                        height="150x" width="auto" />

                    <MDBCardBody className="text-center">
                        <h6 className="grey-text">{item.tipo}</h6>
                        <MDBCardTitle>
                            <strong className="dark-grey-text">{item.titulo}</strong>
                        </MDBCardTitle>
                        <MDBCardText>
                            <strong className="float-center">
                                {
                                    (item.oferta === null || item.oferta === undefined) ?
                                        <div>
                                            <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                        </div>
                                        :
                                        (item.oferta.activo) ?
                                            <div title="Producto en oferta!">
                                                <strike>
                                                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                </strike>
                                                <br />
                                                <NumberFormat value={item.precio - item.precio * item.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                            </div>
                                            :
                                            <div>
                                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                            </div>
                                }
                            </strong>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }

    generarProductosDePreferencia(listadoProductos) {
        if (listadoProductos.length > 0) {
            return (

                listadoProductos.length > 0 ?
                    <MDBContainer>
                        <MDBCarousel activeItem={1} length={listadoProductos.length} slide={true} showControls={true} showIndicators={true} multiItem>
                            <MDBCarouselInner>
                                {
                                    listadoProductos.map((itemLista, index) => (
                                        <MDBCarouselItem itemId={index + 1}>
                                            <MDBRow>
                                                {
                                                    itemLista.map((item) => (
                                                        this.generarProductosAMostrar(item)
                                                    ))
                                                }
                                            </MDBRow>
                                        </MDBCarouselItem>
                                    ))
                                }
                            </MDBCarouselInner>
                        </MDBCarousel>

                    </MDBContainer>
                    : ''

            )
        }
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
                {this.generarProductosDePreferencia(lista)}
            </div>
        );
    };
}
export default MiCuenta;