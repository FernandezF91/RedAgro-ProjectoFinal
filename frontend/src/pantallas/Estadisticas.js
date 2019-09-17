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
                            cantidad: item.cantidad,
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
                            mes: item.segundaClave,
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
                        <h5>Reservas por estados (en los últimos 90 días)</h5>
                        <GraficoPie totalesGraficoPie={this.state.totalesGraficoPie} />
                    </div>
                    <div className="graficos1">
                        <h5>Total de reservas concretadas (en los ultimos 6 meses)</h5>
                        {/* <GraficoLine totalesGraficoLine={this.state.totalesGraficoLine} /> */}
                    </div>
                </div>
                <div className="graficosPorFila graficos2">
                    <h5>Productos vendidos (en los últimos 90 días)</h5>
                    <GraficoBar totalesGraficoBar={this.state.totalesGraficoBar} />
                </div>
            </div >
        );
    };
}
export default Estadisticas;