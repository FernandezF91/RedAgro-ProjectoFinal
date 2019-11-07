import '../diseños/estilosGlobales.css';
import React from 'react';
import NumberFormat from 'react-number-format';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Card } from 'react-bootstrap';

const columnas_detalle = [
	{
		label: 'Categoría',
		field: 'Categoría',
	},
	{
		label: 'Producto',
		field: 'Producto',
	},
	{
		label: 'Cantidad',
		field: 'Cantidad',
	},
	{
		label: 'Precio x Unidad',
		field: 'Precio',
	},
	{
		label: 'Subtotal',
		field: 'Subtotal',
	}
]

const DetalleReserva = ({ item }) => {
	return (
		<tr key={"row-expanded-" + item.id}>
			<td colSpan="10">
				<Card border="success">
					<Card.Header>Detalle de la reserva </Card.Header>
					<Card.Body>
						<MDBTable small borderless>
							<MDBTableHead columns={columnas_detalle} />
							<MDBTableBody>
								{
									item.detalleReserva.map(detalleUnaReserva => (
										<tr key={"row-expanded-" + item.id} visible="false">
											<td>
												{detalleUnaReserva.producto.producto.categoria}
											</td>
											<td>
												{detalleUnaReserva.producto.producto.tipo}
											</td>
											{(detalleUnaReserva.cantidad > 1) ?
												(
													<div className="columnaCentrado">
														{(detalleUnaReserva.producto.unidad_venta === "Bolsón") ?
															<td>
																{detalleUnaReserva.cantidad + " Bolsones"}
															</td>
															:
															<td>
																{detalleUnaReserva.cantidad + " " + detalleUnaReserva.producto.unidad_venta + "s"}
															</td>
														}
													</div>
												)
												:
												<td>
													{detalleUnaReserva.cantidad + " " + detalleUnaReserva.producto.unidad_venta}
												</td>
											}
											<td>
												<NumberFormat value={detalleUnaReserva.precio_por_unidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
											</td>
											<td>
												<NumberFormat value={detalleUnaReserva.precio_por_unidad * detalleUnaReserva.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
											</td>
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