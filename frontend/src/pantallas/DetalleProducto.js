import '../diseños/estilosGlobales.css';
import '../diseños/DetalleProducto.css';
import React, { Component } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_LEFT } from 'butter-toast';
import { MDBBtn } from "mdbreact";
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner';
import moment from 'moment';

class DetalleBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            producto: {},
            loading: true,
            showModal: false,
            resultadoRequest: 0,
        }
        this.actualizarPropsSeleccionados = this.actualizarPropsSeleccionados.bind(this);
        this.mostrarPerfilProductor = this.mostrarPerfilProductor.bind(this);
    }

    componentDidMount() {
        const path = "redAgro/obtenerProducto/" + this.state.id;
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
                        producto: {
                            id: data.id,
                            categoria: data.producto.categoria,
                            tipo: data.producto.tipo,
                            titulo: data.titulo,
                            descripcion: data.descripcion,
                            stock: data.stock,
                            tipoDeUnidad: data.unidad_venta,
                            tipoDeProduccion: data.tipo_produccion,
                            precio: data.precio,
                            fechaDeVencimiento: data.fecha_vencimiento,
                            tiempoDePreparacion: data.tiempo_preparacion,
                            contenido: data.contenido,
                            cantidad: 1,
                            productor: {
                                id: data.productor.id,
                                razon_social: data.productor.razon_social,
                                nombre: data.productor.usuario.nombre,
                                apellido: data.productor.usuario.apellido,
                                telefono: data.productor.usuario.telefono,
                                usuario: data.productor.usuario.usuario,
                            },
                            imagenes: data.imagenes,
                            oferta: data.oferta
                        },
                        loading: false
                    })
                }
            })
        return
    }

    restarProducto() {
        var productoSeleccionado = this.state.producto;
        if ((parseInt(productoSeleccionado.cantidad) - 1) > 0) {
            this.setState({
                producto: {
                    ...this.state.producto,
                    cantidad: (parseInt(productoSeleccionado.cantidad) - 1).toString()
                }
            });
        }
    }

    sumarProducto() {
        var productoSeleccionado = this.state.producto;
        if ((parseInt(productoSeleccionado.cantidad) + 1) <= parseInt(productoSeleccionado.stock)) {
            this.setState({
                producto: {
                    ...this.state.producto,
                    cantidad: (parseInt(productoSeleccionado.cantidad) + 1).toString()
                }
            });
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

    actualizarPropsSeleccionados(productosSeleccionados) {
        this.props.actualizarProductosSeleccionados(productosSeleccionados);
    }

    agregarAlCarrito() {

        var producto = this.state.producto;
        let productosSeleccionados = this.props.productosSeleccionados;

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
                        chequeoProducto[0].cantidad = producto.cantidad;
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
            this.restarProducto();
        }
    }

    mostrarPerfilProductor = (usuario) => {
        this.props.handlePerfilProductor(usuario.split("@")[0]);
    }

    render() {
        const sumarProducto = () => this.sumarProducto();
        const restarProducto = () => this.restarProducto();
        const agregarAlCarrito = () => this.agregarAlCarrito();

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
            <Container className="containerPrincipal">
                <Row>
                    <Col className="imagenProducto" sm={8}>
                        <Carousel >
                            {
                                this.state.producto.imagenes.map((imagen, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="imagenesBusqueda"
                                            src={"data:" + imagen.tipo_contenido + ";base64," + imagen.image}
                                            alt="ImagenBusqueda"
                                            overlay="white-slight"
                                            height="450x" width="auto"
                                        />
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Col>
                    <Col className="detalleDelProducto" sm={4}>
                        <br />
                        <h6 className="grey-text">{this.state.producto.categoria}</h6>
                        <h3 className="tituloProducto">{this.state.producto.titulo}</h3>
                        <h3 className="precioProducto">

                            {
                                (this.state.producto.oferta === null || this.state.producto.oferta === undefined) ?
                                    <div>
                                        <NumberFormat value={this.state.producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {this.state.producto.tipoDeUnidad}
                                    </div>
                                    :
                                    (this.state.producto.oferta.activo) ?
                                        <div title="Producto en oferta!">
                                            <strike>
                                                <NumberFormat value={this.state.producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {this.state.producto.tipoDeUnidad}
                                            </strike>
                                            <br />
                                            <NumberFormat value={this.state.producto.precio - this.state.producto.precio * this.state.producto.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {this.state.producto.tipoDeUnidad}
                                        </div>
                                        :
                                        <div>
                                            <NumberFormat value={this.state.producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {this.state.producto.tipoDeUnidad}
                                        </div>
                            }
                        </h3>
                        {
                            this.state.producto.contenido !== null ? //|| this.state.producto.contenido.length > 0
                                <div className="contenidoDelProducto">
                                    <h6 className="grey-text">Cada {this.state.producto.tipoDeUnidad.toLowerCase()} contiene {this.state.producto.contenido}</h6>
                                </div>
                                : ''
                        }
                        <div className="descripcionProductor">
                            Producido por:
                        <h6><button type="button" className="detalle-link-button" onClick={() => this.mostrarPerfilProductor(this.state.producto.productor.usuario)} title="Ir al perfil del productor">
                                {this.state.producto.productor.razon_social}
                            </button></h6>
                        </div>

                        <div className="descripcionProducto">
                            Descripción del producto:
                        <h6>{this.state.producto.descripcion}</h6>
                        </div>
                        <div className="descripcionProducto">
                            Tipo de producción:
                        <h6>{this.state.producto.tipoDeProduccion}</h6>
                        </div>
                        {
                            this.state.producto.fechaDeVencimiento !== null ?
                                <div className="descripcionProducto">
                                    Fecha de vencimiento: <h6>{moment(this.state.producto.fechaDeVencimiento, 'YYYY-MM-DD').format("DD/MM/YYYY")}</h6>
                                </div>
                                : ""
                        }
                        <div className="botonesDetalle">
                            <button className="iconosListado" onClick={restarProducto}>
                                <i className="fas fa-minus" />
                            </button>
                            <span className="float-center">{this.state.producto.cantidad}</span>
                            <button className="iconosListado" onClick={sumarProducto}>
                                <i className="fas fa-plus" />
                            </button>
                            <br />
                            <MDBBtn outline color="green" onClick={agregarAlCarrito}>
                                Agregar al carrito
                            </MDBBtn>
                        </div>
                    </Col>
                </Row>

                <div className="toastPosicion">
                    <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_LEFT }} />
                </div>
            </Container>
        )
    }
}
export default DetalleBusqueda;