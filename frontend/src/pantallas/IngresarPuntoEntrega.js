import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Autocomplete, GoogleApiWrapper, GoogleMap, ScriptLoaded    } from 'google-maps-react';

import '../diseños/Nuevopuntoentrega.css';
import '../diseños/estilosGlobales.css';

class IngresarPuntoEntrega extends Component {
	
	constructor (props) {
    	super(props)

		this.state = {
	  					campos: [],
						id:this.props.id_productor,
						google:this.props.google
    				}
    
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
		this.autocomplete = null
    	this.onPlaceChanged = this.onPlaceChanged(this)
  }


  	onPlaceChanged (place) {	
    	alert(place.formatted_address);
  	}

	mostrarPantallaPrincipal() {

		this.props.history.push({
			pathname: '/principalProductores',
			state: { id: this.state.id }
		})

	}

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Nuevo punto de entrega</div>
				<div className="condicionesInputsCO">Todos los campos son obligatorios</div>
				<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
					<ScriptLoaded>
        				<GoogleMap
          					id="searchbox-example"
          					mapContainerStyle={{
            									height: "400px",
            									width: "800px"
          										}}
          					zoom={2.5}
          					center={{
            						lat: 38.685,
            						lng: -115.234
          							}}
        					>
          					<Autocomplete onPlacesSelected={this.onPlaceChanged}>
								<div className="domicilio" >
									<input type="text" placeholder="Ingrese direccion" name="search" />
								</div>  	
          					</Autocomplete>
        				</GoogleMap>
      				</ScriptLoaded>
				</Form>

				<div className="botonesnuevopuntoentrega">
					<div className="botonGuardar">
						<Button variant="success" type="submit">Guardar</Button>
					</div>
					<div className="botonCancelar">
						<Button variant="success" onClick={this.limpiarCampos}>Cancelar</Button>
					</div>		
				</div>
			</div>
			
		);
	};
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(IngresarPuntoEntrega);