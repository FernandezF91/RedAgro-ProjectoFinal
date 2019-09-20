import '../diseños/Reservas.css';
import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Reserva from '../pantallas/Reserva';
import DetalleReserva from '../pantallas/DetalleReserva';
import PaginacionDeReservas from './PaginacionDeReservas';


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
			reservasPerPage: 4,
			expandedRows: []
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
		const itemRows = [
			<tr onClick={clickCallback} key={"row-data-" + item.id}>
				<td><i class="far fa-eye" title="Ver detalle reserva"></i></td>
				<td>{item.id}</td>
				<td>{item.fecha}</td>
				<td>{item.estado}</td>
				<td>Retira <i>{item.persona_retiro}</i> por <i>{item.punto_entrega}</i></td>
				<td>{item.productor.nombre + " " + item.productor.apellido}<p>Tel: {item.productor.telefono}</p>
					<Link to={''} className='text-primary mb-3'>Ver Mensajes</Link>
				</td>
				<td> <NumberFormat value={item.total_reserva} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
				</td>
			</tr>
		];

		if (this.state.expandedRows.includes(item.id)) {
			itemRows.push(
				<DetalleReserva item={item}/>
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
								razon_social: item.productor.razon_social,
								nombre: item.productor.usuario.nombre,
								apellido: item.productor.usuario.apellido,
								telefono: item.productor.usuario.telefono,
							},
							detalleReserva: item.detalleReserva,
							estado: item.estado_reserva.nombre,
							total_reserva: item.total_reserva
						}
					})
				})
			})
	}

	render() {

		const { reservasRealizadas, currentPage, reservasPerPage } = this.state;
		const numberOfPages = Math.ceil(reservasRealizadas.length / reservasPerPage);
		const indexOfLastReserva = currentPage * reservasPerPage;
		const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;
		const lista = reservasRealizadas.slice(indexOfFirstReserva, indexOfLastReserva);
		let body = [];
		lista.forEach(item => {
			body.push(this.generoItem(item));
		})

		return (

			<div>
				<div className="titulosPrincipales">Reservas</div>
				<Reserva lista={body}/>
				{
					reservasRealizadas.length > reservasPerPage ?
						<PaginacionDeReservas
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
