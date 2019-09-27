import '../diseños/estilosGlobales.css';
import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Card } from 'react-bootstrap';

const columnas_detalle = [
	{
		label: 'Producto',
		field: 'Producto',
	},
	{
		label: 'Cantidad',
		field: 'Cantidad',
	},
	{
		label: 'Precio',
		field: 'Precio',
	}
]

const DetalleReserva = ({ item }) => {
	return (
		<tr key={"row-expanded-" + item.id}>
			<td colSpan="9">
				<Card border="success">
					<Card.Header>Detalle de la Reserva </Card.Header>
					<Card.Body>
						<MDBTable small borderless>
							<MDBTableHead columns={columnas_detalle} />
							<MDBTableBody>
								{
									item.detalleReserva.map(detalleUnaReserva => (
										<tr key={"row-expanded-" + item.id} visible="false">
											<td>{detalleUnaReserva.id_producto}</td>
											<td>{detalleUnaReserva.cantidad} </td>
											<td>{detalleUnaReserva.precio_por_unidad}</td>
										</tr>
									))
								}
							</MDBTableBody>
						</MDBTable>
					</Card.Body>
				</Card>
			</td>
		</tr>
	)
}
export default DetalleReserva;