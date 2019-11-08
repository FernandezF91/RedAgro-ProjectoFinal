import '../diseños/estilosGlobales.css';
import '../diseños/Reservas.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const columnasConsumidor = [
	{
		label: 'Reserva',
		field: 'NroReserva',
	},
	{
		label: 'Fecha de Creación',
		field: 'Fecha_creacion',
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
		label: 'Fecha de Retiro',
		field: 'Fecha',
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
		field: 'Editar',
	},
	{
		label: '',
		field: 'Ver mensajes',
	}
];

const columnasProductor = [
	{
		label: 'Reserva',
		field: 'NroReserva',
	},
	{
		label: 'Fecha de Creación',
		field: 'Fecha_creacion',
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
		label: 'Fecha de Retiro',
		field: 'Fecha',
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
		field: 'Editar',
	},
	{
		label: '',
		field: 'Ver mensajes',
	}
];

const Reserva = ({ lista, rolUsuario }) => {

	return (
		<div>
			{lista.length > 0 ?
				<MDBTable striped hover>
					{
						(rolUsuario === "Consumidor") ?
							<MDBTableHead columns={columnasConsumidor} />
							:
							<MDBTableHead columns={columnasProductor} />
					}
					<MDBTableBody>{lista}</MDBTableBody>
				</MDBTable>
				:
				<div className="listadoSinItems">
					<i className="fas fa-tasks iconoGrande" />
					<br />
					<br />
					<h5>Ups! No tenes reservas! </h5>
					{(rolUsuario === "Consumidor") ?
						<h6 className="grey-text">Probá buscando productos por <Link to={'/principalConsumidores/MiCuenta'}>acá</Link></h6>
						:
						<h6 className="grey-text">Probá publicando tus productos por <Link to={'./NuevoProducto'}>acá</Link></h6>
					}
				</div>
			}
		</div >
	);
};
export default Reserva;