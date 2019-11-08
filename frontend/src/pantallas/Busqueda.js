import '../diseños/ResultadoBusqueda.css';
import React from "react";
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from "mdbreact";
import NumberFormat from 'react-number-format';
import Carousel from 'react-bootstrap/Carousel';

const Busqueda = ({ listaDeProductos, sumarProducto, restarProducto, agregarAlCarrito, mostrarDetalleProducto }) => {
    return (
        <div>
            {
                listaDeProductos.length > 0 ?
                    <MDBContainer>
                        <MDBRow>
                            {listaDeProductos.map((item, index) => (
                                <MDBCol lg="4" md="6" className="mb-lg-0 mb-4" key={item.id}>
                                    <MDBCard narrow ecommerce className="mb-4">
                                        <Carousel>
                                            {
                                                item.imagenes.map((imagen, index) => (
                                                    <Carousel.Item key={index}>
                                                        <MDBCardImage
                                                            className="imagenesBusqueda"
                                                            src={"data:" + imagen.tipo_contenido + ";base64," + imagen.image}
                                                            alt="ImagenBusqueda"
                                                            overlay="white-slight"
                                                            height="250x" width="auto" />
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>

                                        <MDBCardBody className="text-center">
                                            <h6 className="grey-text">{item.tipo}</h6>
                                            <MDBCardTitle>
                                                <strong>
                                                    {
                                                        item.titulo.length > 20 ?
                                                            <button type="button" className="dark-grey-text link-button" onClick={() => mostrarDetalleProducto(item)} title="Clickeá para ver el detalle del producto">{item.titulo.slice(0, 18) + "..."}</button>
                                                            :
                                                            <button type="button" className="dark-grey-text link-button" onClick={() => mostrarDetalleProducto(item)} title="Clickeá para ver el detalle del producto">{item.titulo}</button>
                                                    }
                                                </strong>
                                            </MDBCardTitle>
                                            <MDBCardText>
                                                <strong className="float-center">
                                                    {
                                                        (item.oferta === null || item.oferta === undefined) ?
                                                            <div>
                                                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                            </div>
                                                            :
                                                            (item.oferta.activo) ?
                                                                <div title="Producto en oferta!">
                                                                    <strike>
                                                                        <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                                    </strike>
                                                                    <br />
                                                                    <NumberFormat value={item.precio - item.precio * item.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                                </div>
                                                                :
                                                                <div>
                                                                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                                </div>
                                                    }
                                                </strong>
                                            </MDBCardText>
                                            <MDBCardFooter className="px-1" transparent>
                                                <button className="iconosListado" onClick={() => restarProducto(index)}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <span className="float-center">{item.cantidad}</span>
                                                <button className="iconosListado" onClick={() => sumarProducto(index)}>
                                                    <i className="fas fa-plus" />
                                                </button>
                                                <MDBBtn outline color="green" onClick={() => agregarAlCarrito(index)}>
                                                    Agregar al carrito
                                                </MDBBtn>
                                            </MDBCardFooter>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>))}
                        </MDBRow>
                    </MDBContainer> :
                    <div className="notFound">
                        <i className="fas fa-search iconoGrande" />
                        <br />
                        <br />
                        <h5>Ups! No se encontraron productos para tu búsqueda! </h5>
                        <h6>Probá cambiando la descripción por <Link to={'/principalConsumidores'}>acá</Link></h6>
                    </div>
            }
        </div>
    );
}
export default Busqueda;