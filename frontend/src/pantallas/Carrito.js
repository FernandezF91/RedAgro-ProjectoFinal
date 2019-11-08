import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrito from '../pantallas/ItemCarrito';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT } from 'butter-toast';
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
        this.cerrarModal = this.cerrarModal.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }

    componentDidMount() {
        if (this.props.productosSeleccionados.length > 0) {
            this.obtenerstock();
        } else {
            this.setState({
                loading: false
            })
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
                        var validoStock = false;
                        var actualizoStock = data.map((item) => {

                            var productoElegido = this.props.productosSeleccionados.filter(function (producto) {
                                return producto.id === item.id;
                            })[0];

                            if (productoElegido.cantidad > item.stock) {
                                validoStock = true;
                            }

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
                                cantidad: productoElegido.cantidad,
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
                        })
                        this.setState(this.actualizarPropsSeleccionados(actualizoStock))
                        this.setState({
                            loading: false,
                            productosSinStock: validoStock
                        });
                    }
                })
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
        let productosSeleccionados = this.props.productosSeleccionados;
        var productoSeleccionado = productosSeleccionados[position];

        if ((parseInt(productoSeleccionado.cantidad) + 1) <= productoSeleccionado.stock) {
            let productoActualizado = [
                ...productoSeleccionado.cantidad = (parseInt(productoSeleccionado.cantidad) + 1).toString(),
            ]
            this.setState({ productoSeleccionado: productoActualizado });
        } else {
            ButterToast.raise({
                content: <Cinnamon.Crunch scheme={Cinnamon.Crunch.SCHEME_RED}
                    content={() => <div className="mensajeToast">No se encuentra disponible el stock solicitado.</div>}
                    title="Cultura Verde"
                    icon={<i className="fa fa-shopping-cart iconoToast" />}
                />
            });
        }
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
        var total = 0;
        productosSeleccionados.forEach((o) => {
            if (o.oferta !== null) {
                if (o.oferta.activo) {
                    total += o.cantidad * (o.precio - (o.precio * o.oferta.porcentaje) / 100);
                } else {
                    total += o.cantidad * o.precio;
                }
            } else {
                total += o.cantidad * o.precio;
            }
        });;
        return total;
    }

    cerrarModal() {
        this.setState({ productosSinStock: false })
    }

    validarItemsCarrito = () => {
        var chequeoStock = false;

        this.props.productosSeleccionados.forEach(item => {
            if (item.cantidad > item.stock) {
                chequeoStock = true;
            }
        })

        if (chequeoStock === true) {
            this.setState({ productosSinStock: true })
        }
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
                                getTotalCarrito={this.getTotalCarrito}
                                validarItemsCarrito={this.validarItemsCarrito} />
                            :
                            <div className="sinProductos">
                                <i className="fas fa-shopping-cart iconoGrande" />
                                <br />
                                <br />
                                <h5>Ups! Tu carrito esta vacío!</h5>
                                <h6 className="grey-text">Probá buscando productos por <Link to={'/principalConsumidores/MiCuenta'}>acá</Link></h6>
                            </div>
                        }
                    </ul>
                    {
                        <MDBModal isOpen={this.state.productosSinStock} centered size="sm">
                            <div className="modalMargenes">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                <div className="modal-body">
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
                    <div className="toastPosicion">
                        <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
                    </div>
                </div>
            );
    }
}
export default Carrito;
