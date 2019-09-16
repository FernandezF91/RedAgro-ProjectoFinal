import React from 'react';
import { Pie } from 'react-chartjs-2';

const GraficoPie = ({ totalesGraficoPie }) => {
    const data = totalesGraficoPie.map(item => item.cantidad);
    const labels = totalesGraficoPie.map(item => item.estado);
    const grafico = {
        labels, datasets: [{
            data, backgroundColor: [
                '#FF6384',
                '#FFCE56',
                '#D960BD',
                '#6081D9',
                '#60D97B'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#FFCE56',
                '#D960BD',
                '#6081D9',
                '#60D97B'
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
                    fullWidth: true,
                    reverse: false,
                    labels: {
                        fontColor: 'rgb(0, 0, 0)'
                    }
                }
            }}
        />
    );
}

export default GraficoPie;