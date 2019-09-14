import React from 'react';
import { MDBTable , MDBTableHead, MDBTableBody } from 'mdbreact';

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

    const rows = [
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      },
      {
        Categoría: 'Verduras',
        Tipo: 'Tomate',
        Titulo: 'Gran tomate',
        Descripcion: 'Soy la descripcion del mejor tomate',
        Stock: '43',
        TipoDeUnidad: 'Kg',
        TipoDeProduccion: 'Agroecologica',
        Precio: '$100',
        FechaDeVencimiento: '26/08/2019',
        TiempoDePreparacion: '4',
      },
      {
        Categoría: 'Frutas',
        Tipo: 'Naranja',
        Titulo: 'Naranja mecanica',
        Descripcion: 'Soy la descripcion de la naranja mecanica',
        Stock: '1',
        TipoDeUnidad: 'Bolson',
        TipoDeProduccion: 'Organico',
        Precio: '$1',
        FechaDeVencimiento: '31/10/2019',
        TiempoDePreparacion: '',
      }
    ];

  return (
    <MDBTable striped autoWidth>
      <MDBTableHead columns = {columns} />
      <MDBTableBody rows={props.productos} />
    </MDBTable >
  );
}

export default TablePage;