import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import Select from 'react-select';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import Modal from 'react-awesome-modal';
import { MDBModal } from 'mdbreact';
import Loader from 'react-loader-spinner';

import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const mostrarZonas = [
	{ label: "CABA y Gran Buenos Aires", value: "CABA" },
	{ label: "Buenos Aires", value: "BUENOSAIRES" },
	{ label: "Catamarca", value: "CATAMARCA" },
	{ label: "Chaco", value: "CHACO" },
	{ label: "Chubut", value: "CHUBUT" },
	{ label: "Córdoba", value: "CORDOBA" },
	{ label: "Corrientes", value: "CORRIENTES" },
	{ label: "Entre Ríos", value: "ENTRERIOS" },
	{ label: "Formosa", value: "FORMOSA" },
	{ label: "Jujuy", value: "JUJUY" },
	{ label: "La Pampa", value: "LAPAMPA" },
	{ label: "La Rioja", value: "LARIOJA" },
	{ label: "Mendoza", value: "MENDOZA" },
	{ label: "Misiones", value: "MISIONES" },
	{ label: "Neuquén", value: "NEUQUEN" },
	{ label: "Rio Negro", value: "RIO NEGRO" },
	{ label: "Salta", value: "SALTA" },
	{ label: "San Juan", value: "SANJUAN" },
	{ label: "San Luis", value: "SANLUIS" },
	{ label: "Santa Cruz", value: "SANTACRUZ" },
	{ label: "Santa Fe", value: "SANTAFE" },
	{ label: "Santiago del Estero", value: "SANTIAGO" },
	{ label: "Tierra del Fuego", value: "TIERRA" },
	{ label: "Tucumán", value: "TUCUMAN" }
];

class CargarHistorico extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: "",
			mensaje: "",
			formOK: "",
			loading: false,
			resultadoRequest: 0,
			showModal: false,
			id: this.props.id_productor,
		}
		this.subirArchivos = this.subirArchivos.bind(this);
		this.validarCampos = this.validarCampos.bind(this);
		this.cerrarModal = this.cerrarModal.bind(this);
	    this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

	}

	mostrarPantallaPrincipal() {
		this.props.history.push({
			pathname: '/principalProductores/MiCuenta',
			state: {
				id: this.state.id
			}
		})
	}

	validarCampos() {

		if (this.state.files.length === 0) {

			this.setState({
				showModal:true,
				mensaje: "Tenés que cargar un archivo",
				formOK: false,
			});

			return false
		}

		return true
	}

	subirArchivos() {
		var _this = this

		var file = _this.state.files[0]

		const path = "http://localhost:3000/redAgro/uploadFile";

		if (_this.validarCampos()) {


			var formato = file.name.split(".")
			
			if(formato[1]==="csv")
			{
				let data = new FormData();
				data.append('file', file);
				data.append('name', file.name);

		
				fetch(path, {
					method: 'POST',
					body: data

				}).then(function (response) {
					if (response.status !== 200) {

						_this.setState({
							showModal:true,
							mensaje: "Ocurrió algún error inesperado. Intenta nuevamente",
							formOK: false,
							resultadoRequest: false
						});
						return;
					}
					response.text().then(
						function (response) {

							_this.setState({
								showModal:true,
								mensaje: "El archivo se guardo correctamente",
								formOK: true,
								resultadoRequest: true
							});

						});

				});
	
			}else{


              _this.setState({
							showModal:true,
							mensaje: "El archivo debe ser .csv",
							formOK: false,
                });
			}

		}

	}


	cerrarModal() {

		if(this.state.formOK===true){

       this.mostrarPantallaPrincipal()

		}
        this.setState({
            showModal: false
        })
    }


	render() {

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
			<div className="container">
				<div className="imagenes">
					<div className="titulosPrincipales">Cargar archivos históricos</div>
				</div>
				<br></br>
				<div className="imagenes">
					<div className="titulosPrincipales"></div>
					<h5>Seleccione los archivos históricos a cargar</h5>
					<FilePond
						ref="filep"
						allowMultiple={false}
						maxFiles={1}
						labelIdle={"Arrastre o suba sus archivos aquí"}
						onupdatefiles={(fileItems) => {
							// Set current file objects to this.state
							this.setState({
								files: fileItems.map(fileItem => fileItem.file)
							});

						}} />
				</div>
				{
                    (this.state.showModal) &&
                    (
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                {(this.state.resultadoRequest === true) ?
                                    (
                                        <div>
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-exclamation-circle iconoModalError" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    )
                                }
                            </div>
                        </MDBModal>
                    )
                }
				<div >
					<Button variant="success" onClick={()=>this.subirArchivos()}>Guardar</Button>
				</div>
			</div>

		)
	}

}
export default CargarHistorico;