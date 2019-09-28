import React, { Component } from 'react';
import GraficoPie from './GraficoPie';
import GraficoLine from './GraficoLine';
import GraficoBar from './GraficoBar';

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
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        //GraficoPie
        var path = "http://localhost:3000/redAgro/obtenerMetricasReservasPorEstado?id_usuario=" + this.state.id;
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
        path = "http://localhost:3000/redAgro/obtenerMetricasProductosVendidos?id_usuario=" + this.state.id;
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
        path = "http://localhost:3000/redAgro/obtenerMetricasReservasPorMes?id_usuario=" + this.state.id;
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
                <div className="titulosPrincipales">Estadísticas</div>
                <div className="graficosPorFila">
                    <div className="graficos1">
                        <h5>Reservas por estados</h5>
                        <h6 className="titulo">(en los últimos 90 días)</h6>
                        <GraficoPie totalesGraficoPie={this.state.totalesGraficoPie} />
                    </div>
                    <div className="graficos1">
                        <h5>Total de reservas concretadas</h5>
                        <h6 className="titulo">(en los últimos 6 meses)</h6>
                        <GraficoLine totalesGraficoLine={this.state.totalesGraficoLine} />
                    </div>
                </div>
                <div className="graficosPorFila">
                    <div className="graficos2">
                        <h5>Productos vendidos</h5>
                        <h6 className="titulo">(en los últimos 90 días)</h6>
                        <GraficoBar totalesGraficoBar={this.state.totalesGraficoBar} />
                    </div>
                </div>
            </div >
        );
    };
}
export default Estadisticas;