import '../diseños/EstilosGenerales.css';
import '../diseños/ResultadoBusqueda.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import Busqueda from './Busqueda';
import Paginacion from './Paginacion';
import { MDBModal, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';

const tamañosListado = [
    { label: "9", value: "9" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];
var defaultListado = [
    { label: "9", value: "9" },
];

class ResultadoBusquedaSinLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultadoBusqueda: [],
            tamañoListado: 9,
            paginaActual: 1,
            loading: true,
            resultadoRequest: 0,
            showModal: false,
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.mostrarDetalleProducto = this.mostrarDetalleProducto.bind(this);
    }

    nextPage = (pageNumber) => {
        this.setState({ paginaActual: pageNumber });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.busqueda !== this.props.busqueda) {
            this.setState({
                resultadoBusqueda: [],
                loading: true
            });
            this.realizarBusqueda(this.props.busqueda)
        }
    }

    componentDidMount() {
        if (this.state.resultadoBusqueda.length === 0) {
            this.realizarBusqueda(this.props.busqueda)
        }
    }

    realizarBusqueda(busqueda) {
        var path = "http://"+window.$ip+":3000/redAgro/obtenerProductos?busqueda=" + busqueda;
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
            })
            .then(data => {
                if (data !== undefined) {
                    this.setState({
                        resultadoBusqueda: data.map((item) => {
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
                                cantidad: 0,
                                productor: {
                                    id: item.productor.id,
                                    razon_social: item.productor.razon_social,
                                    nombre: item.productor.usuario.nombre,
                                    apellido: item.productor.usuario.apellido,
                                    telefono: item.productor.usuario.telefono,
                                },
                                imagenes: item.imagenes,
                                oferta: item.oferta
                            }
                        }),
                        loading: false
                    })
                }
            })
    }

    mostrarDetalleProducto = (productoSeleccionado) => {
        this.setState({
            showModal: true
        });
    }

    restarProducto = (position) => {
        this.setState({
            showModal: true
        });
    }

    sumarProducto = (position) => {
        this.setState({
            showModal: true
        });
    }

    agregarAlCarrito = (position) => {
        this.setState({
            showModal: true
        });
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        if (tamaño.value === "Todo") {
            this.setState({
                tamañoListado: this.state.resultadoBusqueda.length
            })
        } else {
            this.setState({
                tamañoListado: tamaño.value
            })
        }
        actualizarListado.push(tamaño);
        defaultListado = actualizarListado;
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        const { resultadoBusqueda, paginaActual, tamañoListado } = this.state;
        const numberOfPages = Math.ceil(resultadoBusqueda.length / tamañoListado);
        const indexOfLastReserva = paginaActual * tamañoListado;
        const indexOfFirstReserva = indexOfLastReserva - tamañoListado;
        const listadoBusqueda = resultadoBusqueda.slice(indexOfFirstReserva, indexOfLastReserva);

        if (this.state.loading) return (
            <div className="divLoaderWhitesmoke">
                <Loader
                    type="Grid"
                    color="#28A745"
                    height={150}
                    width={150}
                    className="loader loaderWhitesmoke"
                />
            </div>
        )

        if (this.state.resultadoRequest !== 200) return (
            <div className="notFound">
                <i className="fas fa-exclamation-circle iconoGrandeError" />
                <br />
                <br />
                <h5>Ups! Ocurrió un error! </h5>
                <h6 className="grey-text">Por favor, intenta nuevamente</h6>
            </div>
        )

        return (
            <div>
                <div className="titulosPrincipales">Novedades</div>
                {
                    resultadoBusqueda.length > 0 &&
                    <MDBRow>
                        <MDBCol md="2" className="align-center cantidadDeBusquedaDiv">
                            {
                                (resultadoBusqueda.length === 1) ?
                                    <span className="cantidadDeBusqueda">{resultadoBusqueda.length} resultado</span>
                                    :
                                    <span className="cantidadDeBusqueda">{resultadoBusqueda.length} resultados</span>
                            }
                        </MDBCol>
                        <MDBCol className="align-center">
                            <div className="opcionesCantidadBusqueda">
                                <span>Resultados por página</span>
                                <Select
                                    className="cantidadItemsListado"
                                    value={defaultListado}
                                    options={tamañosListado}
                                    onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                            </div>
                        </MDBCol>
                    </MDBRow>
                }
                <Busqueda listaDeProductos={listadoBusqueda}
                    sumarProducto={this.sumarProducto}
                    restarProducto={this.restarProducto}
                    agregarAlCarrito={this.agregarAlCarrito}
                    mostrarDetalleProducto={this.mostrarDetalleProducto} />
                {
                    resultadoBusqueda.length > tamañoListado ?
                        <Paginacion
                            pages={numberOfPages}
                            nextPage={this.nextPage}
                            currentPage={this.state.paginaActual} />
                        : ''
                }
                {
                    <MDBModal isOpen={this.state.showModal} centered size="sm">
                        <div className="modalMargenes" tabIndex="0">
                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                            <br />
                            <div className="modal-body">
                                <i className="fas fa-shopping-cart iconoModal" />
                                <br />
                                <br />
                                <h5> Hola!
                                <br />
                                    Para continuar tenés que iniciar sesión...
                                </h5>
                                <br />
                                <h6 className="grey-text">
                                    Podes hacerlo por <Link to={'/login'}>acá</Link>
                                </h6>
                            </div>
                        </div>
                    </MDBModal>
                }
            </div>
        )
    }
}
export default ResultadoBusquedaSinLogin;