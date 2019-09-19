import '../diseños/Reservas.css';
import DetalleReserva from '../pantallas/DetalleReserva';
import Reserva from '../pantallas/Reserva';
import React, { Component, useState, useEffect } from 'react';
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
			reservasPerPage: 4
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

	componentDidMount() {
		var path_usuario = "http://localhost:3000/redAgro/get_reservas_usuario?id=" + this.state.id;
		fetch(path_usuario)
			.catch(err => console.error(err))
			.then(response => { return response.json(); })
			.then(data => {
				this.setState({
					reservasRealizadas: data.map((item) => {
						var fecha = new Date (item.fecha);
						return {
							id: item.id,
							fecha: fecha.getDate().toString() +"/" + (fecha.getMonth()+1).toString() +"/"+ fecha.getFullYear().toString(),
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

		return (

			<div>
				<div className="titulosPrincipales">Reservas</div>
				 <Reserva listaDeReservas={reservasRealizadas}
					currentPage={currentPage}
					reservasPerPage={reservasPerPage} />
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