import React, { Component } from 'react';
import Producto from './Producto';

class ListadoProductos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            errores: [],
            files: [],
            id: this.props.id_productor,
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    render() {
        return (

            <div>
                <div className="titulosPrincipales">Productos</div>
                <Producto />
            </div>
        );
    };
}
export default ListadoProductos;