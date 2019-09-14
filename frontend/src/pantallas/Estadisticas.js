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
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    render() {
        return (

            <div>
                <div className="titulosPrincipales">Estadísticas</div>
                <div className="graficosPorFila">
                    <div className="graficos1">
                        <h5>Reservas por estados (en los últimos 90 días)</h5>
                        <GraficoPie />
                    </div>
                    <div className="graficos1">
                        <h5>Productos vendidos (en los últimos 90 días)</h5>
                        <GraficoBar />
                    </div>
                </div>
                <div className="graficosPorFila">
                    <div className="graficos2">
                        <h5>Total de reservas concretadas en el ultimo año</h5>
                        <GraficoLine />
                    </div>
                </div>
            </div>
        );
    };
}
export default Estadisticas;
/*
Serán los siguientes gráficos:
Reservas agrupadas por estados en los ultimos 90 dias --> Grafico torta
Total de reservas concretadas agrupadas por mes en los ultimos 12 meses-> Grafico linea
Total de productos vendidos en los ultimos 90 dias --> Grafico barras
Se podrán divisar diferenciaciones entre los diferentes estados de las reservas en los gráficos que no sean específicamente de estados. */
