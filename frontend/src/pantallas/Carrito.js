import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrito from '../pantallas/ItemCarrito';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';
import _ from 'lodash';
import '../diseños/estilosGlobales.css';
import '../diseños/Carrito.css';

class Carrito extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_consumidor,
            stockActualizado: [],
            loading: true,
            productosSinStock: false,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);

    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        if (this.props.productosSeleccionados.length > 0) {
            this.obtenerstock();
        } else {
            this.setState({ loading: false })
        }
    }

    obtenerstock() {
        var parametros = '';

        if (this.props.productosSeleccionados.length > 0) {
            this.props.productosSeleccionados.forEach((item, index) => {
                if (index === 0) {
                    parametros = parametros + "idProducto=" + item.id;
                } else {
                    parametros = parametros + "&idProducto=" + item.id;
                }
            });
            var path = "http://localhost:3000/redAgro/obtenerProductosPorLista?" + parametros
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
                            stockActualizado: data.map((item) => {
                                return {
                                    id: item.id,
                                    stock: item.stock,
                                }
                            }),
                            loading: false
                        })
                    }
                })
            return
        }
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

    actualizarStock(listaDeProductos) {
        var listaDeProductosActualizado = [];

        listaDeProductos.map((item) => {
            var stockDelProducto = this.state.stockActualizado.filter(function (producto) {
                return producto.id === item.id;
            });
            if (item.stock > stockDelProducto[0].stock) {
                this.setState({ productosSinStock: true })
            }
            item.stock = stockDelProducto[0].stock;
            listaDeProductosActualizado.push(item);
        })
        return listaDeProductosActualizado;
    }

    cerrarModal() {
        this.setState({ productosSinStock: false })
    }

    render() {

        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
        );

        if (this.state.loading === false)
            var productosSeleccionados = [];
        if (this.props.productosSeleccionados.length > 0) {
            productosSeleccionados = this.actualizarStock(this.props.productosSeleccionados);
        }
        return (
            <div className="carrito">
                <div className="titulosPrincipales">Mi carrito</div>
                <ul className="listado">
                    {this.props.productosSeleccionados.length >= 1 ?
                        <ItemCarrito
                            listaDeProductos={productosSeleccionados}
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
                {
                    <MDBModal isOpen={this.state.productosSinStock} centered size="sm">
                        <div className="modalMargenes">
                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                            <br />
                            <div class="modal-body">
                                <i className="fas fa-exclamation-circle iconoModalError" />
                                <br />
                                <br />
                                <h5> Whoa!
                                <br />Hay productos en tu carrito que no tienen stock.</h5>
                                <br />
                                <h6> Actualizá las cantidades para continuar.</h6>
                            </div>
                        </div>
                    </MDBModal>
                }
            </div>
        );
    }
}
export default Carrito;
