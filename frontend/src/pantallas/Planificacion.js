import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import '../diseños/EstilosGenerales.css';
import '../diseños/Planificacion.css';

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
            visibleOk: false,
            periodo: String,
            zona: String,
            id: this.props.id_productor
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

    }

    cambiosSelectZona(opt, a, value) {
        //let campos = this.state.campos;
        //campos[a.periodo] = 
        this.zona = opt.value;
        //this.setState({ periodo })
    }

    cambiosSelectPeriodo(opt, a, value) {
        //let campos = this.state.campos;
        //campos[a.periodo] = 
        this.periodo = opt.value;
        //this.setState({ periodo })
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    handleSubmit(e) {
        var _this = this;
        e.preventDefault();

        _this.setState({ alimentosAProducir: [] })

        var path_principal = "http://localhost:3000/redAgro/obtenerResultados?periodo=";
        var periodo = this.periodo;
        //_this.props.id_productor;
        var provincia = this.zona;
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
                        visible: true,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                    });
                    return;
                }
                response.json().then(
                    function (response) {
                        response.forEach(element => {
                            _this.setState({ alimentosAProducir: [..._this.state.alimentosAProducir, element] });
                        });

                        //   mostrarProduccion(_this.state.alimentosAProducir)
                    });
            });
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
        return (
            <div>
                <div className="titulosPrincipales">Planificar producción</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>

                    <Form.Group className="col-md-12">
                        <MDBCol md="4" className="labelCampoTextarea">
                            <Form.Label column>Periodo</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <Select
                                value={this.state.valueCat}
                                className="selectFormularios col-md-8"
                                name="periodo"
                                options={mostrarPeriodo}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectPeriodo(opt, a, value)}
                            />
                        </MDBCol>
                    </Form.Group>

                    <Form.Group className="col-md-12">
                        <MDBCol md="4" className="labelCampoTextarea">
                            <Form.Label column>Zona de venta</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <Select
                                value={this.state.valueCat}
                                className="selectFormularios col-md-8"
                                name="zonas"
                                options={mostrarZonas}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectZona(opt, a, value)}
                            />
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
            </div >

        );
    };
}
export default Planificacion