import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Producto from './Producto';
import Paginacion from './Paginacion';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const tamañosListado = [
    { label: "5", value: "5" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];

class ListadoProductos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            errores: [],
            files: [],
            id: this.props.id_productor,
            productos: [],
            currentPage: 1,
            productosPerPage: 5,
            defaultListado: [{ label: "5", value: "5" }],
            loading: true
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
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
                <td>{item.categoria}</td>
                <td>{item.tipo}</td>
                <td>{item.titulo}</td>
                <td>{item.descripcion}</td>
                <td>{item.stock}</td>
                <td>{item.tipoDeUnidad}</td>
                <td>{item.tipoDeProduccion}</td>
                <td className="columnaPrecio">
                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                </td>
                <td>{item.fechaDeVencimiento}</td>
                <td>{item.tiempoDePreparacion}</td>
                <td>
                    <i className="fas fa-edit iconosTabla cursorManito" title="Editar producto" />
                </td>
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
                        var fecha = "-";
                        if (item.fecha_vencimiento !== null) {
                            fecha = moment(item.fecha_vencimiento).format('DD/MM/YYYY')
                        }

                        return {
                            id: item.id,
                            categoria: item.producto.categoria,
                            tipo: item.producto.tipo,
                            titulo: item.titulo,
                            descripcion: item.descripcion,
                            stock: item.stock,
                            tipoDeUnidad: item.unidad_venta,
                            tipoDeProduccion: item.tipo_produccion,
                            precio: item.precio,
                            fechaDeVencimiento: fecha,
                            tiempoDePreparacion: item.tiempo_preparacion,
                        }
                    }),
                    loading: false
                })
            })
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        actualizarListado.push(tamaño);
        if (tamaño.value === "Todo") {
            this.setState({ productosPerPage: this.state.productos.length })
        } else {
            this.setState({ productosPerPage: tamaño.value })
        }
        this.setState({ defaultListado: actualizarListado });
    }

    nextPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    render() {
        const { productos, productosPerPage, currentPage, defaultListado } = this.state;
        const numberOfPages = Math.ceil(productos.length / productosPerPage);
        const indexOfLastReserva = currentPage * productosPerPage;
        const indexOfFirstReserva = indexOfLastReserva - productosPerPage;
        const lista = productos.slice(indexOfFirstReserva, indexOfLastReserva);
        let body = [];
        lista.forEach(item => {
            body.push(this.generoItem(item));
        })

        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
        )

        return (
            <div>
                <div className="titulosPrincipales">Productos</div>
                {
                    productos.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="tituloCantidad">Productos por página</span>
                            <Select className="cantidadProductos"
                                value={defaultListado}
                                options={tamañosListado}
                                onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                        </div>
                        : ''
                }
                <Producto productos={body} />
                {
                    productos.length > productosPerPage ?
                        <Paginacion
                            pages={numberOfPages}
                            nextPage={this.nextPage}
                            currentPage={this.state.currentPage} />
                        : ''
                }
            </div>
        );
    };
}
export default ListadoProductos;