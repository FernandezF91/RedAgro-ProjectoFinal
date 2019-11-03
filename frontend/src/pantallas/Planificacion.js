import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { Link } from 'react-router-dom';
    import '../diseños/estilosGlobales.css';
import '../diseños/Planificacion.css';

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

            id: this.props.id_productor
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

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

        _this.setState({alimentosAProducir:[]})

        var path_principal = "http://localhost:3000/redAgro/obtenerResultados?periodo=";
        var periodo = this.periodo;
        //_this.props.id_productor;
        var provincia = "CABA";
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

    retornaLista(){
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
            <div className="container">
                <div className="titulosPrincipales">Planificar Producción</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="dropdownPeriodo">
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>
                                Periodo
							</Form.Label>
                            <Select value={this.state.valueCat} className="selectPeriodo" name="periodo" options={mostrarPeriodo} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectPeriodo(opt, a, value)} />
                        </Form.Group>
                    </div>
                    <div className="botonesNuevoProducto">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit">Planificar</Button>
                    </div>

                    <div className="titulosPrincipales">Productos a producir</div>
                    <div className="tabla_puntos">
                    {this.state.alimentosAProducir.length>0?
                     <MDBTable striped hover>
                            <MDBTableHead columns={columnas} />
                            <MDBTableBody>    
                            {this.retornaLista()}              
                            </MDBTableBody>
                        </MDBTable>
                        :
                        <div className="sinPuntosDeVenta">
                            <i className="fas fa-chart-bar iconoGrande"></i>
                            <br />
                            <h5>No has solicitado aún la planificación </h5>
                        </div>
                
                    }
                </div> 

                </Form>
            </div>

        );
    };
}
export default Planificacion