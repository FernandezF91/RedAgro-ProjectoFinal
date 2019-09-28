import React from 'react';
import { Pie } from 'react-chartjs-2';

const GraficoPie = ({ totalesGraficoPie }) => {
    const data = totalesGraficoPie.map(item => item.cantidad);
    const labels = totalesGraficoPie.map(item => item.estado);
    const grafico = {
        labels, datasets: [{
            data,
            backgroundColor: [
                '#FF6384',
                '#FFCE56',
                '#D960BD',
                '#6081D9',
                '#60D97B'
            ],
            hoverBackgroundColor: [
                'rgb(255, 99, 132, 0.8)',
                'rgb(255, 206, 86, 0.8)',
                'rgb(217, 96, 189, 0.8)',
                'rgb(96, 129, 217, 0.8)',
                'rgb(96, 217, 123, 0.8)'
            ]
        }]
    };

    return (
        <Pie
            data={grafico}
            options={{
                maintainAspectRatio: true,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: 'rgb(0, 0, 0)'
                    }
                }
            }}
        />
    );
}

export default GraficoPie;