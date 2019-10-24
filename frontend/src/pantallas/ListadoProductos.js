import React, { Component } from 'react';
import Producto from './Producto';
import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Button from 'react-bootstrap/Button';
import { InputGroup, FormControl } from 'react-bootstrap';

class ListadoProductos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            errores: [],
            files: [],
            id: this.props.id_productor,
            productos: [],
            loading: true,
            showModal: false,
            idProductoOferta: 0,
            porcentaje: 0,
            idOferta: 0,
            checkOferta: true
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.abrirModal = this.abrirModal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.guardarOferta = this.guardarOferta.bind(this);
        this.handleCheckChangeActivo = this.handleCheckChangeActivo.bind(this);
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

    generoItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const cargarOferta = () => this.abrirModalOferta(item.id, item.precio, item.oferta);

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
                <td>
                    <i className="fas fa-percentage iconosTabla cursorManito" onClick={cargarOferta} key={"row-data-" + item.id} title="Cargar una oferta" />
                </td>
            </tr>
        ];

        return itemRows;
    }

    abrirModalOferta = (idProductoProductor, precioActual, oferta) => {
        var idOferta = 0
        if (oferta !== undefined) {
            idOferta = oferta.id
        }
        this.setState({
            idProductoOferta: idProductoProductor,
            idOferta: idOferta,
            precioActual: precioActual
        })
        this.abrirModal();
    }

    abrirModal() {
        console.log(this.state.idOferta);
        this.setState({
            showModal: true
        })
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    detectarCambios(e) {
        this.setState({
            porcentaje: e.target.value
        })
    }

    guardarOferta() {
        var _this = this;
        _this.setState({
            loading: true
        })

        var path = "http://localhost:3000/redAgro/guardarOferta?id_producto_productor=" + _this.state.idProductoOferta + "&porcentaje=" + _this.state.porcentaje + "&activo=" + _this.state.checkOferta;
        fetch(path, {
            method: "PUT"
        })
            .then(function (response) {
                _this.setState({
                    showModal: false,
                    estadoSeleccionado: ""
                })
            })
        //TODO: cambiarlo para que solo actualice la parte del listado.

        window.location.reload();
    }


    handleCheckChangeActivo(e) {
        if (e.target.checked === true) {
            this.setState({
                checkOferta: true,
                disabledOferta: false
            });
        } else {
            this.setState({
                checkOferta: false,
                disabledOferta: true
            });
        }

    };

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
                            oferta: item.oferta
                        }
                    }),
                    loading: false
                })
            })
    }

    render() {
        const { productos } = this.state;
        let body = [];
        productos.forEach(item => {
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
                <div>
                    <div className="titulosPrincipales">Productos</div>
                    <Producto productos={body} />
                </div>
                {
                    (this.state.showModal) &&
                    <MDBModal isOpen={this.state.showModal} centered>
                        <MDBModalHeader>
                            Oferta
                            <div className="cruzCerrar">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                            </div>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="alineacionIzquierda">
                                <label className="checkbox-inline">
                                    <input
                                        type="checkbox"
                                        value="checkOferta"
                                        className="checkbox-input checkbox"
                                        checked={this.state.checkOferta}
                                        onChange={this.handleCheckChangeActivo}
                                    />
                                    Activar oferta</label>
                            </div>
                            <br />
                            <h6>Precio actual: <NumberFormat value={this.state.precioActual} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /></h6>
                            <br />
                            <div className="modalActualizaciones alineacionIzquierda">
                                <span className="tituloCampoModal">Porcentaje de descuento</span>
                                <InputGroup className="campoOferta">
                                    <FormControl
                                        value={this.state.campos["porcentaje"]}
                                        type="integer"
                                        name="porcentajeCampo"
                                        min="1"
                                        max="100"
                                        onChange={(e) => this.detectarCambios(e)}
                                        disabled={this.state.disabledOferta}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text className="iconoPrecio sinBorde">%</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            <br />
                            <h6>Nuevo precio: <NumberFormat value={this.state.precioActual - (this.state.precioActual * this.state.porcentaje) / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> </h6>
                            <br />
                            <div className="row justify-content-center">
                                <Button variant="success" type="submit" onClick={this.guardarOferta}>Guardar</Button>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                }
            </div >
        );
    };
}
export default ListadoProductos;