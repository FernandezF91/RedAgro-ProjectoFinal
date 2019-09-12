import React, { Component } from 'react';
import GraficoPie from './GraficoPie';
import GraficoLine from './GraficoLine';
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
                        <h5>Reservas por estados</h5>
                        <GraficoPie />
                    </div>
                    <div className="graficos1">
                        <h5>Productos disponibles a la venta</h5>
                        <GraficoPie />
                    </div>
                </div>
                <div className="graficosPorFila">
                    <div className="graficos2">
                        <h5>Reservas por fecha</h5>
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
Reservas agrupadas por estados. --> Grafico torta
Reservas agrupadas por fecha de la operación --> Grafico linea
Productos disponibles --> Grafico torta
Se podrán divisar diferenciaciones entre los diferentes estados de las reservas en los gráficos que no sean específicamente de estados. */
