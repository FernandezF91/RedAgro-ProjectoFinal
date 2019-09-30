import React from 'react';
import { MDBCard, MDBCardBody } from "mdbreact";
import { Form, Row } from 'react-bootstrap';
import '../diseños/Checkout.css'

const PasosCheckout = ({ indexPasos, usuario, datosPersonalesHandler }) => {

    switch (indexPasos) {
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
                                defaultValue={usuario.usuario}
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
                                defaultValue={usuario.nombre}
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
                                defaultValue={usuario.apellido}
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
                                defaultValue={usuario.telefono}
                                pattern="[0-9]{8,14}"
                            //   onChange={(e) => datosPersonalesHandler(e)}
                            />
                        </Form.Group>
                    </div>
                </div>
            );
        case 1:
            return (
                <MDBCard>
                    <MDBCardBody>

                    </MDBCardBody>

                </MDBCard>
            );
        case 2:
            return (
                <MDBCard>
                    <MDBCardBody>

                    </MDBCardBody>

                </MDBCard>
            );
        case 3:
            return (
                <MDBCard>
                    <MDBCardBody>
                    </MDBCardBody>
                </MDBCard>
            );
        case 4:
            return (
                <MDBCard>
                    <MDBCardBody>
                    </MDBCardBody>
                </MDBCard>
            );
    }

}
export default PasosCheckout