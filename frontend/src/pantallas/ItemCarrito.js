import React from 'react';
import NumberFormat from 'react-number-format';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import '../diseños/Carrito.css';
import '../diseños/EstilosGenerales.css';

const ItemCarrito = ({ listaDeProductos, sumarProducto, restarProducto, quitarProducto, getTotalCarrito, validarItemsCarrito }) => {

    const columns = [
        {
            label: '',
            field: 'ImagenProducto',
        },
        {
            label: 'Producto',
            field: 'Producto',
        },
        {
            label: 'Cantidad',
            field: 'Cantidad',
        },
        {
            label: 'Precio',
            field: 'Precio',
        },
        {
            label: 'Subtotal',
            field: 'Subtotal',
        },
        {
            label: '',
            field: 'Quitar',
        }
    ]

    return (
        <div>
            <MDBTable responsive hover>
                <MDBTableHead columns={columns} />
                <MDBTableBody>
                    {
                        listaDeProductos.map((producto, index) =>
                            <tr key={producto.id} className="border-bottom">
                                <td>
                                    <Image
                                        roundedCircle
                                        alt="ImagenCarrito"
                                        src={"data:" + producto.imagenes[0].tipo_contenido + ";base64," + producto.imagenes[0].image}
                                        mode='fit'
                                        height="80px" width="auto" />
                                </td>
                                <td>
                                    <h5 className="overflowTexto anchoColumnaTituloCarrito" title={producto.titulo}>
                                        {producto.titulo}
                                    </h5>
                                    {producto.descripcion}
                                    <br />
                                    Producido por {producto.productor.razon_social}
                                </td>
                                {
                                    (producto.cantidad > producto.stock) ?
                                        <td>
                                            <button className="iconosListado" onClick={() => restarProducto(index)}>
                                                <i className="fas fa-minus" />
                                            </button>
                                            <span className="item-quantity-no-stock" >{producto.cantidad}</span>
                                            <button className="iconosListado" onClick={() => sumarProducto(index)} disabled>
                                                <i className="fas fa-plus" />
                                            </button>
                                        </td>
                                        :
                                        <td>
                                            <button className="iconosListado" onClick={() => restarProducto(index)}>
                                                <i className="fas fa-minus" />
                                            </button>
                                            <span className="item-quantity">{producto.cantidad}</span>
                                            {
                                                (producto.cantidad === producto.stock) ?
                                                    <button className="iconosListado" onClick={() => sumarProducto(index)} disabled>
                                                        <i className="fas fa-plus" />
                                                    </button>
                                                    :
                                                    <button className="iconosListado" onClick={() => sumarProducto(index)}>
                                                        <i className="fas fa-plus" />
                                                    </button>
                                            }
                                        </td>
                                }
                                <td>
                                    {
                                        (producto.oferta === null || producto.oferta === undefined) ?
                                            <NumberFormat value={producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                            :
                                            (producto.oferta.activo) ?
                                                <div title="Producto en oferta!">
                                                    <strike>
                                                        <NumberFormat value={producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                    </strike>
                                                    <br />
                                                    <NumberFormat value={producto.precio - producto.precio * producto.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                </div>
                                                :
                                                <div>
                                                    <NumberFormat value={producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                </div>
                                    }
                                </td>
                                <td>
                                    {
                                        (producto.oferta === null || producto.oferta === undefined) ?
                                            <NumberFormat value={producto.precio * producto.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                            :
                                            (producto.oferta.activo) ?
                                                <NumberFormat value={(producto.precio - producto.precio * producto.oferta.porcentaje / 100) * producto.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                :
                                                <div>
                                                    <NumberFormat value={producto.precio * producto.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                </div>
                                    }
                                </td>
                                <td>
                                    <button className="remove" onClick={() => quitarProducto(index)}>
                                        <i className="fas fa-times" />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </MDBTableBody>
            </MDBTable>
            <h5 className="precioCheckout">
                Total <NumberFormat value={getTotalCarrito(listaDeProductos)} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix=" $ " decimalScale={2} fixedDecimalScale={true} />
            </h5>
            <br />
            <div>
                <Button variant="light" type="submit" href="javascript:history.back()" className="botonIzquierda">Atras</Button>
                <Link to={'/principalConsumidores/Checkout'}>
                    <Button variant="success" type="submit" onClick={() => validarItemsCarrito()} className="botonDerecha">Finalizar Reserva</Button>
                </Link>
            </div>
        </div>
    )
}
export default ItemCarrito;