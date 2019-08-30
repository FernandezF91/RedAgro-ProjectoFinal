import '../diseños/Reservas.css';
import React from 'react';
import { Nav, Link, Route, withRouter } from 'react-router-dom';
//import Pagination from "react-js-pagination";
import { Table, Row, Col } from 'react-bootstrap';

const Reserva = ({ listaDeReservas, currentPage, itemsPerPage }) => {

	const indexOfLastReserva = currentPage * itemsPerPage;
	const indexOfFirstReserva = indexOfLastReserva - itemsPerPage;
	const lista = listaDeReservas.slice(indexOfFirstReserva, indexOfLastReserva);

	return (

		<div>
			{lista.length > 1 ?
				lista.map(item => (
					<Table striped bordered hover key={item.id}>
						<Row>
							<Col>{/* <Col classname="titulo" colSpan="4"> */}
								<h5><b>{item.estado}</b></h5>
								<h6 className="fechaReserva">Realizada el día {item.fecha}</h6>
							</Col>
						</Row>
						<Row>
							<Col xs={7} md={3}>
								<p>{item.id}</p>
								<p>{item.total_reserva}</p>
							</Col>

							<Col xs={7} md={3}>
								<p>Retira <i>{item.persona_retiro}</i> por <i>{item.punto_entrega}</i></p>
							</Col>

							<Col xs={7} md={3}>
								<ul>Producido por {item.productor} </ul>
								<ul>{item.produtor_telefono}</ul>
								<ul><Link to={''} className='text-primary mb-3'>Ver Mensajes</Link></ul>
							</Col>

							<Col xs={7} md={3}>
								<nav>
									<Link to="principalConsumidores/Reserva/DetalleReserva" className='text-primary mb-3'><p>Ver Detalle</p></Link>
									{/* <Route path='principalConsumidores/Reserva/DetalleReserva'
									render={(props) => <DetalleDeReserva reserva_Id={item.id} />} /> */}
								</nav>
							</Col>
						</Row>
					</Table>
				)) :

				<div className="sinReservas">
					{/* 			Version para consumidores */}
					<h5>Ups...</h5>
					<h6>No tenes reservas!</h6>
					<h6>Probá buscando productos por <Link to={''}>acá</Link> </h6>
				</div>
			}
		</div>
	);
};
export default Reserva;