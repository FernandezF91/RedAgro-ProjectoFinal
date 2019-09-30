import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrito from '../pantallas/ItemCarrito';
import _ from 'lodash';
import '../diseños/estilosGlobales.css';
import '../diseños/Carrito.css';

class Carrito extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_consumidor,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })
    }

    quitarProducto = (position) => {
        let productosSeleccionados = this.props.productosSeleccionados;
        let nuevaLista = [
            ...productosSeleccionados.slice(0, position),
            ...productosSeleccionados.slice(position + 1),
        ]
        this.setState(this.actualizarPropsSeleccionados(nuevaLista));
    }

    sumarProducto = (position) => {
        //Falta la validación y actualización por stock
        let productosSeleccionados = this.props.productosSeleccionados;
        var productoSeleccionado = productosSeleccionados[position];
        let productoActualizado = [
            ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) + 1).toString(),
        ]
        this.setState({ productoSeleccionado: productoActualizado });
    }

    restarProducto = (position) => {
        //Falta la validación y actualización por stock
        let productosSeleccionados = this.props.productosSeleccionados;
        var productoSeleccionado = productosSeleccionados[position];
        if ((parseInt(productoSeleccionado.cantidad) - 1) === 0) {
            //ver de usar la funcion de quitar producto para no repetir codigo
            let nuevaLista = [
                ...productosSeleccionados.slice(0, position),
                ...productosSeleccionados.slice(position + 1),
            ]
            this.setState(this.actualizarPropsSeleccionados(nuevaLista));
        } else {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) - 1).toString(),
            ]
            this.setState({ productoSeleccionado: productoActualizado });
        }
    }

    actualizarPropsSeleccionados(productosSeleccionados) {
        this.props.actualizarProductosSeleccionados(productosSeleccionados);
    }

    getTotalCarrito(productosSeleccionados) {
        return _.sumBy(productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
    }

    render() {
        return (
            <div className="carrito">
                <div className="titulosPrincipales">Mi carrito</div>
                <ul className="listado">
                    {this.props.productosSeleccionados.length >= 1 ?
                        <ItemCarrito
                            listaDeProductos={this.props.productosSeleccionados}
                            sumarProducto={this.sumarProducto}
                            restarProducto={this.restarProducto}
                            quitarProducto={this.quitarProducto}
                            getTotalCarrito={this.getTotalCarrito} />
                        :
                        <div className="sinProductos">
                            <i className="fas fa-shopping-cart iconoGrande" />
                            <br />
                            <br />
                            <h5>Ups! Tu carrito esta vacío!</h5>
                            <h6>Probá buscando productos por <Link to={'/principalConsumidores'}>acá</Link></h6>
                        </div>
                    }
                </ul>
            </div>
        );
    }
}
export default Carrito;
