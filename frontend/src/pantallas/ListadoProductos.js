import '../diseños/EstilosGenerales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Producto from './Producto';
import Paginacion from './Paginacion';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { InputGroup, Form, Button } from 'react-bootstrap';

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
            id: this.props.id_productor,
            productos: [],
            loading: true,
            showModalOferta: false,
            idProductoOferta: 0,
            porcentaje: 0,
            idOferta: null,
            checkOferta: false,
            currentPage: 1,
            productosPerPage: 5,
            defaultListado: [{ label: "5", value: "5" }],
            showModalEstado: false,
            activo: true,
            mensajeErrorOferta: ""
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.cerrarModalOferta = this.cerrarModalOferta.bind(this);
        this.cerrarModalEstado = this.cerrarModalEstado.bind(this);
        this.guardarOferta = this.guardarOferta.bind(this);
        this.guardarEstadoProducto = this.guardarEstadoProducto.bind(this);
        this.handleCheckChangeActivoOferta = this.handleCheckChangeActivoOferta.bind(this);
        this.redireccionarProductoAEditar = this.redireccionarProductoAEditar.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }

    handleRowClick(rowId) {
        //TODO
    }

    generoItemActivo(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const cargarOferta = () => this.abrirModalOferta(item.id, item.precio, item.oferta);
        const editarProducto = () => this.editarProducto(item);
        const abrirModalEstadoProducto = () => this.abrirModalEstadoProducto(item.id, item.activo);

        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.id} className="border-bottom">
                <td>{item.categoria}</td>
                <td>{item.tipo}</td>
                <td className="overflowTexto anchoColumnaTituloProductos" title={item.titulo}>
                    {item.titulo}
                </td>
                <td>{item.descripcion}</td>
                <td>{item.stock}</td>
                <td>{item.tipoDeUnidad}</td>
                <td>{item.tipoDeProduccion}</td>
                <td className="columnaPrecio">
                    {
                        (item.oferta === null || item.oferta === undefined) ?
                            <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                            :
                            (item.oferta.activo) ?
                                <div title="Producto en oferta">
                                    <strike>
                                        <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                    </strike>
                                    <br />
                                    <NumberFormat value={item.precio - item.precio * item.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                </div>
                                :
                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    }
                </td>
                <td>{item.fechaDeVencimiento}</td>
                <td>{item.tiempoDePreparacion}</td>
                <td>
                    <i className="fas fa-edit iconosTabla cursorManito" onClick={editarProducto} title="Editar producto" />
                </td>
                <td>
                    <i className="fas fa-percentage iconosTabla cursorManito" onClick={cargarOferta} key={"row-data-" + item.id} title="Cargar una oferta" />
                </td>
                <td>
                    <i className="fas fa-toggle-on iconosTabla cursorManito" onClick={abrirModalEstadoProducto} key={"row-data-" + item.id} title="Desactivar producto" />
                </td>
            </tr>
        ];
        return itemRows;
    }

    generoItemInactivo(item) {
        const abrirModalEstadoProducto = () => this.abrirModalEstadoProducto(item.id, item.activo);

        const itemRows = [
            <tr key={"row-data-" + item.id} title="Producto inactivo" className="border-bottom">
                <td className="productoInactivo">{item.categoria}</td>
                <td className="productoInactivo">{item.tipo}</td>
                <td className="productoInactivo overflowTexto anchoColumnaTituloProductos" title={item.titulo}>
                    {item.titulo}
                </td>
                <td className="productoInactivo">{item.descripcion}</td>
                <td className="productoInactivo">{item.stock}</td>
                <td className="productoInactivo">{item.tipoDeUnidad}</td>
                <td className="productoInactivo">{item.tipoDeProduccion}</td>
                <td className="productoInactivo columnaPrecio">
                    {
                        (item.oferta === null || item.oferta === undefined) ?
                            <NumberFormat className="productoInactivo" value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                            :
                            (item.oferta.activo) ?
                                <div className="productoInactivo">
                                    <strike>
                                        <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                    </strike>
                                    <br />
                                    <NumberFormat value={item.precio - item.precio * item.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                </div>
                                :
                                <NumberFormat className="productoInactivo" value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    }
                </td>
                <td className="productoInactivo">{item.fechaDeVencimiento}</td>
                <td className="productoInactivo">{item.tiempoDePreparacion}</td>
                <td className="productoInactivo">
                    <i className="fas fa-edit iconosTabla" />
                </td>
                <td className="productoInactivo">
                    <i className="fas fa-percentage iconosTabla" key={"row-data-" + item.id} />
                </td>
                <td>
                    <i className="fas fa-toggle-off iconosTabla cursorManito" onClick={abrirModalEstadoProducto} key={"row-data-" + item.id} title="Activar producto" />
                </td>
            </tr>
        ];
        return itemRows;
    }

    editarProducto = (productoAEditar) => {
        this.setState(
            { productoAEditar: productoAEditar },
            this.redireccionarProductoAEditar
        );
    }

    redireccionarProductoAEditar() {
        this.props.editarProductoProductor(this.state.productoAEditar);
    }

    abrirModalOferta = (idProductoProductor, precioActual, oferta) => {
        if (oferta !== null) {
            this.setState({
                idProductoOferta: idProductoProductor,
                disabledOferta: !oferta.activo,
                checkOferta: oferta.activo,
                porcentaje: oferta.porcentaje,
                idOferta: oferta.id,
                precioActual: precioActual,
            })

        } else {
            this.setState({
                idProductoOferta: idProductoProductor,
                disabledOferta: true,
                checkOferta: false,
                porcentaje: 0,
                idOferta: null,
                precioActual: precioActual,
            })
        }

        this.setState({
            showModalOferta: true
        })
    }

    cerrarModalOferta() {
        this.setState({
            showModalOferta: false
        })
    }

    detectarCambios(e) {
        this.setState({
            porcentaje: e.target.value,
            mensajeErrorOferta: ""
        })
    }

    validarPorcentaje() {
        if (!this.state.checkOferta) {
            return true;
        }

        if (this.state.checkOferta && this.state.porcentaje === null) {
            this.setState({
                mensajeErrorOferta: "Campo requerido"
            })
            return false;
        }

        if (this.state.checkOferta && this.state.porcentaje === "") {
            this.setState({
                mensajeErrorOferta: "Campo requerido"
            })
            return false;
        }

        if (this.state.checkOferta && (this.state.porcentaje > 100 || this.state.porcentaje <= 0)) {
            this.setState({
                mensajeErrorOferta: "Porcentaje inválido"
            })
            return false;
        }

        return true;

    }

    guardarOferta() {
        if (this.validarPorcentaje()) {
            var _this = this;

            var path = "http://"+window.$ip+":3000/redAgro/guardarOferta?id_producto_productor=" + _this.state.idProductoOferta + "&porcentaje=" + _this.state.porcentaje + "&activo=" + _this.state.checkOferta + "&id_oferta=";
            if (_this.state.idOferta === null || _this.state.idOferta === undefined) {
                path += "0";
            } else {
                path += _this.state.idOferta;
            }
            fetch(path, {
                method: "PUT"
            })
                .then(function (response) {
                    _this.setState({
                        showModalOferta: false,
                        mensajeErrorOferta: ""
                    })
                })
            //TODO: cambiarlo para que solo actualice la parte del listado.
            window.location.reload();
        }
    }

    handleCheckChangeActivoOferta(e) {
        if (e.target.checked === true) {
            this.setState({
                checkOferta: true,
                disabledOferta: false
            });
        } else {
            this.setState({
                checkOferta: false,
                disabledOferta: true,
                porcentaje: 0
            });
        }
    };

    abrirModalEstadoProducto = (idProductoProductor, activo) => {
        this.setState({
            showModalEstado: true,
            idProductoProductor: idProductoProductor,
            activo: activo
        });
    }

    guardarEstadoProducto() {
        var nuevoEstado = true;
        if (this.state.activo) {
            nuevoEstado = false;
        }
        const path = "http://"+window.$ip+":3000/redAgro/actualizarEstadoProducto?id_producto_productor=" + this.state.idProductoProductor + "&activo=" + nuevoEstado;
        fetch(path,
            {
                method: "PUT"
            }
        )
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    response.text().then(

                        this.setState({
                            showModalEstado: false
                        })
                    )
                }
                window.location.reload();
            })
    }

    cerrarModalEstado() {
        this.setState({
            showModalEstado: false
        })
    }

    componentDidMount() {
        var path = "http://"+window.$ip+":3000/redAgro/obtenerProductosProductor?id=" + this.state.id;
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
                            oferta: item.oferta,
                            contenido: item.contenido,
                            imagenes: item.imagenes,
                            activo: item.activo
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
            if (item.activo) {
                body.push(this.generoItemActivo(item));
            }
            else {
                body.push(this.generoItemInactivo(item));
            }
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
                <div>
                    <div className="titulosPrincipales">Productos</div>
                    {
                        productos.length > 0 ?
                            <div className="opcionesCantidad">
                                <span className="align-center">Productos por página</span>
                                <Select className="cantidadItemsListado"
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
                {
                    (this.state.showModalOferta) &&
                    <MDBModal isOpen={this.state.showModalOferta} centered>
                        <MDBModalHeader>
                            Oferta
                            <div className="cruzCerrar">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalOferta} />
                            </div>
                        </MDBModalHeader>
                        <MDBModalBody className="alineacionIzquierda">
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    value="checkbox"
                                    className="checkbox-input checkbox"
                                    checked={this.state.checkOferta}
                                    onChange={this.handleCheckChangeActivoOferta}
                                />Activar oferta
                            </label>
                            <br />
                            <br />
                            <h6>Precio actual: &nbsp;
                                <b>
                                    <NumberFormat value={this.state.precioActual} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                </b>
                            </h6>
                            <br />
                            <div className="modalActualizaciones">
                                <span className="tituloCampoModal">Porcentaje de descuento</span>
                                <InputGroup className="campoOferta">
                                    <Form.Control
                                        value={this.state.porcentaje}
                                        type="number"
                                        name="porcentajeCampo"
                                        min="1"
                                        max="100"
                                        onChange={(e) => this.detectarCambios(e)}
                                        disabled={this.state.disabledOferta}
                                        className="inputDerecha"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text className="iconoInputGroupBordeIzquierdo">%</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                {
                                    (this.state.mensajeErrorOferta !== "") &&
                                    <div className="mensajeErrorForm">
                                        <i className="fa fa-exclamation-circle" title={this.state.mensajeErrorOferta} />
                                    </div>
                                }
                            </div>
                            <br />
                            <h6>Nuevo precio: &nbsp;
                                <b>
                                    {
                                        (this.state.porcentaje > 100 || this.state.porcentaje < 0) ?
                                            "-"
                                            :
                                            <NumberFormat value={this.state.precioActual - (this.state.precioActual * this.state.porcentaje) / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                    }
                                </b>
                            </h6>
                            <br />
                            <div className="row justify-content-center">
                                <Button variant="success" type="submit" onClick={this.guardarOferta}>Guardar</Button>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                }
                {
                    (this.state.showModalEstado) &&
                    <MDBModal isOpen={this.state.showModalEstado} centered>
                        <div className="modalMargenes">
                            <br />
                            <div>
                                <i className="fas fa-exclamation-triangle iconoModalWarning" />
                                <br />
                                <br />
                                {
                                    (this.state.activo) ?
                                        <div>
                                            <h5>¿Estás seguro de que querés desactivar el producto?</h5>
                                            <h6 className="grey-text">Los productos desactivados no estarán disponibles para la búsqueda y generación de nuevas reservas.</h6>
                                        </div>
                                        :
                                        <h5>¿Estás seguro de que querés activar el producto?</h5>
                                }
                            </div>
                            <div className="botones">
                                <Button variant="light" type="submit" onClick={this.cerrarModalEstado}>No</Button>
                                <Button variant="success" type="submit" onClick={this.guardarEstadoProducto}>Si</Button>
                            </div>
                        </div>
                    </MDBModal>
                }
            </div>
        );
    };
}
export default ListadoProductos;