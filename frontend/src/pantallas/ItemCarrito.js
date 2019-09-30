import React from 'react';
import NumberFormat from 'react-number-format';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemCarrito = ({ listaDeProductos, sumarProducto, restarProducto, quitarProducto, getTotalCarrito }) => {

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
        <MDBTable responsive hover>
            <MDBTableHead columns={columns} />
            <MDBTableBody>
                {
                    listaDeProductos.map((producto, index) =>
                        <tr key={producto.id}>
                            <td>
                                {/*Puse eso de ejemplo, pero deberia ir la foto que suban del producto*/}
                                <i className="fas fa-lemon" />
                            </td>
                            <td>
                                <h5>{producto.titulo}</h5>
                                <br />
                                {producto.descripcion}
                                <br />
                                Producido por {producto.productor.razon_social}
                            </td>
                            <td>
                                <button className="iconosListado" onClick={() => restarProducto(index)}>
                                    <i className="fas fa-minus" />
                                </button>
                                <span className="item-quantity">{producto.cantidad}</span>
                                <button className="iconosListado" onClick={() => sumarProducto(index)}>
                                    <i className="fas fa-plus" />
                                </button>
                            </td>
                            <td>
                                <NumberFormat value={producto.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                            </td>
                            <td>
                                <NumberFormat value={producto.precio * producto.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                            </td>
                            <td>
                                <button className="remove" onClick={() => quitarProducto(index)}>
                                    <i className="fas fa-times" />
                                </button>
                            </td>
                        </tr>
                    )
                }
                <tr>
                    <td colSpan="6" align="right">
                        <h5>Total
                           <NumberFormat value={getTotalCarrito(listaDeProductos)} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix=" $ " decimalScale={2} fixedDecimalScale={true} />
                        </h5>
                        <Link to={'/principalConsumidores/Checkout'}>
                            <Button variant="success" type="submit">Finalizar Reserva</Button>
                        </Link>
                    </td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    )
}
export default ItemCarrito;