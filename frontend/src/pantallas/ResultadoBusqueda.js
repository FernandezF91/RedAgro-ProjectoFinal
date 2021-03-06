import '../diseños/EstilosGenerales.css';
import '../diseños/ResultadoBusqueda.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import Busqueda from './Busqueda';
import Paginacion from './Paginacion';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT } from 'butter-toast';
import { MDBRow, MDBCol } from 'mdbreact';

const tamañosListado = [
    { label: "9", value: "9" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id_usuario,
            resultadoBusqueda: [],
            datosParaReserva: [],
            tamañoListado: 9, //Valor predeterminado
            paginaActual: 1,
            defaultListado: [{ label: "9", value: "9" }],
            loading: true,
            resultadoRequest: 0,
            showModal: false,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.mostrarDetalleProducto = this.mostrarDetalleProducto.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: {
                id: this.state.id,
            }
        })
    }

    mostrarDetalleProducto = (productoSeleccionado) => {
        this.props.handleDetalleProducto(productoSeleccionado.id);
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

        if (typeof (busqueda) === "number") {
            var path = "http://" + window.$ip + ":3000/redAgro/obtenerProductosProductorBusqueda?id=" + busqueda;
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
                                    cantidad: 1,
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
            return
        }

        var path2 = "http://" + window.$ip + ":3000/redAgro/obtenerProductos?busqueda=" + busqueda;
        fetch(path2)
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
                                cantidad: 1,
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

    restarProducto = (position) => {
        let resultadoDeBusqueda = this.state.resultadoBusqueda;
        var productoSeleccionado = resultadoDeBusqueda[position];
        if ((parseInt(productoSeleccionado.cantidad) - 1) > 0) {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) - 1).toString(),
            ]
            this.setState({ resultadoDeBusqueda: productoActualizado });
        }
    }

    sumarProducto = (position) => {
        let resultadoDeBusqueda = this.state.resultadoBusqueda;
        var productoSeleccionado = resultadoDeBusqueda[position];
        let productoActualizado = [
            ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) + 1).toString(),
        ]
        this.setState({ productoSeleccionado: productoActualizado });
    }

    agregarAlCarrito = (position) => {
        let resultadoDeBusqueda = this.state.resultadoBusqueda;
        let productosSeleccionados = this.props.productosSeleccionados;
        var producto = resultadoDeBusqueda[position];

        if (this.validarMismoProductor(producto) === true) {
            //Chequeo que la cantidad ingresada sea mayor al stock
            if (parseInt(producto.cantidad) > parseInt(producto.stock)) {
                ButterToast.raise({
                    content: <Cinnamon.Crunch scheme={Cinnamon.Crunch.SCHEME_RED}
                        content={() => <div className="mensajeToast">No está disponible el stock seleccionado. Reintentá disminuyendo la cantidad ;)</div>}
                        title="Cultura Verde"
                        icon={<i className="fa fa-shopping-cart iconoToast" />}
                    />
                });
            } else {

                if (parseInt(producto.cantidad) > 0) {

                    let chequeoProducto = productosSeleccionados.filter(function (item) {
                        return item.id === producto.id;
                    });

                    if (chequeoProducto.length > 0) {
                        var index = productosSeleccionados.findIndex(item => item.id === chequeoProducto[0].id);
                        let nuevaLista = [
                            ...productosSeleccionados.slice(0, index),
                            chequeoProducto[0],
                            ...productosSeleccionados.slice(index + 1)
                        ];
                        productosSeleccionados = nuevaLista;
                    }
                    else {
                        productosSeleccionados.push(producto);
                    }
                    this.setState(this.actualizarPropsSeleccionados(productosSeleccionados));
                    ButterToast.raise({
                        content: <Cinnamon.Crunch scheme={Cinnamon.Crunch.SCHEME_GREEN}
                            content={() => <div className="mensajeToast">Se agregó un nuevo producto a tu carrito</div>}
                            title="Cultura Verde"
                            icon={<i className="fa fa-shopping-cart iconoToast" />}
                        />
                    });
                }

            }
        } else {
            ButterToast.raise({
                content: <Cinnamon.Crunch scheme={Cinnamon.Crunch.SCHEME_RED}
                    content={() => <div className="mensajeToast">En tu carrito hay productos de otro productor. Por favor, finalizá tu reserva para continuar</div>}
                    title="Cultura Verde"
                    icon={<i className="fa fa-shopping-cart iconoToast" />}
                />
            });
        }
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        actualizarListado.push(tamaño);
        if (tamaño.value === "Todo") {
            this.setState({ tamañoListado: this.state.resultadoBusqueda.length })
        } else {
            this.setState({ tamañoListado: tamaño.value })
        }
        this.setState({ defaultListado: actualizarListado });
    }

    actualizarPropsSeleccionados(productosSeleccionados) {
        this.props.actualizarProductosSeleccionados(productosSeleccionados);
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    validarMismoProductor(productoSeleccionado) {
        var respuesta;
        this.props.productosSeleccionados.forEach(item => {
            if (item.productor.id !== productoSeleccionado.productor.id) {
                respuesta = false;
            }
        });

        if (respuesta === undefined) {
            respuesta = true;
        }
        return respuesta;
    }

    render() {
        const { resultadoBusqueda, paginaActual, tamañoListado, defaultListado } = this.state;
        const numberOfPages = Math.ceil(resultadoBusqueda.length / tamañoListado);
        const indexOfLastReserva = paginaActual * tamañoListado;
        const indexOfFirstReserva = indexOfLastReserva - tamañoListado;
        const listadoBusqueda = resultadoBusqueda.slice(indexOfFirstReserva, indexOfLastReserva);

        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
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
                <div className="titulosPrincipales">Resultados</div>
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
                <Busqueda
                    listaDeProductos={listadoBusqueda}
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
                <div className="toastPosicion">
                    <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
                </div>
            </div>
        )
    }
}
export default ResultadoBusqueda;