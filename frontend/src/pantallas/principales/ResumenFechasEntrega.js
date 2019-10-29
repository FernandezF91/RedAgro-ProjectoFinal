import '../../diseños/estilosGlobales.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const columnas = [
    {
        label: 'Fecha',
        field: 'fecha'
    },
    {
        label: 'Localidad',
        field: 'localidad'
    },
    {
        label: 'Direccion',
        field: 'direccion'
    }
];

const ResumenPuntosEntrega = ({ listadoPuntosEntrega, resultadoRequest, vistaProductor }) => {
    return (
        <div>
            {
                resultadoRequest === 200 ? (
                    listadoPuntosEntrega.length > 0 ? (
                        <div>
                            <MDBTable striped>
                                <MDBTableHead columns={columnas} />
                                <MDBTableBody>{listadoPuntosEntrega}</MDBTableBody>
                            </MDBTable>
                            {
                                vistaProductor === true ?
                                    <h6 className="grey-text">Para más detalle, revisa el listado de puntos de entrega por <Link to={'./ListadoPuntosEntrega'}>acá</Link></h6>
                                    : ''
                            }

                        </div>
                    ) : (
                            <div>
                                <br />
                                <i className="fas fa-map-marker-alt iconoGrande" />
                                <br />
                                <br />
                                <h6>Ups! No hay fechas de entrega para los próximos 30 días!</h6>
                                {
                                    vistaProductor === true ?
                                        <h6 className="grey-text">Cargá tus puntos de venta por <Link to={'./ListadoPuntosEntrega'}>acá</Link></h6>
                                        : ''
                                }
                            </div>
                        )
                ) : (
                        <div>
                            <br />
                            <i className="fas fa-map-marker-alt iconoGrande" />
                            <br />
                            <br />
                            <h6 className="grey-text">Ups! Ocurrió un error al obtener las fechas de entrega. Reintentá en unos minutos!</h6>
                        </div>
                    )
            }
        </div>
    );
}

export default ResumenPuntosEntrega;