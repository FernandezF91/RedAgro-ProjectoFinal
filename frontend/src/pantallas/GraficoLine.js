import React from 'react';
import { Line } from 'react-chartjs-2';

import '../diseños/Graficos.css';

const GraficoLine = ({ totalesGraficoLine }) => {
    const data = totalesGraficoLine.map(item => item.cantidad);
    const labels = totalesGraficoLine.map(item => item.estado);
    const grafico = {
        labels,
        datasets: [
            {
                data,
                label: "Finalizadas",
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgb(96, 217, 123, 0.3)',
                borderColor: '#60D97B',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#60D97B',
                pointBackgroundColor: '#60D97B',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#60D97B',
                pointHoverBorderColor: '#60D97B',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
            }
        ]
    };

    return (
        <div>
            {totalesGraficoLine.length > 0 ? (
                <Line
                    data={grafico}
                    height={150}
                    legend={{
                        display: false
                    }}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [
                                {
                                    offset: true,
                                    ticks: {
                                        beginAtZero: true,
                                        precision: 0
                                    }
                                }
                            ]
                        }
                    }}

                />
            ) : (
                    <div className="sinGrafico">
                        <i className="fas fa-chart-bar iconoGrandeGraficos" />
                        <br />
                        <h5>Ups! No hay datos para mostrar!</h5>
                    </div>
                )
            }
        </div>
    );
}

export default GraficoLine;