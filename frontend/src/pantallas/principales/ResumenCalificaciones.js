import '../../diseños/EstilosGenerales.css';
import React from 'react';
import BeautyStars from 'beauty-stars';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { NavDropdown } from 'react-bootstrap';

const columnas = [
    {
        label: 'Fecha',
        field: 'fechaCalificacion'
    },
    {
        label: 'Valor',
        field: 'valor'
    },
    {
        label: 'Comentario',
        field: 'comentario'
    }
];

const ResumenCalificaciones = ({ cantidadEstrellas, listadoCalificaciones, resultadoRequest }) => {
    return (
        <div>
            {
                resultadoRequest === 200 ? (
                    cantidadEstrellas > 0 ? (
                        <div>
                            <div className="tablaResumen">
                                <div className="columnaTablaCentrada">
                                    <BeautyStars
                                        value={cantidadEstrellas}
                                        activeColor="#28A745"
                                        inactiveColor="#CCC"
                                        size="24px"
                                    />
                                </div>
                                <MDBTable striped small scrollY responsive className="alturaTablaCalificaciones">
                                    <MDBTableHead columns={columnas} />
                                    <MDBTableBody>{listadoCalificaciones}</MDBTableBody>
                                </MDBTable>
                            </div>
                            <NavDropdown.Divider />
                            <h6 className="grey-text">Para más detalle, revisá el listado de calificaciones por <Link to={'./Calificaciones'}>acá</Link></h6>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <br />
                                <br />
                                <i className="fas fa-star iconoGrandePrincipales" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <h6>No tenes calificaciones!</h6>
                                <h6 className="grey-text">Revisá el estado de tus reservas por <Link to={'./ListadoReservas'}>acá</Link></h6>
                            </div>
                        )
                ) : (
                        <div>
                            <br />
                            <br />
                            <br />
                            <i className="fas fa-star iconoGrandePrincipales" />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h6 className="grey-text">Ups! Ocurrió un error al calcular el promedio de las calificaciones. Por favor, reintentá en unos minutos!</h6>
                        </div>
                    )
            }
        </div>
    );
}

export default ResumenCalificaciones;