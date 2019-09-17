import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoBar = ({ totalesGraficoBar }) => {
    const data = totalesGraficoBar.map(item => item.cantidad);
    const labels = totalesGraficoBar.map(item => item.estado);
    const grafico = {
        labels, datasets: [
            {
                data,
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)'
            }
        ]
    };

    return (

        <Bar
            data={grafico}
            width={100}
            height={50}
            options={{
                maintainAspectRatio: false
            }}
        />
    );
}

export default GraficoBar;