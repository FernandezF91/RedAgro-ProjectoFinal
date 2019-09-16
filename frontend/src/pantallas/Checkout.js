import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productosSeleccionados: [{
				id: "1",
				titulo: "Tomate redondo",
				descripcion: "Tomate agroecologico",
				fecha_vencimiento: "10/09/2019",
				precio: "150",
				tipo_unidad: "KG",
				cantidad: "2",
				productor: "Vanesa Molina"
			},
			{
				id: "2",
				titulo: "Pomelo rosado",
				descripcion: "Pomelo organico",
				fecha_vencimiento: "11/09/2019",
				precio: "350",
				tipo_unidad: "KG",
				cantidad: "10",
				productor: "Vanesa Molina"
			},
			{
				id: "3",
				titulo: "Pomelo rosado",
				descripcion: "Pomelo organico",
				fecha_vencimiento: "11/09/2019",
				precio: "350",
				tipo_unidad: "KG",
				cantidad: "10",
				productor: "Vanesa Molina"
			}],
		}
	}

	render() {
		return (
			<MDBContainer >
				<div className="titulosPrincipales">Finalizar la Reserva</div>
				<MDBRow>
					<MDBCol md="4">
						<MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
							<MDBCardHeader><h6>Datos Personales</h6></MDBCardHeader>
							<MDBCardBody>

							</MDBCardBody>
							<Button variant="success" type="submit">Continuar</Button>
						</MDBCard>
					</MDBCol>

					<MDBCol md="4">
						<MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
							<MDBCardHeader><h6>Puntos de Entrega</h6></MDBCardHeader>
						</MDBCard>
					</MDBCol>

					<MDBCol md="4">
						<MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
							<MDBCardHeader><h6>Resumen de la Reserva</h6></MDBCardHeader>
							<MDBCardBody>
								{this.state.productosSeleccionados.map(item => (
									<p>
										{item.titulo} x {item.tipo_unidad}
										<NumberFormat value={item.precio * item.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
									</p>
								))}
							</MDBCardBody>
							<MDBCardFooter className="px-2">
								<h6><strong>Total $100</strong></h6>
							</MDBCardFooter>
							<Button variant="success" type="submit">Reservar</Button>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		)
	}
}
export default Checkout;