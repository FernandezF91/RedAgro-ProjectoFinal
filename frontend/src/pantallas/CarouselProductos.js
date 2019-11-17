import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCarousel, MDBCarouselItem, MDBCarouselInner, MDBCardImage, MDBContainer } from "mdbreact";
import NumberFormat from 'react-number-format';
import '../diseños/EstilosGenerales.css';

const CarouselProductos = (props) => {

    return (
        props.listadoProductos.length > 0 ?
            <MDBContainer>
                <MDBCarousel activeItem={1} length={props.listadoProductos.length} slide={true} showControls={true} showIndicators={true} multiItem>
                    <MDBCarouselInner>
                        {
                            props.listadoProductos.map((itemLista, index) => (
                                <MDBCarouselItem itemId={index + 1} key={index}>
                                    <MDBRow>
                                        {
                                            itemLista.map((item) => (
                                                <MDBCol md="4" key={item.id}>
                                                    <MDBCard className="mb-2">
                                                        <MDBCardImage
                                                            className="imagenesBusqueda"
                                                            src={"data:" + item.imagenes[0].tipo_contenido + ";base64," + item.imagenes[0].image}
                                                            alt="ImagenBusqueda"
                                                            overlay="white-slight"
                                                            height="150x" width="auto" />

                                                        <MDBCardBody className="text-center">
                                                            <h6 className="grey-text">{item.tipo}</h6>
                                                            <MDBCardTitle>
                                                                <strong>
                                                                    <button type="button" className="dark-grey-text link-button col-md overflowTexto" onClick={() => props.mostrarDetalleProducto(item)} title="Clickeá para ver el detalle del producto">{item.titulo}</button>
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
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            ))
                                        }
                                    </MDBRow>
                                </MDBCarouselItem>
                            ))
                        }
                    </MDBCarouselInner>
                </MDBCarousel>
            </MDBContainer>
            : ''
    )
}
export default CarouselProductos;