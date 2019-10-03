import React, { Component } from 'react';
import Producto from './Producto';
import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import '../diseños/ListadoPuntosEntrega.css';
import Modal from 'react-awesome-modal';
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const columnas = [
    {
        label: 'Provincia',
        field: 'Provincia'
    },
    {
        label: 'Localidad',
        field: 'Localidad'
    },
    {
        label: 'Dirección',
        field: 'Dirección'
    },
    {
		label: '',
		field: 'Dar de baja',
	}
];

class ListadoPuntosEntrega extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_productor,
            puntos_entrega: [],
            loading: true,
            titulo:"",
            mensaje:"",
            visible:""
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    handleRowClick(rowId,activo) {
        
            activo===true?

            this.setState({visible:true,titulo:"Baja de punto de entrega",mensaje:"¿Estás seguro que no vas a vender/entregar tus productos en esta ubicación?"})

            :

 this.setState({visible:true,titulo:"Alta de punto de entrega",mensaje:"¿Estás seguro que vas a vender/entregar tus productos en esta ubicación?"})


        
    }

    generoItem(item) {
        const clickCallback = () => this.handleRowClick(item.id, item.activo);

        const itemRows = [
            <tr key={"row-data-" + item.id}>
                <td>{item.provincia}</td>
                <td>{item.localidad}</td>
                <td>{item.direccion}</td>
                <td>                
                    {    
                    item.activo===false?
                    <i class="fa fa-check-circle verde iconosTabla" onClick={clickCallback} title="Alta"></i>
                    :
                    <i class="fa fa-times-circle rojo iconosTabla" onClick={clickCallback} title="Baja"></i>
                    }                                       
                </td>
            </tr>
        ];

        return itemRows;
    }

    componentDidMount() {

    var _this=this;

  fetch("http://localhost:3000/redAgro/puntos_productor?id="+this.state.id, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    _this.setState({
                        visible: true,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                    });
                   
                    return;
                }

                response.json().then(
                    function (response) {
                    
                        response.forEach(element => {
                            
                            _this.setState({puntos_entrega:[..._this.state.puntos_entrega,element]});

                        });

                        _this.setState({loading:false});

                    });
            });


    }

    render() {

        let body = [];
        this.state.puntos_entrega.forEach(item => {
            body.push(this.generoItem(item));
        })

        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
        )

        return (
			<div>
                <div className="titulosPrincipales">Puntos de entrega</div>
				<div className="tabla_puntos">
				{this.state.puntos_entrega.length>0?
                <MDBTable striped responsive hover>
					<MDBTableHead columns={columnas} />
					<MDBTableBody>{body}</MDBTableBody>
				</MDBTable>
				:
				<div className="sinPuntosDeVenta">
					<i className="fas fa-store iconoGrande"></i>
					<br />
					<br />
					<h5>Ups! No tenes puntos de venta cargados! </h5>
                    <h6>Cargá tus puntos de venta <Link to={'/principalProductores/IngresarPuntoEntrega'}>acá</Link> </h6>
				</div>
				}
            </div>
            <section>
                        <Modal
                            visible={this.state.visible}
                            width="400"
                            height="230"
                            effect="fadeInUp"

                        >
                            <div>
                                <h1>{this.state.titulo}</h1>
                                <p>
                                    {this.state.mensaje}
                                </p>
                                <Button variant="success" onClick={() => this.closeModal()}>Si</Button>
                            <Button variant="success" onClick={() => this.closeModal()}>No</Button>
                            </div>
                        </Modal>
                    </section>
			</div>
			
        );
    };
}
export default ListadoPuntosEntrega;