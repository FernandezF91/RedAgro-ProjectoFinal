import React, { Component } from 'react';
import '../diseños/estilosGlobales.css';
import '../diseños/ResultadoBusqueda.css';
import Select from 'react-select';
import Busqueda from './Busqueda';
import Paginacion from './Paginacion';

const tamañosListado = [
    {
        label: "12",
        value: "12"
    },
    {
        label: "20",
        value: "20"
    },
    {
        label: "40",
        value: "40"
    },
    {
        label: "Todo",
        value: "Todo"
    },
];
var defaultListado = [
    {
        label: "12",
        value: "12"
    },
];

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id_usuario,
            resultadoBusqueda: [],
            productosSeleccionados: this.props.productosSeleccionados,
            tamañoListado: 12, //Valor predeterminado
            paginaActual: 1,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsCarrito = this.actualizarPropsCarrito.bind(this);
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
        this.realizarBusqueda(this.props.busqueda)
    }

    realizarBusqueda(busqueda) {
        console.log("Estas en el componente de resultado");
        var path = "http://localhost:3000/redAgro/obtenerProductos?titulo=" + busqueda;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    resultadoBusqueda: data.map((item) => {
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
                        }
                    })
                })
            })
    }

    restarProducto = (position) => {
        //Falta la validación y actualización por stock
        let { resultadoBusqueda } = this.state;
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
        let { productosSeleccionados } = this.state;
        var producto = resultadoBusqueda[position];
        if (parseInt(producto.cantidad) > 0) {
            this.setState({ productosSeleccionados: productosSeleccionados.push(producto) });
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

    actualizarPropsCarrito(){

    }

    render() {
        const { resultadoBusqueda, paginaActual, tamañoListado } = this.state;
        const numberOfPages = Math.ceil(resultadoBusqueda.length / tamañoListado);
        const indexOfLastReserva = paginaActual * tamañoListado;
        const indexOfFirstReserva = indexOfLastReserva - tamañoListado;
        const listadoBusqueda = resultadoBusqueda.slice(indexOfFirstReserva, indexOfLastReserva);

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
            </div>
        )
    }
}
export default ResultadoBusqueda;