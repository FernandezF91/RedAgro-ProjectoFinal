import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoBar = ({ totalesGraficoBar }) => {
    const data = totalesGraficoBar.map(item => item.cantidad);
    const labels = totalesGraficoBar.map(item => item.estado);
    const grafico = {
        labels, datasets: [
            {
                data,
                label: 'Productos vendidos',
                backgroundColor: '#60D97B',
                borderColor: '#60D97B',
                borderWidth: 1,
                hoverBackgroundColor: '#60D97B',
                hoverBorderColor: '#60D97B'
            }
        ]
    };

    return (

        <Bar
            data={grafico}
            legend={{
                display: false
            }}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            offset: true
                        }
                    ],
                    yAxes: [
                        {
                            offset: true,
                            ticks: {
                                display: true,
                                beginAtZero: true
                            },
                        }
                    ]
                }
            }}
        />
    );
}

export default GraficoBar;