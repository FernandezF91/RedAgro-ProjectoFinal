import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class Checkout extends Component {
	constructor(props) {
		super(props);
		
	}

	getTotalReserva(productosSeleccionados) {
        return _.sumBy(productosSeleccionados, function (o) { return o.cantidad * o.precio; });;
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
								{this.props.productosSeleccionados.map(item => (
									<p>
										{item.titulo} x {item.tipo_unidad}
										<NumberFormat value={item.precio * item.cantidad} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
									</p>
								))}
							</MDBCardBody>
							<MDBCardFooter className="px-2">
								<h6>
								<NumberFormat value={this.getTotalReserva(this.props.productosSeleccionado)} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix=" $ " decimalScale={2} fixedDecimalScale={true} /> 
								</h6>
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