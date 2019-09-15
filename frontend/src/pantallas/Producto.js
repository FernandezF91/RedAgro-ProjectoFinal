import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const TablePage = (props) => {
	const columns = [
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
		}
	];

	return (
		<MDBTable striped autoWidth>
			<MDBTableHead columns={columns} />
			<MDBTableBody rows={props.productos} />
		</MDBTable >
	);
}

export default TablePage;