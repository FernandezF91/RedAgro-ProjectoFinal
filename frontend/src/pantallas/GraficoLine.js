import React from 'react';
import { Line } from 'react-chartjs-2';

const GraficoLine = ({ totalesGraficoLine }) => {
    /*const dataFinalizada = totalesGraficoLine.map(item => item.cantidad);
    const preDataFinalizada = totalesGraficoLine.filter(item => item.estado = 'Finalizado');
    const dataFinalizada = preDataFinalizada.map(item => item.cantidad);
    const preDataCancelada = totalesGraficoLine.filter(item => item.estado = 'Cancelada');
    const dataCancelada = preDataCancelada.map(item => item.cantidad);
    const labels = totalesGraficoLine.map(item => item.estado);*/
    
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
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#60D97B',
                pointHoverBorderColor: '#60D97B',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
        ]
    };

    return (
        <Line
            data={grafico}
            legend={{
                display: false
            }}
            options={{
                maintainAspectRatio: false,
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
    );
}

export default GraficoLine;