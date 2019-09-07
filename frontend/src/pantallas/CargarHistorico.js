import React, { Component } from 'react';
import Dropdown from "react-dropdown";
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondTypeValidate from "filepond-plugin-file-validate-type";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';;

// const options = [
//   'one', 'two', 'three'
// ]
// const defaultOption = 'one'


class CargarHistorico extends Component {

	constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
    this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    	alert('Your favorite flavor is: ' + this.state.value);
    	event.preventDefault();
	}


	render(){
		return (
		<div className="container">
				<form onSubmit={this.handleFormSubmit}>
					<h1>Cargar Histórico</h1>
						<div clasName="imagenes">
							<div className ="tituloImagen">
								*Imágenes:
								</div>
								<FilePond allowMultiple={true}  maxFiles={5} imagePreviewHeight={150} acceptedFileTypes="image/jpeg, image/png, image/jpg" labelIdle={"Arrastre o suba sus imágenes aquí"}
								onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}/>
							</div>
							<div className="condicionesInputsImg">(*) 5 imágenes como máximo</div>
					</form>
				</div>
		)}

}
export default CargarHistorico;