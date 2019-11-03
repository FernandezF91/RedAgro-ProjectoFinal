import '../diseños/estilosGlobales.css';
import '../diseños/ListadoPuntosEntrega.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import PuntoDeEntrega from './PuntoDeEntrega';
import DetalleFechasEntrega from './DetalleFechasEntrega';
import Paginacion from './Paginacion';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import Modal from 'react-awesome-modal';

const tamañosListado = [
    { label: "5", value: "5" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];

class ListadoPuntosEntrega extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_productor,
            puntos_entrega: [],
            fechas_entrega: [],
            loading: true,
            titulo: "",
            mensaje: "",
            visible: "",
            visible2: "",
            accion: "",
            expandedRows: [],
            id_punto: "",
            currentPage: 1,
            puntosPerPage: 5,
            defaultListado: [{ label: "5", value: "5" }]
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.handleRowAccion = this.handleRowAccion.bind(this);
        this.actualizarEstadoPunto = this.actualizarEstadoPunto.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    actualizarEstadoPunto(accion) {
        const path_principal = "http://localhost:3000/redAgro/modificar_punto?id=" + this.state.id_punto + "&accion=" + accion;

        var _this = this;

        fetch(path_principal, {
            method: "PUT"
        })
            .then(function (response) {
                if (response.status !== 200) {
                    let mensajeError = "Ocurrió algún error inesperado. Intentá nuevamente"
                    _this.setState({
                        visible2: true,
                        titulo: "Error",
                        mensaje: mensajeError
                    });
                    return;
                }

                response.text().then(
                    function (response) {
                        _this.setState({
                            visible2: true,
                            titulo: "Actualización exitosa",
                            mensaje: "",
                            actualizacion: "Ok"
                        });
                    });
            });
    }

    closeModal() {
        if (this.state.accion !== "") {
            this.actualizarEstadoPunto(this.state.accion)
            this.setState({
                visible: false,
                accion: ""
            })
        }

        if (this.state.actualizacion === "Ok") {
            this.mostrarPantallaPrincipal();
            return;
        }

        this.setState({
            visible2: false
        })
    }

    closeModalNo() {
        this.setState({
            visible: false,
            accion: ""
        })
    }

    handleRowAccion(rowId, activo) {
        if (activo === true) {
            this.setState({
                id_punto: rowId,
                accion: "Baja",
                visible: true,
                titulo: "Baja de punto de entrega",
                mensaje: "¿Estás seguro que no vas a vender/entregar tus productos en esta ubicación?"
            })
        } else {
            this.setState({
                id_punto: rowId,
                accion: "Alta",
                visible: true,
                titulo: "Alta de punto de entrega",
                mensaje: "¿Estás seguro que vas a vender/entregar tus productos en esta ubicación?"
            })
        }
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({ 
            expandedRows: newExpandedRows 
        });
    }

    generoItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const clickAltaBaja = () => this.handleRowAccion(item.id, item.activo);

        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>
                    {item.descripcion}
                </td>
                <td>
                    {item.provincia}
                </td>
                <td>
                    {item.localidad}
                </td>
                <td>
                    {item.direccion}
                </td>
                <td>
                    <i className="far fa-calendar-alt iconosTabla cursorManito" title="Ver fechas" onClick={clickCallback} />
                </td>
                <td>
                    {
                        item.activo === false ?
                            <i className="fa fa-times-circle rojo iconosTabla cursorManito" onClick={clickAltaBaja} title="Baja" />
                            :
                            <i className="fa fa-check-circle verde iconosTabla cursorManito" onClick={clickAltaBaja} title="Alta" />
                    }
                </td>
            </tr>
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <DetalleFechasEntrega item={item} />
            );
        }
        return itemRows;
    }

    componentDidMount() {
        var _this = this;

        var path = "http://localhost:3000/redAgro/listadoPuntosEntregaProductor?productor_id=" + this.state.id
        fetch(path, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
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
                        puntos_entrega: data.map((item) => {
                            return {
                                id: item.id,
                                productor: item.productor,
                                fechas_entrega: item.fechas_entrega,
                                descripcion: item.descripcion,
                                pais: item.pais,
                                provincia: item.provincia,
                                localidad: item.localidad,
                                codigoPostal: item.cod_postal,
                                direccion: item.direccion,
                                latitud: item.latitud,
                                longitud: item.longitud,
                                activo: item.activo
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    nextPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    actualizarTamañoListado = (tamaño) => {
        let actualizarListado = [];
        actualizarListado.push(tamaño);
        if (tamaño.value === "Todo") {
            this.setState({
                puntosPerPage: this.state.puntos_entrega.length
            })
        } else {
            this.setState({
                puntosPerPage: tamaño.value
            })
        }
        this.setState({
            defaultListado: actualizarListado
        });
    }

    render() {
        const { puntos_entrega, puntosPerPage, currentPage, defaultListado } = this.state;
        const numberOfPages = Math.ceil(puntos_entrega.length / puntosPerPage);
        const indexOfLastPunto = currentPage * puntosPerPage;
        const indexOfFirstPunto = indexOfLastPunto - puntosPerPage;
        const lista = puntos_entrega.slice(indexOfFirstPunto, indexOfLastPunto);
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
                <div className="titulosPrincipales">Puntos de entrega</div>
                {
                    puntos_entrega.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="tituloCantidad">Puntos de entrega por página</span>
                            <Select className="cantidadItemsListado"
                                value={defaultListado}
                                options={tamañosListado}
                                onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                        </div>
                        : ''
                }
                <PuntoDeEntrega puntosDeEntrega={body} />
                {
                    puntos_entrega.length > puntosPerPage ?
                        <Paginacion
                            pages={numberOfPages}
                            nextPage={this.nextPage}
                            currentPage={this.state.currentPage} />
                        : ''
                }
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="230"
                        effect="fadeInUp"
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>
                                {this.state.mensaje}
                            </p>
                            <Button variant="success" onClick={() => this.closeModal()}>Si</Button>
                            <Button variant="success" onClick={() => this.closeModalNo()}>No</Button>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.visible2}
                        width="400"
                        height="120"
                        effect="fadeInUp"
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>
                                {this.state.mensaje}
                            </p>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}
export default ListadoPuntosEntrega;