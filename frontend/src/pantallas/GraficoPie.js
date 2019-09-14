import React from 'react';
import { Pie } from 'react-chartjs-2';

const GraficoPie = () => {
    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };

    return (

        <Pie
            data={data}
            options={{
                maintainAspectRatio: true,
                legend: {
                    display: true,
                    position: 'right',
                    fullWidth: true,
                    reverse: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }}
        />
    );
}

export default GraficoPie;