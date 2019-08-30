import '../diseños/Reservas.css';
import DetalleReserva from '../pantallas/DetalleReserva';
import Reserva from '../pantallas/Reserva';
import React, { Component, useState, useEffect } from 'react';
import PaginacionDeReservas from './PaginacionDeReservas';

class ListadoReservas extends Component {

	constructor() {
		super();
		this.state = {
			reservasRealizadas:[
				{
					id: '1',
					fecha: '20/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Brenda',
					total_reserva: '120',
					consumidor: 'Pepe',
					productor: 'Vanesa Molina',
					produtor_telefono: '11123456',
					estado: 'Finalizada',
					punto_entrega: 'Casa'
				},
				{
					id: '2',
					fecha: '21/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Pepe',
					total_reserva: '150',
					consumidor: 'Pepe',
					productor: 'Vanesa Molina',
					produtor_telefono: '11123456',
					estado: 'En Proceso',
					punto_entrega: 'Feria de las americas'
				},
				{
					id: '3',
					fecha: '23/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Elvira',
					total_reserva: '450',
					consumidor: 'Pepe',
					productor: 'Gonzalo Molina',
					produtor_telefono: '111234569',
					estado: 'Disponible para Retiro',
					punto_entrega: 'Feria Parque Rivadavia'
				},
				{
					id: '4',
					fecha: '23/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Jorge',
					total_reserva: '650',
					consumidor: 'Pepe',
					productor: 'Fernando Molina',
					produtor_telefono: '111234569',
					estado: 'Disponible para Retiro',
					punto_entrega: 'Feria vecinal'
				},
				{
					id: '5',
					fecha: '26/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Paloma',
					total_reserva: '650',
					consumidor: 'Pepe',
					productor: 'Fernando Molina',
					produtor_telefono: '111234569',
					estado: 'Disponible',
					punto_entrega: 'Feria Barrial'
				},

				{
					id: '6',
					fecha: '26/08/2019',
					forma_retiro: 'Personal',
					persona_retiro: 'Paloma',
					total_reserva: '650',
					consumidor: 'Pepe',
					productor: 'Fernando Molina',
					produtor_telefono: '111234569',
					estado: 'Cancelado',
					punto_entrega: 'Feria vecinal'
				}

			],
			currentPage: 1,
			itemsPerPage: 3			
		};
	}

	nextPage = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	}

	render() {

		const {reservasRealizadas, currentPage, itemsPerPage } = this.state;
		const numberOfPages = Math.floor(reservasRealizadas.length / itemsPerPage);

		return (

			<div>
				<div className="titulosPrincipales">Reservas</div>

				<Reserva listaDeReservas={reservasRealizadas}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage} />

				{
					reservasRealizadas.length > 1 ? 
					<PaginacionDeReservas 
						pages = {numberOfPages}
						nextPage = {this.nextPage}
						currentPage = {this.state.currentPage} /> 
					
					: ''
				}
			</div>
		);
	};
}
export default ListadoReservas;