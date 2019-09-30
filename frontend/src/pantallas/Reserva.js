import '../diseños/Reservas.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const columnasConsumidor = [
	{
		label: 'Nro. Reserva',
		field: 'NroReserva',
	},
	{
		label: 'Fecha',
		field: 'Fecha',
	},
	{
		label: 'Estado',
		field: 'Estado',
	},
	{
		label: 'Datos para el Retiro',
		field: 'Datos Retiro',
	},
	{
		label: 'Productor',
		field: 'Productor',
	},
	{
		label: 'Total',
		field: 'Total',
	},
	{
		label: '',
		field: 'Detalle',
	},
	{
		label: '',
		field: 'Ver mensajes',
	},
	{
		label: '',
		field: 'Editar',
	}
];
const columnasProductor = [
	{
		label: 'Nro. Reserva',
		field: 'NroReserva',
	},
	{
		label: 'Fecha',
		field: 'Fecha',
	},
	{
		label: 'Estado',
		field: 'Estado',
	},
	{
		label: 'Datos para el Retiro',
		field: 'Datos Retiro',
	},
	{
		label: 'Consumidor',
		field: 'Consumidor',
	},
	{
		label: 'Total',
		field: 'Total',
	},
	{
		label: '',
		field: 'Detalle',
	},
	{
		label: '',
		field: 'Ver mensajes',
	},
	{
		label: '',
		field: 'Editar',
	}
];

const Reserva = ({ lista, rolUsuario }) => {

	return (
		<div>
			{lista.length > 0 ?
				<MDBTable responsive hover>
					{
						(rolUsuario === "Consumidor") ?
							<MDBTableHead columns={columnasConsumidor} />
							:
							<MDBTableHead columns={columnasProductor} />
					}
					<MDBTableBody>{lista}</MDBTableBody>
				</MDBTable>
				:
				<div className="sinReservas">
					{/* 			Version para consumidores */}
					<i className="fas fa-tasks iconoGrande"></i>
					<br />
					<br />
					<h5>Ups! No tenes reservas! </h5>
					<h6>Probá buscando productos por <Link to={''}>acá</Link> </h6>
				</div>
			}
		</div >
	);
};
export default Reserva;