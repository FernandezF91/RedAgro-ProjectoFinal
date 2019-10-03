import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import NumberFormat from 'react-number-format';
import { Form, Row, Col } from 'react-bootstrap';
import SeleccionarPtoEntrega from './SeleccionarPtoEntrega';
import '../diseños/Checkout.css'

const PasosCheckout = (props) => {

    switch (props.indexPasos) {
        case 0:
            return (
                <div className="containerCheckout">
                    <div className="nombreDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}> Usuario </Form.Label>
                            <Form.Control
                                required
                                type="nom"
                                name="nombre"
                                defaultValue={props.usuario.usuario}
                                disabled={true}
                            //       onChange={(e) => datosPersonalesHandler(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="nombreDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}> Nombre </Form.Label>
                            <Form.Control
                                required
                                type="nom"
                                name="nombre"
                                defaultValue={props.usuario.nombre}
                                pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
                            //       onChange={(e) => datosPersonalesHandler(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="apellidoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Apellido
									</Form.Label>
                            <Form.Control
                                required
                                type="ap"
                                name="apellido"
                                defaultValue={props.usuario.apellido}
                                pattern="[A-Z]*|[a-z]*|[A-Z][a-z]*"
                            //     onChange={(e) => datosPersonalesHandler(e)}
                            />
                        </Form.Group>
                    </div>

                    <div className="telefonoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Teléfono de contacto
									</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                name="telefono"
                                defaultValue={props.usuario.telefono}
                                pattern="[0-9]{8,14}"
                            //   onChange={(e) => datosPersonalesHandler(e)}
                            />
                        </Form.Group>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="radioButtonsCheckout">
                    <label>
                        <input type="radio"
                            value="radio1"
                            checked={props.selectedRadioButtonRetiro === "radio1"}
                            onChange={props.handleRadioRetiroChange}
                            className="radio-button-input radio" />
                        Acordar retiro con el Productor
                    </label>
                    <br />
                    <label>
                        <input type="radio"
                            value="radio2"
                            checked={props.selectedRadioButtonRetiro === "radio2"}
                            onChange={props.handleRadioRetiroChange}
                            className="radio-button-input radio" />
                        Seleccionar un punto de entrega
                    </label>

                    {
                        props.selectedRadioButtonRetiro === "radio2" ?
                            <SeleccionarPtoEntrega puntosEntrega = {props.puntosEntrega}/>
                            : ' '
                    }
                </div>

            );
        case 2:
            return (
                <CardDeck className="resumenReserva">
                    <Card>
                        <Card.Header as="h6">Datos para el retiro</Card.Header>
                    </Card>

                    <Card style={{ width: '28rem', borderless: true }}>
                        <Card.Header borderless={true} as="h6">Productos seleccionados</Card.Header>
                        <ListGroup>
                            {
                                props.productosSeleccionados.map(item => (
                                    <ListGroup.Item key={item.id}>
                                        <Row>
                                            <Col>
                                                {item.titulo}
                                            </Col>
                                            {
                                                item.cantidad > 1 ?
                                                    <Col>
                                                        {item.cantidad}
                                                        <span className="unidadMedida">{" " + item.tipoDeUnidad + "s"}</span>
                                                    </Col>
                                                    :
                                                    <Col>
                                                        {item.cantidad}
                                                        <span className="unidadMedida">{" " + item.tipoDeUnidad}</span>
                                                    </Col>
                                            }
                                            <Col>
                                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                <span style={{ color: 'gray', fontSize: '12px' }}> por c/u</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        <Card.Footer as="h6"><strong>Total
                    <NumberFormat
                                value={props.getTotalReserva(props.productosSeleccionados)}
                                displayType={'text'}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix=" $ "
                                decimalScale={2}
                                fixedDecimalScale={true} />
                        </strong>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            );
        case 3:
            return (
                <Card style={{ width: '18rem' }}> </Card>
            );
        case 4:
            return (
                <Card style={{ width: '18rem' }}></Card>
            );
    }

}
export default PasosCheckout