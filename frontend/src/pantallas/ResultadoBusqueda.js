import React, { Component } from 'react';
import '../diseños/estilosGlobales.css';
import '../diseños/ResultadoBusqueda.css';
import Busqueda from './Busqueda';

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: [],
            productosSeleccionados: this.props.productosSeleccionados,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        var path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=1";
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    busqueda: data.map((item) => {
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
        let { busqueda } = this.state;
        var productoSeleccionado = busqueda[position];
        if ((parseInt(productoSeleccionado.cantidad) - 1) >= 0) {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) - 1).toString(),
            ]
            this.setState({ productoSeleccionado: productoActualizado });
        }
    }

    sumarProducto = (position) => {
        //Falta la validación y actualización por stock
        let { busqueda } = this.state;
        var productoSeleccionado = busqueda[position];
        let productoActualizado = [
            ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) + 1).toString(),
        ]
        this.setState({ productoSeleccionado: productoActualizado });
    }

    agregarAlCarrito = (position) =>{
        let { busqueda } = this.state;
        let { productosSeleccionados } = this.state;
        var producto = busqueda[position];
        if( parseInt(producto.cantidad) > 0 ) {
            this.setState({ productosSeleccionados: productosSeleccionados.push(producto) });
        }    
    }

    render() {
        return (
            <div>
                <div className="titulosPrincipales">Resultado Búsqueda</div>
                <Busqueda listaDeProductos={this.state.busqueda}
                    sumarProducto={this.sumarProducto}
                    restarProducto={this.restarProducto} 
                    agregarAlCarrito={this.agregarAlCarrito}/>
            </div>
        )
    }
}
export default ResultadoBusqueda;