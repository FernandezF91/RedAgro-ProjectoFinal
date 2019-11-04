import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import Select from 'react-select';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import Modal from 'react-awesome-modal';
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const mostrarZonas = [
    { label: "CABA y Gran Buenos Aires", value: "CABA" },
    { label: "Buenos Aires", value: "BUENOSAIRES" },
    { label: "Catamarca", value: "CATAMARCA" },
	{ label: "Chaco", value: "CHACO"},
	{ label: "Chubut", value: "CHUBUT" },
    { label: "Córdoba", value: "CORDOBA" },
    { label: "Corrientes", value: "CORRIENTES" },
	{ label: "Entre Ríos", value: "ENTRERIOS"},
	{ label: "Formosa", value: "FORMOSA" },
    { label: "Jujuy", value: "JUJUY" },
    { label: "La Pampa", value: "LAPAMPA" },
	{ label: "La Rioja", value: "LARIOJA"},
	{ label: "Mendoza", value: "MENDOZA" },
    { label: "Misiones", value: "MISIONES" },
    { label: "Neuquén", value: "NEUQUEN" },
	{ label: "Rio Negro", value: "RIO NEGRO"},
	{ label: "Salta", value: "SALTA" },
    { label: "San Juan", value: "SANJUAN" },
    { label: "San Luis", value: "SANLUIS" },
	{ label: "Santa Cruz", value: "SANTACRUZ"},
	{ label: "Santa Fe", value: "SANTAFE" },
    { label: "Santiago del Estero", value: "SANTIAGO" },
    { label: "Tierra del Fuego", value: "TIERRA" },
	{ label: "Tucumán", value: "TUCUMAN"}
];

class CargarHistorico extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campos: [],
			files: "",
			titulo:"",
			mensaje:"",
			zona: String,
			visible:"",
			formOK:"",
			id: this.props.id_productor,
		}
		this.subirArchivos = this.subirArchivos.bind(this);
		this.validarCampos = this.validarCampos.bind(this);
      //  this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

	}

	mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }

	 mostrarMensajeOk() {
        this.setState({
            visible: true
        });
    }

	closeModal() {
		if(this.state.formOK === true){
		this.mostrarPantallaPrincipal()
			return;
	}

		this.setState({
            visible: false
        });
	}
	
 validarCampos() {
        if ((this.state.files.length === 0) || (this.state.zona === "")) {

this.setState({
                            visible: true,
                            titulo: "Error",
							mensaje: "Campos incompletos o incorrectos",
							formOK:false,
                        });

            return false
		}
		
        return true
    }

	subirArchivos() {
		var _this = this

		const path = "http://localhost:3000/redAgro/uploadFile?zona="+this.state.zona;
		
		if(_this.validarCampos()){
        _this.state.files.forEach((fileItem) => {

            let data = new FormData();
            data.append('file', fileItem);
            data.append('name', fileItem.name);

            fetch(path, {
                method: 'POST',
                body: data

            }).then(function(response)  { 
				if (response.status !== 200) {

                        _this.setState({
                            visible: true,
                            titulo: "Error",
							mensaje: "Ocurrió algún error inesperado. Intenta nuevamente",
							formOK:false,
                        });
                        return;
            }
                    response.text().then(
                        function (response) {
						   
						 	_this.setState({
                             visible: true,
                             titulo: "Ok",
							 mensaje: "El archivo se guardo correctamente",
							 formOK:true,
                         });
                           
                        });

					_this.mostrarMensajeOk();
			});
		})


}

	}
	cambiosSelectZona(opt, a, value) {
        this.setState({zona:opt.value});
    }
	

	render() {
		return (
			<div className="container">
				<div clasName="imagenes">
					<div className="titulosPrincipales">Cargar archivos históricos</div>
				</div>
				<br></br>
				<h5>Seleccione zona de venta de sus productos</h5>
				<div className="dropdownPeriodo">
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>
                                Zona de venta
							</Form.Label>
							<Select value={this.state.valueCat} className="selectPeriodo" name="zonas" options={mostrarZonas} 
								placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectZona(opt, a, value)} />
                        </Form.Group>
                </div>
				<br></br>
				<div clasName="imagenes">
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
				 <section>
                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="120"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>{this.state.mensaje}</p>
                            <a href="javasript.void(0)" onClick={() => this.closeModal()}>Volver</a>
                        </div>
                    </Modal>
                </section>
			<div >
                 <Button variant="success" onClick={this.validarCampos}>Guardar</Button>
            </div>
			</div>
			  
		)
	}

}
export default CargarHistorico;