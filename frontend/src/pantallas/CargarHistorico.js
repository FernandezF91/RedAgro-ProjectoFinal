import React, { Component } from 'react';
import Files from 'react-files';


class CargarHistorico extends Component {

	constructor(props) {
    super(props);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.fileInput = React.createRef();
	}
	handleSubmit(event) {
		// highlight-range{4}
		event.preventDefault();
		alert(
		`Selected file - ${this.fileInput.current.files[0].name}`
		);
	}

	render(){
		return (
	<div>
		<div className="container">
			<form onSubmit={this.handleSubmit}>
			<label>
			Upload file:
			<input type="file" ref={this.fileInput} />
			</label>
			<br />
			<button type="submit">Submit</button>
			</form>
		</div>

		<div className="files">
        <Files
          className='files-dropzone'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/png', '.pdf', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
	</div>
		)}
	
}
export default CargarHistorico;