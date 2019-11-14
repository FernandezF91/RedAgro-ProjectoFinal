import React, { Component } from 'react'
import { Navbar, Container, Form, Col, Row, Button, Nav } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/FormaRetiro.css';
import '../diseños/EstilosGenerales.css';

class FormaRetiro extends Component {
    constructor() {
        super()

        this.state = {
            campos: [],
            validated: false
        }

    }

    handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({ validated: true });

    };

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    limpiarCampos(e) {
        var form = e.target;
        e.preventDefault();

        form.reset();

    }

    render() {
        return (
            <div className="fondo">
                <Navbar className="barraNavegacion">
                    <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                </Navbar>
                <Container fluid className="contenedor">
                    <div className="formularioFormaRetiro">
                        <div className="formaDeRetiro">
                            <h2>Selección de forma de retiro</h2>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                <label className="form-check-label" for="inlineRadio1">Arreglar con el productor</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                <label className="form-check-label" for="inlineRadio2">Retiro en punto de entrega</label>
                            </div>
                            <h3>Datos de quien retira</h3>
                        </div>
                        <div className="contenidoFormaRetiro">
                            <Form noValidate validated={this.state.validated} onSubmit={(e) => this.limpiarCampos(e)}>
                                <div className="nombre">
                                    <Form.Group as={Row} controlId="validationCustom01">
                                        <Form.Label>
                                            Nombre
                                		</Form.Label>
                                        <Col>
                                            <Form.Control
                                                required
                                                type="email"
                                                name="nombre"
                                                onChange={(e) => this.detectarCambios(e)
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                *Completar campo
            								</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                </div>
                                <div className="apellido">
                                    <Form.Group as={Row}>
                                        <Form.Label>
                                            Apellido
                                </Form.Label>
                                        <Col>
                                            <Form.Control type="email" name="apellido" />
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div className="tel">
                                    <Form.Group as={Row} >
                                        <Form.Label>
                                            Teléfono
                                </Form.Label>
                                        <Col>
                                            <Form.Control type="email" name="tel" />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <Row className="botones">
                                    <Button variant="light" href='/login'>Cancelar</Button>
                                    <Button variant="light" type="submit">Limpiar</Button>
                                    <Button variant="success">Siguiente</Button>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        );
    };
}

export default FormaRetiro;