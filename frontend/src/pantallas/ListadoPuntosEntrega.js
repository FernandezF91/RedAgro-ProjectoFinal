import '../diseños/EstilosGenerales.css';
import '../diseños/ListadoPuntosEntrega.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import PuntoDeEntrega from './PuntoDeEntrega';
import DetalleFechasEntrega from './DetalleFechasEntrega';
import Paginacion from './Paginacion';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';

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
            accion: "",
            expandedRows: [],
            id_punto: "",
            currentPage: 1,
            puntosPerPage: 5,
            defaultListado: [{ label: "5", value: "5" }],
            showModal: false,
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.handleRowAccion = this.handleRowAccion.bind(this);
        this.actualizarEstadoPunto = this.actualizarEstadoPunto.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    actualizarEstadoPunto() {
        const path_principal = "http://" + window.$ip + ":3000/redAgro/modificar_punto?id=" + this.state.id_punto + "&accion=" + this.state.accion;

        var _this = this;

        fetch(path_principal, {
            method: "PUT"
        })
            .then(function (response) {
                _this.setState({
                    showModal: false
                })
            })
        //TODO: cambiarlo para que solo actualice la parte del listado.
        window.location.reload();
    }

    handleRowAccion(rowId, activo) {
        if (activo === true) {
            this.setState({
                id_punto: rowId,
                accion: "Baja",
                showModal: true,
                titulo: "¿Estás seguro de que querés deshabilitar el punto de entrega?",
                mensaje: "Los puntos de entrega deshabilitados no estarán disponibles para ser seleccionados por los consumidores."
            })
        } else {
            this.setState({
                id_punto: rowId,
                accion: "Alta",
                showModal: true,
                titulo: "¿Estás seguro de que querés habilitar el punto de entrega?",
                mensaje: ""
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
            <tr key={"row-data-" + item.id} className="border-bottom">
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

    generoItemDeshabilitado(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const clickAltaBaja = () => this.handleRowAccion(item.id, item.activo);

        const itemRows = [
            <tr key={"row-data-" + item.id} title="Punto deshabilitado" className="border-bottom">
                <td className="productoInactivo">
                    {item.descripcion}
                </td>
                <td className="productoInactivo">
                    {item.provincia}
                </td>
                <td className="productoInactivo">
                    {item.localidad}
                </td>
                <td className="productoInactivo">
                    {item.direccion}
                </td>
                <td className="productoInactivo">
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

        var path = "http://" + window.$ip + ":3000/redAgro/listadoPuntosEntregaProductor?productor_id=" + this.state.id
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
            if (item.activo) {
                body.push(this.generoItem(item));
            } else {
                body.push(this.generoItemDeshabilitado(item));
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
                <div className="titulosPrincipales">Puntos de entrega</div>
                {
                    puntos_entrega.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="align-center">Puntos de entrega por página</span>
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
                {
                    <MDBModal isOpen={this.state.showModal} centered>
                        <div className="modalMargenes">
                            <div>
                                <i className="fas fa-exclamation-triangle iconoModalWarning" />
                                <br />
                                <br />
                                <h5>{this.state.titulo}</h5>
                                <h6 className="grey-text">{this.state.mensaje}</h6>
                            </div>
                            <div className="botonesModal">
                                <Button variant="light" type="submit" onClick={this.cerrarModal}>No</Button>
                                <Button variant="success" type="submit" onClick={this.actualizarEstadoPunto}>Si</Button>
                            </div>
                        </div>
                    </MDBModal>
                }
            </div >
        );
    };
}
export default ListadoPuntosEntrega;