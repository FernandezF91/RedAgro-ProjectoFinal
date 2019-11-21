import '../diseños/EstilosGenerales.css';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { MDBModal, MDBCard, MDBRow, MDBCol } from 'mdbreact';
import Loader from 'react-loader-spinner';

import { Button } from 'react-bootstrap';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

class CargarHistorico extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: "",
			mensaje: "",
			validaciones: [],
			loading: false,
			resultadoRequest: 0,
			showModal: false,
			id: this.props.id_productor,
		}
		this.subirArchivos = this.subirArchivos.bind(this);
		this.validarCampos = this.validarCampos.bind(this);
		this.cerrarModal = this.cerrarModal.bind(this);
		this.cerrarModalError = this.cerrarModalError.bind(this);
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
		var showModal = false;
		this.setState({
			validaciones: []
		});
		let validaciones = [];

		if (this.state.files.length === 0) {
			validaciones["archivo"] = "Campo requerido";
			showModal = true;
		}

		if (showModal) {
			this.setState({
				validaciones: validaciones,
				showModal: showModal,
				mensaje: "Ups! No seleccionaste ningún archivo",
				loading: false,
				resultadoRequest: 0
			});
			return false;
		} else {
			return true;
		}
	}

	subirArchivos() {
		var _this = this

		this.setState({
			loading: true
		});

		var file = _this.state.files[0]
		const path = "http://" + window.$ip + ":3000/redAgro/uploadFile";

		if (_this.validarCampos()) {
			var formato = file.name.split(".")

			if (formato[1] === "csv") {
				let data = new FormData();
				data.append('file', file);
				data.append('name', file.name);


				fetch(path, {
					method: 'POST',
					body: data

				}).then(function (response) {
					if (response.status !== 200) {

						_this.setState({
							showModal: true,
							mensaje: "Ocurrió un error al procesar el archivo. Por favor, reintentá en unos minutos",
							resultadoRequest: 0,
							loading: false
						});
						return;
					}
					response.text().then(
						function (response) {
							_this.setState({
								showModal: true,
								mensaje: "Archivo importado correctamente!",
								resultadoRequest: 200,
								loading: false
							});
						});
				});

			} else {
				this.setState({
					validaciones: []
				});
				let validaciones = [];

				validaciones["archivo"] = "Formato inválido";

				_this.setState({
					validaciones: validaciones,
					mensaje: "Ups! El formato del archivo no es el correcto",
					loading: false,
					resultadoRequest: 0,
					showModal: true
				});
			}
		}
	}

	cerrarModal() {
		this.setState({
			showModal: false,
		})
		this.mostrarPantallaPrincipal();
	}

	cerrarModalError() {
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
				<div className="titulosPrincipales">Cargar archivos históricos</div>
				<MDBCard className="boxSinPreferencias mb-4 py-3">
					<i className="fas fa-info-circle iconoBoxGris" />
					<ul className="listaInstruccionesHistorico">
						<li>Desde esta sección, se podrán importar archivos con el formato CSV (valores separados por comas). Por ejemplo, "MiArchivo.csv".</li>
						<li>Los datos que se deben incluir en el mismo son los siguientes: Categoría, Producto, Cantidad vendida, Mes, Zona de venta y año.</li>
						<li>El siguiente es un ejemplo de cómo se debería ver el archivo:
							<ul>
								<li>Frutas,Banana,100,1,CABA,2018</li>
								<li>Frutas,Manzana,500,2,CABA,2018</li>
							</ul>
						</li>
					</ul>
				</MDBCard>
				<MDBRow className="justifyContentCenter">
					<span md="3">Archivo a importar</span>
					{
						(this.state.validaciones["archivo"]) &&
						<i className="fa fa-exclamation-circle mensajeErrorForm" />
					}
				</MDBRow>
				<br />
				<FilePond
					className="cursorManito cajaImagenesWidth"
					ref="filep"
					allowMultiple={false}
					maxFiles={1}
					labelIdle={"Arrastre o suba su archivo aquí"}
					onupdatefiles={(fileItems) => {
						// Set current file objects to this.state
						this.setState({
							files: fileItems.map(fileItem => fileItem.file)
						});
					}}
				/>
				{
					(this.state.validaciones["archivo"]) ?
						<MDBRow center className="cajaImagenesWidth">
							<MDBCol md="6">
								<div className="mensajeErrorCampos">{this.state.validaciones["archivo"]}</div>
							</MDBCol>
							<MDBCol md="6">
								<div className="condicionesInputs">(*) 1 archivo como máximo</div>
							</MDBCol>
						</MDBRow>
						:
						<MDBRow>
							<div className="condicionesInputs col-md-8 cajaImagenesWidth">(*) 1 archivo como máximo</div>
						</MDBRow>
				}
				<div className="botones">
					<Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
					<Button variant="success" onClick={() => this.subirArchivos()}>Guardar</Button>
				</div>
				{
					<MDBModal isOpen={this.state.showModal} centered size="sm">
						<div className="modalMargenes" tabIndex="0">
							{(this.state.resultadoRequest === 200) ?
								(
									<div>
										<i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
										<br />
										<i className="fas fa-check-circle iconoModalOk" />
										<br />
										<br />
										<h5>{this.state.mensaje}</h5>
									</div>
								) : (
									<div>
										<i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
										<br />
										<i className="fas fa-exclamation-circle iconoModalError" />
										<br />
										<br />
										<h5>{this.state.mensaje}</h5>
									</div>
								)
							}
						</div>
					</MDBModal>
				}
			</div >
		)
	}
}
export default CargarHistorico;