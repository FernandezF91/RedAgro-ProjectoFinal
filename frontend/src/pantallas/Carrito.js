import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import ItemCarrito from '../pantallas/ItemCarrito';
import _ from 'lodash';
import '../diseños/estilosGlobales.css';
import '../diseños/Carrito.css';

class Carrito extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_consumidor,
            productosSeleccionados: [
                {
                    id: "1",
                    titulo: "Tomate redondo",
                    descripcion: "Tomate agroecologico",
                    fecha_vencimiento: "10/09/2019",
                    precio: "150",
                    tipo_unidad: "KG",
                    cantidad: "2",
                    productor: "Vanesa Molina"
                },
                {
                    id: "2",
                    titulo: "Pomelo rosado",
                    descripcion: "Pomelo organico",
                    fecha_vencimiento: "11/09/2019",
                    precio: "350",
                    tipo_unidad: "KG",
                    cantidad: "10",
                    productor: "Vanesa Molina"
                }
            ]
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })
    }

    quitarProducto = (position) => {
        let { productosSeleccionados } = this.state;
        let nuevaLista = [
            ...productosSeleccionados.slice(0, position),
            ...productosSeleccionados.slice(position + 1),
        ]
        this.setState({ productosSeleccionados: nuevaLista });
    }

    getTotalCarrito() {
        return _.sumBy(this.state.productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
    }

    render() {
        return (
            <div className="carrito">
                <div className="titulosPrincipales">Mi carrito</div>
                <ul className="listado">
                    {this.state.productosSeleccionados.length >= 1 ?
                        this.state.productosSeleccionados.map((producto, index) =>
                            <ItemCarrito productoSeleccionado={producto}
                                key={index} />
                        )
                        :
                        <div className="sinProductos">
                            <i class="fas fa-shopping-cart iconoGrande"></i>
                            <br />
                            <br />
                            <h5>Ups! Tu carrito esta vacío! </h5>
                            <h6>Probá buscando productos por <Link to={''}>acá</Link> </h6>
                        </div>
                    }
                    <div classname="fotter">
                        <ul>
                            <span className="total"><h5>Total estimado</h5>
                                <h4 classname="totalCarrito">
                                    <NumberFormat value={this.getTotalCarrito()} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                </h4>
                            </span>
                        </ul>
                    </div>
                </ul>
            </div>
        );
    }
}
export default Carrito;