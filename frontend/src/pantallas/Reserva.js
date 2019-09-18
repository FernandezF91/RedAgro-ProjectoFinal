import '../diseños/Reservas.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import NumberFormat from 'react-number-format';

const Reserva = ({ listaDeReservas, currentPage, reservasPerPage }) => {

	const indexOfLastReserva = currentPage * reservasPerPage;
	const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;
	const lista = listaDeReservas.slice(indexOfFirstReserva, indexOfLastReserva);
	const columnas = [
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
		}
	]

	return (

		<div>
			{lista.length > 0 ?
				<MDBTable responsive hover striped>
					<MDBTableHead columns={columnas} />
					<MDBTableBody>
						{
							lista.map(item => (
								<tr>
									<td>
										<Link to="principalConsumidores/Reserva/DetalleReserva" className='text-primary mb-3' title="Ver detalle reserva">{item.id}</Link>
									</td>
									<td>{item.fecha}</td>
									<td>{item.estado}</td>
									<td>Retira <i>{item.persona_retiro}</i> por <i>{item.punto_entrega}</i></td>
									<td>{item.productor}<p>Tel: {item.produtor_telefono}</p>
										<Link to={''} className='text-primary mb-3'>Ver Mensajes</Link>
									</td>
									<td> <NumberFormat value={item.total_reserva} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
									</td>
								</tr>

							))}
					</MDBTableBody>
				</MDBTable>
				:
				<div className="sinReservas">
					{/* 			Version para consumidores */}
					<i class="fas fa-tasks iconoGrande"></i>
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