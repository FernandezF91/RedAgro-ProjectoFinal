import '../diseños/estilosGlobales.css';
import '../diseños/ResultadoBusqueda.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import Busqueda from './Busqueda';
import Paginacion from './Paginacion';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT } from 'butter-toast';

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
            tamañoListado: 9, //Valor predeterminado
            paginaActual: 1,
            imagenes: [],
            loading: true
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
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
        var path = "http://localhost:3000/redAgro/obtenerProductos?titulo=" + busqueda;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    resultadoBusqueda: data.map((item) => {
                        //var imagen = Blob.Parse(item.imagenes[0].image);
                        //var objectURL = URL.createObjectURL(imagen);
                        return {
                            id: item.id,
                            categoria: item.producto.categoria,
                            tipo: item.producto.tipo,
                            titulo: item.titulo,
                            descripcion: item.descripcion,
                            stock: item.stock,
                            tipoDeUnidad: item.tipo_unidad,
                            tipoDeProduccion: item.tipo_produccion,
                            precio: item.precio,
                            techaDeVencimiento: item.fecha_vencimiento,
                            tiempoDePreparacion: item.tiempo_preparacion,
                            cantidad: 0,
                            productor: {
                                id: item.productor.id,
                                razon_social: item.productor.razon_social,
                                nombre: item.productor.usuario.nombre,
                                apellido: item.productor.usuario.apellido,
                                telefono: item.productor.usuario.telefono,
                            },
                            //imagenes: objectURL ,
                        }
                    }),
                    loading: false
                })
            })
    }

    restarProducto = (position) => {
        //Falta la validación y actualización por stock
        let { resultadoBusqueda } = this.state;
        //  let productosSeleccionados = this.props.productosSeleccionados;
        var productoSeleccionado = resultadoBusqueda[position];
        if ((parseInt(productoSeleccionado.cantidad) - 1) >= 0) {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) - 1).toString(),
            ]
            this.setState({ productosSeleccionado: productoActualizado });
        }
    }

    sumarProducto = (position) => {
        //Falta la validación y actualización por stock
        let { resultadoBusqueda } = this.state;
        var productoSeleccionado = resultadoBusqueda[position];
        let productoActualizado = [
            ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) + 1).toString(),
        ]
        this.setState({ productosSeleccionado: productoActualizado });
    }

    agregarAlCarrito = (position) => {
        let { resultadoBusqueda } = this.state;
        let productosSeleccionados = this.props.productosSeleccionados;
        var producto = resultadoBusqueda[position];
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
                <div  class="toastPosicion">
                <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} /></div>
            </div>
        )
    }
}
export default ResultadoBusqueda;