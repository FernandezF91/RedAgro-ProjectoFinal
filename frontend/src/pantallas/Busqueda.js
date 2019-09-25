import React from "react";
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon, MDBTooltip, MDBBadge, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBBtn } from "mdbreact";
import NumberFormat from 'react-number-format';
import { Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';

const Busqueda = ({ listaDeProductos, sumarProducto, restarProducto, agregarAlCarrito }) => {
    return (
        <div>
            {
                listaDeProductos.length > 1 ?
                    <MDBContainer >
                        <MDBRow>
                            {listaDeProductos.map((item, index) => (
                                <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key={item.id}>
                                    <MDBCard narrow ecommerce className="mb-4">
                                        <MDBCardImage
                                            src={culturaVerde}
                                            top
                                            alt="sample photo"
                                            overlay="white-slight"
                                        />
                                        <MDBCardBody className="text-center">
                                            <a href="#!" className="grey-text">
                                                <h6>{item.categoria}</h6>
                                            </a>
                                            <MDBCardTitle>
                                                <strong>
                                                    <a href="#!" className="dark-grey-text">{item.titulo}</a>
                                                </strong>
                                            </MDBCardTitle>
                                            <MDBCardText>
                                                <p>{item.descripcion}</p>
                                                <strong className="float-center">
                                                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                    <p>x {item.tipoDeUnidad}</p>
                                                </strong>
                                            </MDBCardText>
                                            <MDBCardFooter className="px-1">
                                                <button className="iconosListado" onClick={() => restarProducto(index)}>
                                                    <i class="fas fa-minus" />
                                                </button>
                                                <span className="float-center">{item.cantidad}</span>
                                                <button className="iconosListado" onClick={() => sumarProducto(index)}>
                                                    <i class="fas fa-plus" />
                                                </button>
                                            </MDBCardFooter>
                                            <MDBBtn outline color="green" size="sm" onClick={() => agregarAlCarrito(index)}>
                                                Agregar al carrito
                                            </MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>))}
                        </MDBRow>
                    </MDBContainer> :
                    <div className="notFound">
                        <i class="fas fa-tasks iconoGrande"></i>
                        <br />
                        <br />
                        <h5>Ups! No se encontraron productos para tu busqueda! </h5>
                        <h6>Probá cambiando la descripción por acá <Link to={'/principalConsumidores'}>acá</Link> </h6>
                    </div>
            }
        </div>
    );
}
export default Busqueda;