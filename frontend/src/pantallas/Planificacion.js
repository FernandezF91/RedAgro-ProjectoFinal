import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MDBModal, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBRow } from 'mdbreact';
import '../diseños/EstilosGenerales.css';
import '../diseños/Planificacion.css';
import Loader from 'react-loader-spinner';

const mostrarZonas = [
    { label: "CABA y Gran Buenos Aires", value: "CABA" },
    { label: "Buenos Aires", value: "BUENOSAIRES" },
    { label: "Catamarca", value: "CATAMARCA" },
    { label: "Chaco", value: "CHACO" },
    { label: "Chubut", value: "CHUBUT" },
    { label: "Córdoba", value: "CORDOBA" },
    { label: "Corrientes", value: "CORRIENTES" },
    { label: "Entre Ríos", value: "ENTRERIOS" },
    { label: "Formosa", value: "FORMOSA" },
    { label: "Jujuy", value: "JUJUY" },
    { label: "La Pampa", value: "LAPAMPA" },
    { label: "La Rioja", value: "LARIOJA" },
    { label: "Mendoza", value: "MENDOZA" },
    { label: "Misiones", value: "MISIONES" },
    { label: "Neuquén", value: "NEUQUEN" },
    { label: "Rio Negro", value: "RIO NEGRO" },
    { label: "Salta", value: "SALTA" },
    { label: "San Juan", value: "SANJUAN" },
    { label: "San Luis", value: "SANLUIS" },
    { label: "Santa Cruz", value: "SANTACRUZ" },
    { label: "Santa Fe", value: "SANTAFE" },
    { label: "Santiago del Estero", value: "SANTIAGO" },
    { label: "Tierra del Fuego", value: "TIERRA" },
    { label: "Tucumán", value: "TUCUMAN" }
];

const mostrarPeriodo = [
    { label: "Verano", value: "Verano" },
    { label: "Otoño", value: "Otono" },
    { label: "Invierno", value: "Invierno" },
    { label: "Primavera", value: "Primavera" }
];

const columnas = [
    {
        label: 'Ranking de productos con más probabilidad de venderse en el período solicitado',
        field: 'productos'
    }]

class Planificacion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: {},
            alimentosAProducir: [],
            formOk: false,
            showModal: false,
            periodo: "",
            zona: "",
            id: this.props.id_productor,
            loading: false,
            valueZona: [],
            valuePeriodo: [],
            validaciones: []
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    cambiosSelectZona(opt, a, value) {
        this.setState({
            zona:opt.value,
            valueZona: value
        });
    }

    cambiosSelectPeriodo(opt, a, value) {

        this.setState({
            periodo:opt.value,
            valuePeriodo: value
        });
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];

        if (this.state.zona === "") {
            validaciones["zona"] = "Campo requerido";
            showModal = true;
        }

        if (this.state.periodo === "") {
            validaciones["periodo"] = "Campo requerido";
            showModal = true;
        }

        if (showModal) {
            this.setState({
                validaciones: validaciones,
                showModal: showModal,
                mensaje: "Ups! Campos incompletos o incorrectos",
                loading: false
            });
            return false;
        } else {
            return true;
        }
    }

    handleSubmit(e) {
        var _this = this;
        e.preventDefault();

        _this.setState({
            alimentosAProducir: [],
            loading: true
        });
        if (_this.validarCampos()) {
            var path_principal = "http://"+window.$ip+":3000/redAgro/obtenerResultados?periodo=";
            var periodo = this.state.periodo;
            //_this.props.id_productor;
            var provincia = this.state.zona;
            // _this.state.campos["tipo_producto"];
            var path_final = path_principal + periodo + "&provincia=" + provincia;

            //alert(path_final);

            fetch(path_final, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
            })
                .then(function (response) {
                    if (response.status !== 200) {

                        _this.setState({
                            showModal: true,
                            mensaje: "Ocurrió un error al generar la planificación. Por favor, reintentá en unos minutos.",
                            loading: false
                        });
                        return;
                    }
                    response.json().then(
                        function (response) {
                            response.forEach(element => {
                                _this.setState({
                                    alimentosAProducir: [..._this.state.alimentosAProducir, element],
                                    loading: false
                                });
                            });
                        });
                });
        }
    }

    retornaLista() {
        var i = 1
        return this.state.alimentosAProducir.map(producto => {
            var itemRow = []
            //[<tr key={"row-data-"} >
            //     <td>
            //         {"producto"}
            //     </td>
            // </tr>

            //  ];

            itemRow.push(
                <tr>

                    <td> {i + " " + producto} </td>
                </tr>
            );
            i++
            return itemRow;

        })

    }

    mostrarMensajeOk() {
        this.setState({
            formOk: true,
            visibleOk: true
        });
    }


    render() {
        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />;

        return (
            <div>
                <div className="titulosPrincipales">Planificar producción</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>

                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Periodo</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    value={this.state.valuePeriodo}
                                    className="selectFormularios col-md-8"
                                    name="periodo"
                                    options={mostrarPeriodo}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambiosSelectPeriodo(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["periodo"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["periodo"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["periodo"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" top>
                            <Form.Label column>Zona de venta</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    value={this.state.valueZona}
                                    className="selectFormularios col-md-8"
                                    name="zonas"
                                    options={mostrarZonas}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambiosSelectZona(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["zona"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["zona"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["zona"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit">Planificar</Button>
                    </div>
                </Form>
                <div className="titulosPrincipales">Productos a producir</div>
                <div className="tabla_puntos">
                    {this.state.alimentosAProducir.length > 0 ?
                        <MDBTable striped hover>
                            <MDBTableHead columns={columnas} />
                            <MDBTableBody>
                                {this.retornaLista()}
                            </MDBTableBody>
                        </MDBTable>
                        :
                        <div className="sinPuntosDeVenta">
                            <i className="fas fa-chart-line iconoGrande"></i>
                            <br />
                            <h5>No has solicitado aún la planificación </h5>
                        </div>
                    }
                </div>
                {

                    <MDBModal isOpen={this.state.showModal} centered size="sm">
                        <div className="modalMargenes" tabIndex="0">
                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                            <br />
                            <i className="fas fa-exclamation-circle iconoModalError" />
                            <br />
                            <br />
                            <h5>{this.state.mensaje}</h5>
                        </div>
                    </MDBModal>
                }
            </div >

        );
    };
}
export default Planificacion