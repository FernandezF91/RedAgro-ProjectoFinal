import '../diseños/estilosGlobales.css';
import '../diseños/ResultadoBusqueda.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import Busqueda from './Busqueda';
import Paginacion from './Paginacion';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT } from 'butter-toast';
import { isUndefined } from 'util';

const tamañosListado = [
    { label: "9", value: "9" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];
var defaultListado = [
    { label: "9", value: "9" },
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
            loading: true,
            resultadoRequest: 0
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: {
                id: this.state.id,
            }
        })
    }

    nextPage = (pageNumber) => {
        this.setState({ paginaActual: pageNumber });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.busqueda !== this.props.busqueda) {
            this.setState({ resultadoBusqueda: [] });
            this.realizarBusqueda(this.props.busqueda)
        }
    }

    componentDidMount() {
        if (this.state.resultadoBusqueda.length === 0) {
            this.realizarBusqueda(this.props.busqueda)
        }
    }

    realizarBusqueda(busqueda) {


        if(busqueda>0){
        var path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=" + busqueda;
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
                            }
                        }),
                        loading: false
                    })
                }
            })

            return
        }

        var path = "http://localhost:3000/redAgro/obtenerProductosProductos?id=" + busqueda;
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
                            }
                        }),
                        loading: false
                    })
                }
            })

    }

    restarProducto = (position) => {
        //Falta la validación y actualización por stock
        let resultadoDeBusqueda = this.state.resultadoBusqueda;
        var productoSeleccionado = resultadoDeBusqueda[position];
        if ((parseInt(productoSeleccionado.cantidad) - 1) >= 0) {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) - 1).toString(),
            ]
            this.setState({ resultadoDeBusqueda: productoActualizado });
        }
    }

    sumarProducto = (position) => {
        //Falta la validación y actualización por stock
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
                        content={() => <div class="mensajeToast">Se agrego un nuevo producto a tu carrito</div>}
                        title="CulturaVerde"
                        icon={<i class="fa fa-shopping-cart iconoToast" />}
                    />
                });
            }

        } else {
            this.restarProducto(position);
            console.log("Cambie el chango");
        }
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        if (tamaño.value === "Todo") {
            this.setState({ tamañoListado: this.state.resultadoBusqueda.length })
        } else {
            this.setState({ tamañoListado: tamaño.value })
        }
        actualizarListado.push(tamaño);
        defaultListado = actualizarListado;
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

    validarStock(producto) {
        var path = "http://localhost:3000/redAgro/validarStock?id_prod_productor=" + producto.id + "&cantidad=" + (parseInt(producto.cantidad) + 1);
        fetch(
            path, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response;
                }
            })
    }

    render() {
        const { resultadoBusqueda, paginaActual, tamañoListado } = this.state;
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
                <h5>Ups! Ocurrio un error! </h5>
                <h6>Por favor, intenta nuevamente</h6>
            </div>
        )

        return (
            <div>
                <div className="titulosPrincipales">Resultado Búsqueda</div>
                {
                    resultadoBusqueda.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="tituloCantidad">Resultados por página</span>
                            <Select className="cantidadProductos"
                                value={defaultListado}
                                options={tamañosListado}
                                onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                        </div>
                        : ''
                }
                <Busqueda listaDeProductos={listadoBusqueda}
                    sumarProducto={this.sumarProducto}
                    restarProducto={this.restarProducto}
                    agregarAlCarrito={this.agregarAlCarrito} />
                {
                    resultadoBusqueda.length > tamañoListado ?
                        <Paginacion
                            pages={numberOfPages}
                            nextPage={this.nextPage}
                            currentPage={this.state.paginaActual} />
                        : ''
                }
                <div class="toastPosicion">
                    <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} /></div>
            </div>
        )
    }
}
export default ResultadoBusqueda;