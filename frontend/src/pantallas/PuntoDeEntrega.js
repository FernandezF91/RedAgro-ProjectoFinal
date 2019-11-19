import '../diseños/Reservas.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const columnas = [
    {
        label: 'Descripción',
        field: 'Descripción'
    },
    {
        label: 'Provincia',
        field: 'Provincia'
    },
    {
        label: 'Localidad',
        field: 'Localidad'
    },
    {
        label: 'Dirección',
        field: 'Dirección'
    },
    {
        label: 'Fecha',
        field: 'Fechas'
    },
    {
        label: 'Habilitado',
        field: 'Dar de baja',
    }
];

const PuntoDeEntrega = ({ puntosDeEntrega }) => {
    return (
        <div>
            {puntosDeEntrega.length > 0 ?
                <MDBTable striped hover>
                    <MDBTableHead columns={columnas} />
                    <MDBTableBody>{puntosDeEntrega}</MDBTableBody>
                </MDBTable>
                :
                <div className="listadoSinItems">
                    <i className="fas fa-map-marker-alt iconoGrande" />
                    <br />
                    <br />
                    <h5>Ups! No tenés puntos de venta cargados! </h5>
                    <h6 className="grey-text">Cargá tus puntos de venta <Link to={'/principalProductores/NuevoPuntoEntrega'}>acá</Link></h6>
                </div>
            }
        </div >
    );
}

export default PuntoDeEntrega;