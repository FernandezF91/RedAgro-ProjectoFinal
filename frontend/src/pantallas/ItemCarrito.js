import React from 'react';
import NumberFormat from 'react-number-format';
import { Table } from 'react-bootstrap';

const ItemCarrito = ({ listaDeReservas, sumarProducto, restarProducto, quitarProducto, getTotalCarrito }) => {

    return (
        < div >
            <Table responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDeReservas.map((producto, index) =>
                            <tr>
                                <td>
                                    {/*Puse eso de ejemplo, pero deberia ir la foto que suban del producto*/}
                                    <i class="fas fa-lemon" />
                                </td>
                                <td>
                                    <h5>{producto.titulo}</h5>
                                    <p>{producto.descripcion}</p>
                                    <p>Producido por {producto.productor}</p>
                                </td>
                                <td>
                                    <button className="iconosListado" onClick={() => restarProducto(index)}>
                                        <i class="fas fa-minus" />
                                    </button>
                                    <span className="item-quantity">{producto.cantidad}</span>
                                    <button className="iconosListado" onClick={() => sumarProducto(index)}>
                                        <i class="fas fa-plus" />
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
                                        <i className="fas fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>
                        <td colSpan="6" align="right">
                            <h5>Total 
                            <NumberFormat value={getTotalCarrito(listaDeReservas)} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix=" $ " decimalScale={2} fixedDecimalScale={true} />
                            </h5>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div >
    )
}
export default ItemCarrito;