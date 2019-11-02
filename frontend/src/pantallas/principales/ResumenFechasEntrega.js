import '../../diseños/estilosGlobales.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { NavDropdown } from 'react-bootstrap';

const columnas = [
    {
        label: 'Fecha',
        field: 'fecha'
    },
    {
        label: 'Descripción',
        field: 'descripcion'
    },
    {
        label: 'Dirección',
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
                            <div className="tablaResumen">
                                <MDBTable striped small scrollY responsive>
                                    <MDBTableHead columns={columnas} />
                                    <MDBTableBody>{listadoPuntosEntrega}</MDBTableBody>
                                </MDBTable>
                            </div>
                            {
                                vistaProductor === true ?
                                    <div>
                                        <NavDropdown.Divider />
                                        <h6 className="grey-text">Para más detalle, revisá el listado de puntos de entrega por <Link to={'./ListadoPuntosEntrega'}>acá</Link></h6>
                                    </div>
                                    : ''
                            }
                        </div>
                    ) : (
                            <div>
                                <br />
                                <i className="fas fa-map-marker-alt iconoGrandePrincipales" />
                                <br />
                                <br />
                                <h6>No hay fechas de entrega para los próximos 30 días!</h6>
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
                            <i className="fas fa-map-marker-alt iconoGrandePrincipales" />
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