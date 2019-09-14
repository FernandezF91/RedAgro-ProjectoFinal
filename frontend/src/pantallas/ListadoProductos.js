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
            productos: []
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }
    componentDidMount() {
        var path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=" + this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    productos: data.map((item) => {
                        return {
 //                           id: item.id,
                            Categoría: item.producto.categoria,
                            Tipo: item.producto.tipo,
                            Titulo: item.titulo,
                            Descripcion: item.descripcion,
                            Stock: item.stock,
                            TipoDeUnidad: item.tipo_unidad,
                            TipoDeProduccion: item.tipo_produccion,
                            Precio: item.precio,
                            FechaDeVencimiento: item.fecha_vencimiento,
                            TiempoDePreparacion: item.tiempo_preparacion,
                        }
                    })
                })
            })
    }

    render() {
        return (

            <div>
                <div className="titulosPrincipales">Productos</div>
                <Producto productos = {this.state.productos}/>
            </div>
        );
    };
}
export default ListadoProductos;