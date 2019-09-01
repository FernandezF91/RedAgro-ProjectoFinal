import '../diseños/estilosGlobales.css';
import React, { Component } from 'react'


class DetalleReserva extends Component {

	constructor(props) {
		super(props);
		this.state = {
			reservaId: this.props.reserva_Id
		}
	}


	render() {

		return (

			<div className="titulosPrincipales">Detalle Reservas</div>

		);
	};
}

export default DetalleReserva;