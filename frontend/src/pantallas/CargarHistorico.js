import React, { Component } from 'react';
import Files from 'react-files';
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondTypeValidate from "filepond-plugin-file-validate-type";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


class CargarHistorico extends Component {

	constructor(props) {
		super(props);
		this.state = {
			campos: [],
			files: "",
			id:this.props.id_producto,
		}
	this.subirArchivos = this.subirArchivos.bind(this);
	}


	render(){
		return (
	<div>
		<div className="container">
			
				<div clasName="imagenes">
							<div className ="tituloHistorico">
								<p></p>
								<h1>*Cargar Archivos Históricos:</h1>
								<p></p>
								</div>
								<FilePond ref="filep"
						 allowMultiple={false} maxFiles={1} labelIdle={"Arrastre o suba sus archivos aquí"}
								onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });

                          }}/>
							</div>

		</div>

	</div>
		)}
	
}
export default CargarHistorico;