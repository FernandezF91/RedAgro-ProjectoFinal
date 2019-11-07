import '../diseños/estilosGlobales.css';
import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Card } from 'react-bootstrap';
import moment from 'moment';

const columnas_detalle = [
    {
        label: 'Fecha',
        field: 'fecha',
    },
    {
        label: 'Desde',
        field: 'horaInicio',
    },
    {
        label: 'Hasta',
        field: 'Cantidad',
    }
]

const DetalleFechasEntrega = ({ item }) => {
    return (
        <tr key={"row-expanded-" + item.id}>
            <td colSpan="10">
                <div className="tablaDetalleFechasEntrega">
                    <Card border="success">
                        <Card.Header>Horarios de atención </Card.Header>
                        <Card.Body>
                            <MDBTable striped small borderless>
                                <MDBTableHead columns={columnas_detalle} />
                                <MDBTableBody>
                                    {
                                        item.fechas_entrega.map(detalleUnaFecha => (
                                            <tr key={"row-expanded-" + item.fecha} visible="false">
                                                <td>
                                                    {moment(detalleUnaFecha.fecha, 'DD-MM-YYYY').format('DD/MM/YYYY')}
                                                </td>
                                                <td>
                                                    {detalleUnaFecha.hora_inicio}
                                                </td>
                                                <td>
                                                    {detalleUnaFecha.hora_fin}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </Card.Body>
                    </Card>
                </div>
            </td>
        </tr>
    )
}
export default DetalleFechasEntrega;