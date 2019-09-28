import React, { Component } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { Autocomplete, GoogleApiWrapper, GoogleMap, ScriptLoaded    } from 'google-maps-react';

import '../diseños/Nuevopuntoentrega.css';

class IngresarPuntoEntrega extends Component {
	
	constructor (props) {
    	super(props)

		this.state = {
	  					campos: [],
						id:this.props.id_productor,
						google:this.props.google,
						direccion:""
    				}
	
				this.autocompleteInput = React.createRef();
    			this.autocomplete = null;
    			this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
				this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

  }

	mostrarPantallaPrincipal() {

		this.props.history.push({
			pathname: '/principalProductores',
			state: { id: this.state.id }
		})

	}

	componentDidMount() {
    this.autocomplete = new this.state.google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
		this.setState({direccion:place});
	
  }


	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Nuevo punto de entrega</div>			
				<div className="autoComplete">
				<Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Dirección
									</Form.Label>
                            <input ref={this.autocompleteInput} id="autocomplete" placeholder="Ingresá la dirección de tu punto de entrega"
        ></input>
        </Form.Group>
				<div className="botones">
					<div className="botonGuardar">
						<Button variant="success" type="submit">Guardar</Button>
					</div>
					<div className="botonCancelar">
						<a onClick={this.mostrarPantallaPrincipal}>
                                <Button variant="success">Cancelar</Button>
                            </a>
					</div>
					</div>
				</div>
							
			</div>
			
		);
	};
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(IngresarPuntoEntrega);