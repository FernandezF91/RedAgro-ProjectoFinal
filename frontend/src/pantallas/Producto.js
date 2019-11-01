import '../diseños/Reservas.css';
import '../diseños/estilosGlobales.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const columnas = [
    {
        label: 'Categoría',
        field: 'Categoria'
    },
    {
        label: 'Tipo',
        field: 'Tipo'
    },
    {
        label: 'Título',
        field: 'titulo'
    },
    {
        label: 'Descripción',
        field: 'Descripcion'
    },
    {
        label: 'Stock',
        field: 'Stock'
    },
    {
        label: 'Tipo de unidad',
        field: 'TipoDeUnidad'
    },
    {
        label: 'Tipo de producción',
        field: 'TipoDeProduccion'
    },
    {
        label: 'Precio',
        field: 'Precio'
    },
    {
        label: 'Fecha de vencimiento',
        field: 'FechaDeVencimiento'
    },
    {
        label: 'Tiempo de preparación (días)',
        field: 'TiempoDePreparacion'
    },
    {
        label: '',
        field: 'Editar',
    },
    {
        label: '',
        field: 'Ofertas',
    },
    {
        label: '',
        field: 'EstadoProducto',
    }
];

const Producto = ({ productos }) => {
    return (
        <div>
            {productos.length > 0 ?
                <MDBTable striped hover>
                    <MDBTableHead columns={columnas} />
                    <MDBTableBody>{productos}</MDBTableBody>
                </MDBTable>
                :
                <div className="listadosSinItems">
                    <i className="fas fa-store iconoGrande"></i>
                    <br />
                    <br />
                    <h5>Ups! No tenes productos cargados! </h5>
                    <h6 className="grey-text">Cargá tus productos <Link to={'/principalProductores/NuevoProducto'}>acá</Link> </h6>
                </div>
            }
        </div >
    );
}

export default Producto;