import React from "react";
import '../diseños/Reservas.css';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

const PaginacionDeReservas = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination paginado">
      <MDBRow center>
        <MDBCol bottom>
          <MDBPagination circle color="teal">
            {
              props.currentPage > 1 ?
                <MDBPageItem>
                  <MDBPageNav className="page-link" onClick={() => props.nextPage(props.currentPage - 1)}>
                    Anterior
                  </MDBPageNav>
                </MDBPageItem>
                //Caso contrario no muestro nada
                :
                <MDBPageItem disabled>
                  <MDBPageNav className="page-link">
                    Anterior
                  </MDBPageNav>
                </MDBPageItem>
            }
            {
              pageNumbers.map(number => (
                <MDBPageItem active={props.currentPage !== number ? false : true}>
                  <MDBPageNav className="page-link" onClick={() => props.nextPage(number)}>
                    {number}
                    {number !== props.currentPage ? '' : <span className="sr-only">(current)</span>}
                  </MDBPageNav>
                </MDBPageItem>
              ))
            }
            {
              props.currentPage < props.pages ?
                <MDBPageItem>
                  <MDBPageNav className="page-link" onClick={() => props.nextPage(props.currentPage + 1)}>
                    Siguiente
                  </MDBPageNav>
                </MDBPageItem>
                :
                <MDBPageItem disabled>
                  <MDBPageNav className="page-link">
                    Siguiente
                  </MDBPageNav>
                </MDBPageItem>
            }
          </MDBPagination>
        </MDBCol >
      </MDBRow >
    </div>

  )
}
export default PaginacionDeReservas;