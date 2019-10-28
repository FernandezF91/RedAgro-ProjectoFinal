import '../../diseños/estilosGlobales.css';
import React from 'react';
import BeautyStars from 'beauty-stars';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

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
                            <div className="columnaTablaCentrada">
                                <BeautyStars
                                    value={cantidadEstrellas}
                                    activeColor="#28A745"
                                    inactiveColor="#757877"
                                    size="24px"
                                />
                            </div>
                            <MDBTable striped>
                                <MDBTableHead columns={columnas} />
                                <MDBTableBody>{listadoCalificaciones}</MDBTableBody>
                            </MDBTable>
                            <h6 className="grey-text">Para más detalle, revisa el listado de calificaciones por <Link to={'./Calificaciones'}>acá</Link></h6>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <i className="fas fa-star iconoGrande" />
                                <br />
                                <br />
                                <h6>Ups! No tenes calificaciones!</h6>
                                <h6 className="grey-text">Revisa el estado de tus reservas por <Link to={'./ListadoReservas'}>acá</Link></h6>
                            </div>
                        )
                ) : (
                        <div>
                            <br />
                            <i className="fas fa-star iconoGrande" />
                            <br />
                            <br />
                            <h6 className="grey-text">Ups! Ocurrió un error al calcular el promedio de las calificaciones. Reintentá en unos minutos!</h6>
                        </div>
                    )
            }
        </div>
    );
}

export default ResumenCalificaciones;