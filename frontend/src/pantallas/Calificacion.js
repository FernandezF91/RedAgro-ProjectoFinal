import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Link } from 'react-router-dom';

const columnasCalificaciones = [
    {
        label: 'Reserva',
        field: 'NroReserva',
    },
    {
        label: 'Fecha de calificación',
        field: 'fechaCalificacion',
    },
    {
        label: 'Estado',
        field: 'estado',
    },
    {
        label: 'Calificación',
        field: 'calificacion',
    },
    {
        label: 'Comentario',
        field: 'comentario',
    },
    {
        label: 'Consumidor',
        field: 'consumidor',
    }
];

const calificacion = ({ lista }) => {

    return (
        <div>
            {lista.length > 0 ?
                <MDBTable striped hover>
                    <MDBTableHead columns={columnasCalificaciones} />
                    <MDBTableBody>{lista}</MDBTableBody>
                </MDBTable>
                :
                <div>
                    <i className="fas fa-star iconoGrande" />
                    <br />
                    <br />
                    <h5>Ups! No tenes calificaciones! </h5>
                    <h6 className="grey-text">Revisá el estado de tus reservas por <Link to={'./ListadoReservas'}>acá</Link></h6>
                </div>
            }
        </div>
    );
};
export default calificacion;