import React from 'react';
import { Bar } from 'react-chartjs-2';

import '../diseños/Graficos.css';

const GraficoBar = ({ totalesGraficoBar }) => {
    const data = totalesGraficoBar.map(item => item.cantidad);
    const labels = totalesGraficoBar.map(item => item.estado);
    const grafico = {
        labels, datasets: [
            {
                data,
                label: 'Productos vendidos',
                backgroundColor: 'rgb(96, 217, 123, 0.3)',
                borderColor: '#60D97B',
                borderWidth: 3,
                hoverBackgroundColor: 'rgb(96, 217, 123, 0.3)',
                hoverBorderColor: '#60D97B'
            }
        ]
    };

    return (
        <div>
            {totalesGraficoBar.length > 0 ? (
                <Bar
                    className="grafico"
                    data={grafico}
                    legend={{
                        display: false
                    }}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [
                                {
                                    offset: true,
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    offset: true,
                                    ticks: {
                                        display: true,
                                        beginAtZero: true,
                                        precision: 0
                                    },

                                }
                            ]
                        }
                    }}
                />
            ) : (
                    <div className="sinGrafico">
                        <i className="fas fa-chart-bar iconoGrandeGraficos" />
                        <br />
                        <h6>Ups! No hay datos para mostrar! </h6>
                    </div>
                )
            }
        </div>
    );
}

export default GraficoBar;