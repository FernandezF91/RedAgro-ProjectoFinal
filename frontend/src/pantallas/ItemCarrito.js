import React from 'react';
import NumberFormat from 'react-number-format';

const ItemCarrito = (props) => {

    var itemSubTotal = props.productoSeleccionado.precio * props.productoSeleccionado.cantidad;

    return (
        <li>
            <div className="icon">
                {/*Puse eso de ejemplo, pero deberia ir la foto que suban del producto*/}
                <i class="fas fa-lemon"></i>
            </div>
            <div className="name">
                <span className="item-title"><h5>{props.productoSeleccionado.titulo}</h5></span>
                <span className="item-description">{props.productoSeleccionado.descripcion}</span>
                <span className="item-description">Producido por {props.productoSeleccionado.productor}</span>
            </div>
            <div className="columns">
                <span className="item-quantity"> Cantidad </span>
                <span className="item-quantity"> {props.productoSeleccionado.cantidad}</span>
            </div>
            <div className="columns">
                <span className="item-quantity"> Precio por {props.productoSeleccionado.tipo_unidad} </span>
                <NumberFormat value={props.productoSeleccionado.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
            </div>
            <div className="columns">
                <span className="item-quantity"> Subtotal </span>
                <span className="item-quantity">
                    <NumberFormat value={itemSubTotal} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                </span>
            </div>
            <button className="remove" onClick={() => props.quitarProducto(props.key)}>
                <i className="fas fa-times"></i>
            </button>
        </li>
    )
}
export default ItemCarrito;