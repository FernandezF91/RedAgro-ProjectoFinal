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

    handleRowClick(rowId) {
        //TODO
    }

    generoItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.id}>
                 <td>
                    <i className="fas fa-edit" title="Editar producto" />
                </td>
                <td>{item.categoria}</td>
                <td>{item.tipo}</td>
                <td>{item.titulo}</td>
                <td>{item.descripcion}</td>
                <td>{item.stock}</td>
                <td>{item.tipoDeUnidad}</td>
                <td>{item.tipoDeProduccion}</td>
                <td>{item.precio}</td>
                <td>{item.fechaDeVencimiento}</td>
                <td>{item.tiempoDePreparacion}</td>
            </tr>
        ];
        return itemRows;
    }
    
    componentDidMount() {
        var path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=" + this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    productos: data.map((item) => {
                        var fecha = new Date (item.fecha_vencimiento);
                        return {
                            id: item.id,
                            categoria: item.producto.categoria,
                            tipo: item.producto.tipo,
                            titulo: item.titulo,
                            descripcion: item.descripcion,
                            stock: item.stock,
                            tipoDeUnidad: item.tipo_unidad,
                            tipoDeProduccion: item.tipo_produccion,
                            precio: item.precio,
                            fechaDeVencimiento: fecha.getDate().toString() +"/" + (fecha.getMonth() + 1).toString() +"/"+ fecha.getFullYear().toString(),
                            tiempoDePreparacion: item.tiempo_preparacion,
                        }
                    })
                })
            })
    }

    render() {
        const { productos } = this.state;
        let body = [];
        productos.forEach(item => {
            body.push(this.generoItem(item));
        })

        return (

            <div>
                <div className="titulosPrincipales">Productos</div>
                <Producto productos = {body}/>
            </div>
        );
    };
}
export default ListadoProductos;