import '../diseños/Reservas.css';
import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Reserva from '../pantallas/Reserva';
import DetalleReserva from '../pantallas/DetalleReserva';
import Paginacion from './Paginacion';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const tamañosListado = [
    { label: "5", value: "5" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];

var defaultListado = [
    { label: "5", value: "5" },
];

class ListadoReservas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            errores: [],
            files: [],
            //Para el ruteo
            id: this.props.id_usuario,
            //A partir de aca, datos para el listado de reservas
            reservasRealizadas: [],
            currentPage: 1,
            reservasPerPage: 5,
            expandedRows: [],
            loading: true,
            showModal: false,
            listadoEstados: [],
            listadoFiltradoEstados: [],
            estadoSeleccionado: "",
            idReservaActualizar: 0
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.abrirModal = this.abrirModal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.filtrarEstadosAMostrar = this.filtrarEstadosAMostrar.bind(this);
        this.encontrarEstado = this.encontrarEstado.bind(this);
        this.cargarListadoDeEstados = this.cargarListadoDeEstados.bind(this);
        this.actualizarEstadoReserva = this.actualizarEstadoReserva.bind(this);
    }
    
    nextPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({ expandedRows: newExpandedRows });
    }

    generoItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const actualizacionEstado = () => this.abrirModalEstado(item.id, item.fechaDateTime, item.estado);
        var tipoUsuario = this.props.rolUsuario;
        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>{item.estado}</td>
                <td>Retira <i>{item.persona_retiro}</i> por <i>{item.punto_entrega}</i></td>
                {
                    (tipoUsuario === "Consumidor") ?
                        <td>
                            {item.productor.nombre + " " + item.productor.apellido}
                            <br />
                            Tel: {item.productor.telefono}
                        </td>
                        :
                        <td>
                            {item.consumidor.nombre + " " + item.consumidor.apellido}
                            <br />
                            Tel: {item.consumidor.telefono}
                        </td>
                }
                <td>
                    <NumberFormat value={item.total_reserva} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                </td>
                <td>
                    <i className="far fa-eye iconosTabla cursorManito" title="Ver detalle reserva" onClick={clickCallback} key={"row-data-" + item.id} />
                </td>
                <td id="estado">
                    {(item.estado === "Finalizado") || (item.estado === "Cancelado") ?
                        //TODO: ver como habilitar para el consumidor
                        //no se puede editar el estado. Se deshabilita
                        <i className="fas fa-edit iconosTabla iconosTablaDeshabilitados" title="No se pueden actualizar reservas terminadas" />
                        :
                        <i className="fas fa-edit iconosTabla cursorManito" title="Actualizar el estado" onClick={actualizacionEstado} key={"row-data-" + item.id} />
                    }
                </td>
                <td>
                    <Link to={''}>
                        <i className="fas fa-comments iconosTabla cursorManito" title="Ver mensajes" />
                    </Link>
                </td>
            </tr >
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <DetalleReserva item={item} />
            );
        }
        return itemRows;
    }

    cargarListadoDeEstados() {
        var path = "http://localhost:3000/redAgro/obtenerEstadosReserva";
        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
            })
            .then(data => {
                if (data !== void (0)) {
                    this.setState({
                        listadoEstados: data.map((item) => {
                            return {
                                label: item.nombre,
                                value: item.id
                            }
                        })
                    })
                }
            })
    }

    componentDidMount() {
        var _this = this;
        _this.cargarListadoDeEstados();

        var path_usuario = "http://localhost:3000/redAgro/get_reservas_usuario?id=" + _this.state.id;
        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
            })
            .then(data => {
                if (data !== void (0)) {
                    _this.setState({
                        reservasRealizadas: data.map((item) => {
                            return {
                                id: item.id,
                                fecha: moment(item.fecha).format('DD/MM/YYYY'),
                                forma_retiro: item.forma_retiro,
                                persona_retiro: item.persona_retiro,
                                punto_entrega: item.punto_entrega.direccion + " " + item.punto_entrega.cod_postal + " " + item.punto_entrega.localidad,
                                consumidor: {
                                    id: item.consumidor.id,
                                    nombre: item.consumidor.usuario.nombre,
                                    apellido: item.consumidor.usuario.apellido,
                                    telefono: item.consumidor.usuario.telefono,
                                },
                                productor: {
                                    id: item.productor.id,
                                    razon_social: item.productor.razon_social,
                                    nombre: item.productor.usuario.nombre,
                                    apellido: item.productor.usuario.apellido,
                                    telefono: item.productor.usuario.telefono,
                                },
                                detalleReserva: item.detalleReserva,
                                estado: item.estado_reserva.nombre,
                                total_reserva: item.total_reserva,
                                fechaDateTime: item.fecha
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        if (tamaño.value === "Todo") {
            this.setState({ reservasPerPage: this.state.reservasRealizadas.length })
        } else {
            this.setState({ reservasPerPage: tamaño.value })
        }
        actualizarListado.push(tamaño);
        defaultListado = actualizarListado;
    }

    actualizarEstado = (nuevoEstado) => {
        this.setState({
            estadoSeleccionado: nuevoEstado
        });
    }

    actualizarEstadoReserva() {
        var _this = this;
        _this.setState({
            loading: true
        })

        var path = "http://localhost:3000/redAgro/actualizarEstadoReserva?id_reserva=" + _this.state.idReservaActualizar + "&id_estado=" + _this.state.estadoSeleccionado.value;
        fetch(path, {
            method: "PUT"
        })
            .then(function (response) {
                _this.setState({
                    loading: false,
                    showModal: false,
                    estadoSeleccionado: ""
                })
                _this.forceUpdate();
                return;
            })
    }

    filtrarEstadosAMostrar(fecha, estadoActual) {
        fecha = moment(fecha).add(2, "days");

        var est = this.encontrarEstado(estadoActual);
        this.setState({
            listadoFiltradoEstados: this.state.listadoEstados.filter((estado) => {
                if (estado.value >= est.value) {
                    if (this.props.rolUsuario === "Consumidor" && estado.value < 3) {
                        return;
                    } else {
                        return estado;
                    }
                    //TODO: Solo permitir cancelar cuando queden 1 y 2 dias dependiendo si es productor o consumidor
                    /* if (estado.label === "Cancelado" && fecha.diff("2019-10-07", "days") >= 2) {
                        return estado;
                    } else {
                        return estado;
                    } */
                }
            })
        })
    }

    encontrarEstado(nombreEstado) {
        return this.state.listadoEstados.find((item) => {
            return item.label === nombreEstado;
        })
    }

    abrirModalEstado = (idReserva, fecha, estadoActual) => {
        this.filtrarEstadosAMostrar(fecha, estadoActual);
        this.setState({
            estadoSeleccionado: this.encontrarEstado(estadoActual),
            idReservaActualizar: idReserva
        })
        this.abrirModal();
    }

    abrirModal() {
        this.setState({
            showModal: true
        })
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        const { reservasRealizadas, currentPage, reservasPerPage } = this.state;
        const numberOfPages = Math.ceil(reservasRealizadas.length / reservasPerPage);
        const indexOfLastReserva = currentPage * reservasPerPage;
        const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;
        const lista = reservasRealizadas.slice(indexOfFirstReserva, indexOfLastReserva);
        const rolUsuario = this.props.rolUsuario;
        let body = [];
        lista.forEach(item => {
            body.push(this.generoItem(item));
        })

        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />;

        return (
            <div>
                <div className="titulosPrincipales">Reservas</div>
                {
                    reservasRealizadas.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="tituloCantidad">Reservas por página</span>
                            <Select className="cantidadProductos"
                                value={defaultListado}
                                options={tamañosListado}
                                onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                        </div>
                        : ''
                }
                <Reserva lista={body}
                    rolUsuario={rolUsuario} />
                {
                    reservasRealizadas.length > reservasPerPage ?
                        <Paginacion
                            pages={numberOfPages}
                            nextPage={this.nextPage}
                            currentPage={this.state.currentPage} />
                        : ''
                }
                {
                    (this.state.showModal) &&
                    <MDBModal isOpen={this.state.showModal} centered>
                        <MDBModalHeader>Estado de la reserva</MDBModalHeader>
                        <MDBModalBody>
                            <div className="actualizacionEstado">
                                <span className="tituloActualizacionEstado">Estado</span>
                                <Select
                                    className="selectEstado"
                                    placeholder="Seleccione un estado"
                                    value={this.state.estadoSeleccionado}
                                    options={this.state.listadoFiltradoEstados}
                                    onChange={nuevoEstado => this.actualizarEstado(nuevoEstado)}
                                />
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <Button variant="light" onClick={this.cerrarModal}>Cancelar</Button>
                                <Button variant="success" type="submit" onClick={this.actualizarEstadoReserva}>Guardar</Button>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                }
            </div>
        );
    };
}
export default ListadoReservas;