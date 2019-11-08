import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Calificacion from '../pantallas/Calificacion';
import Paginacion from './Paginacion';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Select from 'react-select';
import BeautyStars from 'beauty-stars';
import moment from 'moment';

const tamañosListado = [
    { label: "5", value: "5" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "Todo", value: "Todo" },
];

class ListadoCalificaciones extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_productor: this.props.id_productor,
            calificacionesRecibidas: [],
            currentPage: 1,
            calificacionesPerPage: 5,
            defaultListado: [{ label: "5", value: "5" }],
            loading: true
        }
    }

    nextPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    generoItem(item) {
        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>{item.reserva}</td>
                <td>{item.fecha}</td>
                <td>{item.estado}</td>
                <td>
                    <div className="columnaTablaCentrada">
                        <BeautyStars
                            value={item.valor}
                            activeColor="#28A745"
                            inactiveColor="#CCC"
                            size="16px"
                        />
                    </div>
                </td>
                <td>
                    {(item.comentario.length > 0) ?
                        item.comentario
                        :
                        "-"
                    }
                </td>
                <td>{item.nombre_consumidor} {item.apellido_consumidor}</td>
            </tr >
        ];
        return itemRows;
    }

    componentDidMount() {
        var _this = this;

        var path = "redAgro/obtenerCalificaciones?id_productor=" + _this.state.id_productor;
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

                    _this.setState({
                        calificacionesRecibidas: data.map((item) => {
                            return {
                                id: item.id,
                                fecha: moment(item.fechaCalificacion, 'YYYY-MM-DD').format("DD/MM/YYYY"),
                                valor: item.valor,
                                comentario: item.comentario,
                                reserva: item.reserva,
                                estado: item.estado,
                                nombre_consumidor: item.nombreConsumidor,
                                apellido_consumidor: item.apellidoConsumidor
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    render() {
        const { calificacionesRecibidas, currentPage, calificacionesPerPage, defaultListado } = this.state;
        const numberOfPages = Math.ceil(calificacionesRecibidas.length / calificacionesPerPage);
        const indexOfLastCalificacion = currentPage * calificacionesPerPage;
        const indexOfFirstCalificacion = indexOfLastCalificacion - calificacionesPerPage;
        const lista = calificacionesRecibidas.slice(indexOfFirstCalificacion, indexOfLastCalificacion);

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
                <div className="titulosPrincipales">Calificaciones</div>
                {
                    calificacionesRecibidas.length > 0 ?
                        <div className="opcionesCantidad">
                            <span className="align-center">Calificaciones por página</span>
                            <Select className="cantidadItemsListado"
                                value={defaultListado}
                                options={tamañosListado}
                                onChange={nuevoTamaño => this.actualizarTamañoListado(nuevoTamaño)} />
                        </div>
                        : ''
                }
                <Calificacion
                    lista={body}
                />
                {
                    calificacionesRecibidas.length > calificacionesPerPage ?
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
export default ListadoCalificaciones;