import '../diseños/estilosGlobales.css';
import '../diseños/DetalleProducto.css';
import React, { Component } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from "mdbreact";
import NumberFormat from 'react-number-format';
import moment from 'moment';

class DetalleBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            producto: this.props.producto,
            showModal: false,
        }

    }

    restarProducto = () => {
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
        this.setState({
            producto: {
                ...this.state.producto,
                cantidad: (parseInt(productoSeleccionado.cantidad) + 1).toString()
            }
        });
    }

    render() {
        const sumarProducto =  () => this.sumarProducto();
        const restarProducto = () => this.restarProducto();
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
                            <NumberFormat value={this.state.producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /></h3>
                        x {this.state.producto.tipoDeUnidad}

                        <div className="descripcionProducto">
                            Producido por:
                        <h6>{this.state.producto.productor.razon_social}</h6>
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
                            this.state.producto.fechaDeVencimiento !== undefined ?
                                <div className="descripcionProducto">
                                    Fecha de vencimiento: <h6>{moment(this.state.producto.fechaDeVencimiento, 'YYYY-MM-DD').format("DD/MM/YYYY")}</h6>
                                </div>
                                : ''
                        }
                        <div className="botonesDetalle">
                            <button className="iconosListado" onClick={restarProducto}
                            >
                                <i className="fas fa-minus" />
                            </button>
                            <span className="float-center">{this.state.producto.cantidad}</span>
                            <button className="iconosListado" onClick={sumarProducto}
                            >
                                <i className="fas fa-plus" />
                            </button>
                            <br />
                            <MDBBtn outline color="green" onClick={this.agregarAlCarrito}
                            >
                                Agregar al carrito
                            </MDBBtn>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default DetalleBusqueda;