import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import NumberFormat from 'react-number-format';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import '../diseños/Checkout.css'

const PasosCheckout = (props) => {

    switch (props.indexPasos) {
        case 0:
            return (
                <div className="containerCheckout">
                    <div className="personaRetiro">
                        <Form.Group as={Row}>
                            <Form.Check column sm={4}
                                inline
                                label="Retira otra persona"
                                type="checkbox"
                                id="checkbox"
                                checked={props.datosPersonaRetiro.checkbox}
                                onChange={props.handleCheckboxRetiro} />
                        </Form.Group>
                    </div>
                    <div className="usuarioDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}> Usuario </Form.Label>
                            <Form.Control
                                required
                                type="nom"
                                name="nombre"
                                defaultValue={props.usuario.usuario}
                                disabled />
                        </Form.Group>
                    </div>
                    <div className="nombreDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}> Nombre </Form.Label>
                            <Form.Control
                                required
                                type="nom"
                                name="nombre"
                                value={props.datosPersonaRetiro.nombre}
                                disabled={props.datosPersonaRetiro.disabled}
                                pattern="^[a-zA-Z ]*$"
                                onChange={props.handleDatosPersonales} />
                        </Form.Group>
                    </div>
                    <div className="apellidoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Apellido</Form.Label>
                            <Form.Control
                                required
                                type="ap"
                                name="apellido"
                                value={props.datosPersonaRetiro.apellido}
                                disabled={props.datosPersonaRetiro.disabled}
                                pattern="^[a-zA-Z ]*$"
                                onChange={props.handleDatosPersonales}
                            />
                        </Form.Group>
                    </div>

                    <div className="telefonoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Teléfono de contacto</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                name="telefono"
                                defaultValue={props.usuario.telefono}
                                disabled
                                pattern="[0-9]{8,14}" />
                        </Form.Group>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="radioButtonsCheckout">
                    <label>
                        <input
                            type="radio"
                            value="radio1"
                            checked={props.selectedRadioButtonRetiro === "radio1"}
                            onChange={props.handleRadioRetiroChange}
                            className="radio-button-input radio" />
                        Acordá el retiro con tu productor
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="radio2"
                            checked={props.selectedRadioButtonRetiro === "radio2"}
                            onChange={props.handleRadioRetiroChange}
                            className="radio-button-input radio" />
                        Seleccioná un punto de entrega
                    </label>
                    {
                        props.selectedRadioButtonRetiro === "radio2" ?
                            <div className="opcionesCheckout">

                                <Select className="dropdownDirecciones"
                                    value={props.seleccionado.puntoEntrega}
                                    options={props.selector.puntosEntrega}
                                    placeholder="Seleccione una dirección de retiro..."
                                    onChange={newPunto => props.actualizarPuntoEntrega(newPunto)}
                                />

                                <Select className="dropdownFechas"
                                    value={props.seleccionado.fechaEntrega}
                                    options={props.selector.fechasEntrega}
                                    placeholder="Seleccione una fecha de retiro..."
                                    onChange={newFecha => props.actualizarFechaEntrega(newFecha)} />
                            </div>
                            : ''
                    }
                </div>
            );
        case 2:
            return (
                <CardDeck className="resumenReserva">
                    <Card>
                        <Card.Header as="h6">Datos para el retiro</Card.Header>
                        <Card.Body>
                            Retira {props.datosReserva.persona_retiro}
                            <br />
                            {
                                props.datosReserva.forma_retiro === "Acuerda con Productor" ?
                                    <p>{props.datosReserva.forma_retiro}</p>
                                    :
                                    <p>
                                        Por el punto de entrega elegido:
                                    <br />
                                        {props.seleccionado.puntoEntrega[0].label}
                                        <br />
                                        A partir del dia {props.seleccionado.fechaEntrega[0].label}
                                    </p>
                            }
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="h6">Productos seleccionados</Card.Header>
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
                        <Card.Footer as="h6">
                            <strong>
                                Total
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
        default:
            return 'Error';
    }

}
export default PasosCheckout