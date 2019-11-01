import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import NumberFormat from 'react-number-format';
import Image from 'react-bootstrap/Image';
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
                            {
                                (props.datosPersonaRetiro.disabled === true) ?
                                    <Form.Control
                                        required
                                        type="nom"
                                        name="nombre"
                                        value={props.datosPersonaRetiro.nombre}
                                        pattern="^[a-zA-Z ]*$"
                                        onChange={props.handleDatosPersonales}
                                        disabled />
                                    :
                                    <Form.Control
                                        required
                                        type="nom"
                                        name="nombre"
                                        value={props.datosPersonaRetiro.nombre}
                                        pattern="^[a-zA-Z ]*$"
                                        onChange={props.handleDatosPersonales} />
                            }
                        </Form.Group>
                    </div>
                    <div className="apellidoDU" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Apellido</Form.Label>
                            {
                                (props.datosPersonaRetiro.disabled === true) ?
                                    <Form.Control
                                        required
                                        type="ap"
                                        name="apellido"
                                        value={props.datosPersonaRetiro.apellido}
                                        pattern="^[a-zA-Z ]*$"
                                        onChange={props.handleDatosPersonales}
                                        disabled
                                    />
                                    :
                                    <Form.Control
                                        required
                                        type="ap"
                                        name="apellido"
                                        value={props.datosPersonaRetiro.apellido}
                                        pattern="^[a-zA-Z ]*$"
                                        onChange={props.handleDatosPersonales}
                                    />
                            }
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
                    {
                        (props.selectedRadioButtonRetiro === "radio1") ?
                            <div className="opcionesCheckout">
                                <label>
                                    Comunicate con el productor para coordinar la fecha y
                                    <br />
                                    el punto de entrega que más te convenga.
                                </label>
                            </div>
                            : <br />
                    }
                    <br />
                    {
                        (props.puntosEntrega.length > 0) ?
                            <label>
                                <input
                                    type="radio"
                                    value="radio2"
                                    checked={props.selectedRadioButtonRetiro === "radio2"}
                                    onChange={props.handleRadioRetiroChange}
                                    className="radio-button-input radio" />
                                Seleccioná un punto de entrega
                            </label>
                            : ''
                    }
                    {
                        (props.selectedRadioButtonRetiro === "radio2") ?
                            <div className="opcionesCheckout">
                                <Select className="dropdownDirecciones"
                                    value={props.seleccionado.puntoEntrega}
                                    options={props.selector.puntosEntrega}
                                    placeholder="Seleccione una dirección de retiro..."
                                    onChange={newPunto => props.actualizarPuntoEntrega(newPunto)}
                                />

                                <Select className="dropdownFechas"
                                    isDisabled={props.selectorFecha.selectorFechaDisabled}
                                    value={props.seleccionado.fechaEntrega}
                                    options={props.selector.fechasEntrega}
                                    placeholder="Seleccione una fecha de retiro..."
                                    onChange={newFecha => props.actualizarFechaEntrega(newFecha)} />
                                
                                <Select className="dropdownHorarios"
                                    isDisabled={props.selectorHorarios.selectorHorariosDisabled}
                                    value={props.seleccionado.horarioEntrega}
                                    options={props.selector.horarioEntrega}
                                    placeholder="Seleccione un horario de retiro..."
                                    onChange={newHorario => props.actualizarHorarioEntrega(newHorario)} />
                            </div>
                            : ''
                    }
                </div>
            );
        case 2:
            return (
                <div className="cardColumns">
                    <CardColumns className="resumenReserva">
                        <Card border="light" className="cardDatosPersonales">
                            <Card.Header className="cardHeader"><i className="fas fa-store" /> Datos para el retiro</Card.Header>
                            <Card.Body>
                                Retira {props.datosReserva.persona_retiro},
                            <br />
                                {
                                    props.datosReserva.forma_retiro === "Acuerda con Productor" ?
                                        <p>Acordás el punto de entrega y la fecha con el productor</p>
                                        :
                                        <p>
                                            Por el punto de entrega elegido:
                                        <br />
                                            {props.seleccionado.puntoEntrega[0].label}
                                            <br />
                                            A partir del dia {props.seleccionado.fechaEntrega[0].label}.
                                        <br />
                                            Horario de Atención: desde las {props.datosReserva.horario} hs.
                                    </p>
                                }
                            </Card.Body>
                        </Card>

                        <Card border="light">
                            <Card.Header className="cardHeader"><i className="fas fa-shopping-basket" /> Productos seleccionados</Card.Header>
                            <ListGroup>
                                {
                                    props.productosSeleccionados.map(item => (
                                        <ListGroup.Item key={item.id}>
                                            <Row>
                                                <Col>
                                                    <Image
                                                        roundedCircle
                                                        alt={item.titulo}
                                                        src={"data:" + item.imagenes[0].tipo_contenido + ";base64," + item.imagenes[0].image}
                                                        mode='fit'
                                                        height="40px" width="auto" />
                                                </Col>
                                                <Col>
                                                    {item.titulo}
                                                </Col>
                                                {
                                                    item.cantidad > 1 ?
                                                        <Col>
                                                            {item.cantidad}
                                                            {
                                                                item.tipoDeUnidad === "Bolsón" ?
                                                                    <span className="unidadMedida">{" Bolsones"}</span>
                                                                    :
                                                                    <span className="unidadMedida">{" " + item.tipoDeUnidad + "s"}</span>
                                                            }
                                                        </Col>
                                                        :
                                                        <Col>
                                                            {item.cantidad}
                                                            <span className="unidadMedida">{" " + item.tipoDeUnidad}</span>
                                                        </Col>
                                                }
                                                <Col>
                                                    {
                                                        (item.oferta === null || item.ofera === undefined) ?
                                                            <div>
                                                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                                <span style={{ color: 'gray', fontSize: '12px' }}> por c/u</span>
                                                            </div>
                                                            :
                                                            (item.oferta.activo) ?
                                                                <div title="Producto en oferta!">
                                                                    <strike>
                                                                        <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                                        <span style={{ color: 'gray', fontSize: '12px' }}> por c/u</span>
                                                                    </strike>
                                                                    <br />
                                                                    <NumberFormat value={item.precio - (item.precio * item.oferta.porcentaje / 100)} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                                    <span style={{ color: 'gray', fontSize: '12px' }}> por c/u</span>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                                                                    <span style={{ color: 'gray', fontSize: '12px' }}> por c/u</span>
                                                                </div>

                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                                <ListGroup.Item key="footer" className="cardFooter">
                                    Total
                                        <NumberFormat
                                        value={props.getTotalReserva(props.productosSeleccionados)}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator={","}
                                        prefix=" $ "
                                        decimalScale={2}
                                        fixedDecimalScale={true} />
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </CardColumns>
                </div>

            );
        default:
            return 'Error';
    }
}
export default PasosCheckout