import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Row, Form, Col, Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/recuperaremail.css';
import '../diseños/estilosGlobales.css';
import Modal from 'react-awesome-modal';

class RecuperarEmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            titulo: "",
            mensaje: "",
            visible: "",
            formOk: false,
            error: ""

        }

        this.validarDatos = this.validarDatos.bind(this);
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    validarDatos() {

        if (!this.state.campos["emailuser"]) {

            this.setState({ error: "*Campo inválido" });
            return;
        }

        const path = "http://localhost:3000/redAgro/recuperar_email?email="

        const final_path = path + this.state.campos["emailuser"];

        var _this = this;

        fetch(final_path, {
            method: "GET",

        })
            .then(function (response) {
                if (response.status !== 200) {

                    response.text().then(
                        function (response) {
                            _this.setState({
                                visible: true,
                                mensaje: response,
                                titulo: "Error",
                                formOk: false,
                                error: ""
                            });
                        })
                    return;
                }

                response.text().then(
                    function (response) {
                        _this.setState({
                            visible: true,
                            mensaje: "No te preocupes! Te enviamos un email para que puedas reestablecer tu contraseña",
                            titulo: "Recuperar contraseña",
                            formOk: true,
                            error: ""
                        });

                    });
            });
    }

    closeModal() {
        this.setState({
            visible: false
        });

        if (this.state.formOk === true) {
            this.props.history.push({
                pathname: '/login',

            })
        }
    }

    render() {
        return (
            <div className="fondo">
                <div className="barraNavegacion">
                    <Navbar className="alturaBarra">
                        <Link to={'/'} className="culturaVerde">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </Link>
                    </Navbar>
                </div>
                <Container fluid className="contenedor">
                    <div className="formularioRecuContra">
                        <h2>Recuperar contraseña</h2>
                        <div className="encabezadoRecucontra">
                            <Form>
                                <div className="Correoelectronico">
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Form.Label>
                                            Correo electronico
                                		</Form.Label>
                                        <Col>
                                            <Form.Control type="email" name="emailuser" onChange={(e) => this.detectarCambios(e)} />
                                            <div className="error">{this.state.error}</div>
                                        </Col>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="botones">
                        <Button variant="light" href='/login'>Cancelar</Button>
                        <Button variant="success" onClick={this.validarDatos}>Confirmar</Button>
                    </div>
                    <section>
                        <Modal
                            visible={this.state.visible}
                            width="500"
                            height="130"
                            effect="fadeInUp"
                            onClickAway={() => this.closeModal()}
                        >
                            <div>
                                <h1>{this.state.titulo}</h1>
                                <p>
                                    {this.state.mensaje}
                                </p>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                            </div>
                        </Modal>
                    </section>
                </Container>

            </div>
        );
    };
}

export default RecuperarEmail;