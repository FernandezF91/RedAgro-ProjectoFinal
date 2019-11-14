import '../../diseños/EstilosGenerales.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { NavDropdown } from 'react-bootstrap';

const columnas = [
    {
        label: 'Titulo',
        field: 'titulo'
    },
    {
        label: 'Stock',
        field: 'stock'
    },
    {
        label: 'Vencimiento',
        field: 'fechaVencimiento'
    }
];

const ResumenProductosProductor = ({ listadoProductosProductor, resultadoRequest }) => {
    return (
        <div>
            {
                resultadoRequest === 200 ? (
                    listadoProductosProductor.length > 0 ? (
                        <div>
                            <div className="tablaResumen">
                                <MDBTable striped small scrollY responsive thin>
                                    <MDBTableHead columns={columnas} />
                                    <MDBTableBody>{listadoProductosProductor}</MDBTableBody>
                                </MDBTable>
                            </div>
                            <NavDropdown.Divider />
                            <h6 className="grey-text">Para más detalle, revisá el listado de productos por <Link to={'./ListadoProductos'}>acá</Link></h6>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <br />
                                <br />
                                <i className="fas fa-store iconoGrandePrincipales" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <h6>No tenes productos fuera de stock o vencidos!</h6>
                                <h6 className="grey-text">Revisá tus productos por <Link to={'./ListadoProductos'}>acá</Link></h6>
                            </div>
                        )
                ) : (
                        <div>
                            <br />
                            <br />
                            <br />
                            <i className="fas fa-store iconoGrandePrincipales" />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h6 className="grey-text">Ups! Ocurrió un error al obtener el listado de productos. Reintentá en unos minutos!</h6>
                        </div>
                    )
            }
        </div>
    );
}

export default ResumenProductosProductor;