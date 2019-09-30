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
            loading: true
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
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
        var tipoUsuario = this.props.rolUsuario;
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.id}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>{item.estado}</td>
                <td>Retira <i>{item.persona_retiro}</i> por <i>{item.punto_entrega}</i></td>
                {
                    (tipoUsuario === "Consumidor") ?
                        <td> {item.productor.nombre + " " + item.productor.apellido}<br />Tel: {item.productor.telefono}</td>
                        :
                        <td>{item.consumidor.nombre + " " + item.consumidor.apellido}<br />Tel: {item.consumidor.telefono}</td>
                }
                <td>
                    <NumberFormat value={item.total_reserva} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                </td>
                <td>
                    <i className="far fa-eye iconosTabla" title="Ver detalle reserva" />
                </td>
                <td>
                    <Link to={''}>
                        <i className="fas fa-comments iconosTabla" title="Ver mensajes" />
                    </Link>
                </td>
                <td>
                    <Link to={''}>
                        <i className="fas fa-ellipsis-v iconosTabla" title="Ver detalle reserva" />
                    </Link>
                </td>
            </tr>
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <DetalleReserva item={item} />
            );
        }
        return itemRows;
    }

    componentDidMount() {
        var path_usuario = "http://localhost:3000/redAgro/get_reservas_usuario?id=" + this.state.id;
        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    reservasRealizadas: data.map((item) => {
                        var fecha = new Date(item.fecha);
                        return {
                            id: item.id,
                            fecha: fecha.getDate().toString() + "/" + (fecha.getMonth() + 1).toString() + "/" + fecha.getFullYear().toString(),
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
                            total_reserva: item.total_reserva
                        }
                    }),
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
            </div>
        );
    };
}
export default ListadoReservas;