import React, { Component } from 'react';
import GraficoPie from './GraficoPie';
import GraficoLine from './GraficoLine';
import GraficoBar from './GraficoBar';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import '../diseños/Graficos.css';

class Estadisticas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_productor,
            totalesGraficoPie: [],
            totalesGraficoLine: [],
            totalesGraficoBar: []
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        //GraficoPie
        var path = "http://"+window.$ip+":3000/redAgro/obtenerMetricasReservasPorEstado?id_usuario=" + this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    totalesGraficoPie: data.map((item) => {
                        return {
                            estado: item.clave,
                            cantidad: item.cantidad,
                        }
                    })
                })
            })

        //GraficoBar
        path = "http://"+window.$ip+":3000/redAgro/obtenerMetricasProductosVendidos?id_usuario=" + this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    totalesGraficoBar: data.map((item) => {
                        return {
                            estado: item.clave,
                            cantidad: item.cantidadSum,
                        }
                    })
                })
            })

        //GraficoLine
        path = "http://"+window.$ip+":3000/redAgro/obtenerMetricasReservasPorMes?id_usuario=" + this.state.id;
        fetch(path)
            .catch(err => console.error(err))
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({
                    totalesGraficoLine: data.map((item) => {
                        return {
                            estado: item.clave,
                            cantidad: item.cantidad,
                        }
                    })
                })
            })
    }

    render() {
        return (
            <div>
                <br />
                <MDBRow className="graficosCentrados">
                    <MDBCol className="col-6">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h3>Reservas por estados</h3>
                                    <h4 className="titulo grey-text">(en los últimos 90 días)</h4>
                                </MDBCardTitle>
                                <br />
                                <MDBCardText>
                                    <GraficoPie totalesGraficoPie={this.state.totalesGraficoPie} />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className="col-6">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h3>Total de reservas concretadas</h3>
                                    <h4 className="titulo grey-text">(en los últimos 6 meses)</h4>
                                </MDBCardTitle>
                                <br />
                                <MDBCardText>
                                    <GraficoLine totalesGraficoLine={this.state.totalesGraficoLine} />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="graficosCentrados">
                    <MDBCol>
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardTitle>
                                    <h3>Productos vendidos</h3>
                                    <h4 className="titulo grey-text">(en los últimos 90 días)</h4>
                                </MDBCardTitle>
                                <br />
                                <MDBCardText>
                                    <GraficoBar totalesGraficoBar={this.state.totalesGraficoBar} />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div >
        );
    };
}
export default Estadisticas;