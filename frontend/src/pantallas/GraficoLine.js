import React from 'react';
import { Line } from 'react-chartjs-2';

const GraficoLine = ({ totalesGraficoLine }) => {
    const dataFinalizada = totalesGraficoLine.map(item => item.cantidad);
    /*const preDataFinalizada = totalesGraficoLine.filter(item => item.estado = 'Finalizado');*/
    /*const dataFinalizada = preDataFinalizada.map(item => item.cantidad);*/
    /*const preDataCancelada = totalesGraficoLine.filter(item => item.estado = 'Cancelada');*/
    /*const dataCancelada = preDataCancelada.map(item => item.cantidad);*/
    const labels = totalesGraficoLine.map(item => item.estado);
    const grafico = {
        datasets: [
            {
                dataFinalizada,
                labels: "Finalizadas",
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
        ]
    };

    return (
        <Line
            data={grafico}
            options={{
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }}
        />
    );
}

export default GraficoLine;