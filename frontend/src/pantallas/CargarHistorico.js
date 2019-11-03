import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import Select from 'react-select';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const mostrarZonas = [
    { label: "CABA y Gran Buenos Aires", value: "CABA" },
    { label: "Buenos Aires", value: "BUENOSAIRES" },
    { label: "Neuquén", value: "NEUQUEN" },
    { label: "Tucumán", value: "TUCUMAN"}
];

class CargarHistorico extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campos: [],
			files: "",
            zona: String,
			id: this.props.id_productor,
		}
		// this.subirArchivos = this.subirArchivos.bind(this);
	}

	subirArchivos() {

		var provincia = this.zona;


        const path = "http://localhost:3000/redAgro/uploadFile";

        this.state.files.forEach((fileItem) => {

            let data = new FormData();
            data.append('file', fileItem);
            data.append('name', fileItem.name);

            fetch(path, {
                method: 'POST',
                body: data

            }).then(function(response)  { 
				if (response.status !== 200) {

                        this.setState({
                            visible: true,
                            titulo: "Error",
                            mensaje: "Ocurrió algún error inesperado. Intenta nuevamente",
                            loading: false
                        });
                        return;
            }
                    response.json().then(
                        function (response) {
                            this.subirArchivos(response);
                            this.setState({
                                loading: false
                            })
                        });

					this.mostrarMensajeOk();
			});
        })
	}
	cambiosSelectZona(opt, a, value) {
        this.zona = opt.value;
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
                                Periodo
							</Form.Label>
                            <Select value={this.state.valueCat} className="selectPeriodo" name="zonas" options={mostrarZonas} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectZona(opt, a, value)} />
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
			<div >
                 <Button variant="success" onClick={this.subirArchivos}>Guardar</Button>
            </div>
			</div>
			  
		)
	}

}
export default CargarHistorico;