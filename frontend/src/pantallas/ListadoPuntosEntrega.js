import React, { Component } from 'react';
import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import '../diseños/ListadoPuntosEntrega.css';
import Modal from 'react-awesome-modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const columnas = [
    {
        label: 'Descripción',
        field: 'Descripción'
    },
    {
        label: 'Provincia',
        field: 'Provincia'
    },
    {
        label: 'Localidad',
        field: 'Localidad'
    },
    {
        label: 'Dirección',
        field: 'Dirección'
    },
    {
        label: 'Fecha',
        field: 'Fechas'
    },
    {
        label: 'Habilitado',
        field: 'Dar de baja',
    }
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
            id_punto: ""
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.handleRowAccion = this.handleRowAccion.bind(this);
        this.actualizarEstadoPunto = this.actualizarEstadoPunto.bind(this);
        this.cargarFechas = this.cargarFechas.bind(this);
        this.cargarFilas = this.cargarFilas.bind(this);
        this.clickMostrarFechas = this.clickMostrarFechas.bind(this);
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

    cargarFechas(rowId) {
        var _this = this;
        fetch("http://localhost:3000/redAgro/fechas_punto_entrega?id_punto_entrega=" + rowId, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    _this.setState({
                        visible2: true,
                        accion: false,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intentá nuevamente"
                    });
                    return;
                }

                response.json().then(
                    function (response) {
                        response.forEach(element => {
                            _this.setState({ fechas_entrega: [..._this.state.fechas_entrega, element] });
                        });
                    });
            });
    }

    clickMostrarFechas(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({ expandedRows: newExpandedRows });
    }

    cargarFilas() {
        return this.state.puntos_entrega.map(punto => {
            const clickFechas = () => this.clickMostrarFechas(punto.id);
            const clickAltaBaja = () => this.handleRowAccion(punto.id, punto.activo);

            var itemRow = [<tr key={"row-data-" + punto.id} >
                <td>
                    {punto.descripcion}
                </td>
                <td>
                    {punto.provincia}
                </td>
                <td>
                    {punto.localidad}
                </td>
                <td>
                    {punto.direccion}
                </td>
                <td>
                    <i className="far fa-calendar-alt iconosTabla" title="Ver fechas" onClick={clickFechas} />
                </td>
                <td>
                    {
                        punto.activo === false ?
                            <i className="fa fa-times-circle rojo iconosTabla" onClick={clickAltaBaja} title="Baja" />
                            :
                            <i className="fa fa-check-circle verde iconosTabla" onClick={clickAltaBaja} title="Alta" />
                    }
                </td>
            </tr>
            ];

            if (this.state.expandedRows.includes(punto.id)) {
                const fechas_filtradas = this.state.fechas_entrega.filter(fecha => fecha.punto_entrega.id === punto.id)
                fechas_filtradas.forEach(fecha => {
                    itemRow.push(
                        <tr key={"row-expanded-" + punto.id}>
                            <td />
                            <td> {moment(fecha.fecha, 'DD-MM-YYYY').format('DD/MM/YYYY')} </td>
                            <td> {fecha.hora_inicio} </td>
                            <td> {fecha.hora_fin} </td>
                            <td />
                        </tr>
                    );
                }
                )
            }
            return itemRow;
        })
    }

    componentDidMount() {
        var _this = this;

        fetch("http://localhost:3000/redAgro/puntos_productor?id=" + this.state.id, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    _this.setState({
                        loading: false,
                        visible2: true,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intentá nuevamente"
                    });
                    return;
                }

                response.json().then(
                    function (response) {
                        _this.setState({ loading: false });
                        response.forEach(element => {
                            _this.setState({
                                puntos_entrega: [..._this.state.puntos_entrega, element]
                            })
                            _this.cargarFechas(element.id);
                        });
                    });
            });
    }

    render() {

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
                <div className="tabla_puntos">
                    {this.state.puntos_entrega.length > 0 ?
                        <MDBTable striped hover>
                            <MDBTableHead columns={columnas} />
                            <MDBTableBody>
                                {this.cargarFilas()}
                            </MDBTableBody>
                        </MDBTable>
                        :
                        <div className="sinPuntosDeVenta">
                            <i className="fas fa-map-marker-alt iconoGrande"></i>
                            <br />
                            <br />
                            <h5>Ups! No tenes puntos de venta cargados! </h5>
                            <h6>Cargá tus puntos de venta <Link to={'/principalProductores/IngresarPuntoEntrega'}>acá!</Link></h6>
                        </div>
                    }
                </div>
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
export default withRouter(ListadoPuntosEntrega);