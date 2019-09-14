import React, { Component } from 'react'
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import CurrentLocation from './Map';


import '../diseños/estilosGlobales.css';
import '../diseños/Mapa.css';


class Geolocalizacion extends Component {

	constructor(props) {
		super(props);

this.state = {
	  campos: [],
    id:this.props.id_consumidor,
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    google:this.props.google,
      stores: [{latitude: -1.2884,
         longitude: 36.8233}]

    }
    
    this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
  }


onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return <Marker onClick={this.onMarkerClick} name={'jeje'} position={{lat:-34.4975073,lng:-58.52011629999999}}/>
  }

  mostrarPantallaPrincipal() {

		this.props.history.push({

			pathname: '/principalConsumidores',
			state: { id: this.state.id }
		})

  }

  
  render() {
    return (
		<div className="containerGeneral">
		<div className="titulosPrincipales">
		Búsqueda por geolocalización
		</div>
    <div className="descripcionPagina">
					<h5>Seleccione un productor para ver su oferta de productos:</h5>
				</div>
		<div className="contenedorMapa">
				<CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
      <Marker onClick={this.onMarkerClick} name={'Tu ubicación'} icon={{path: this.state.google.maps.SymbolPath.CIRCLE,
      fillColor: 'blue',
          fillOpacity: .7,
          scale: 10,
          strokeColor: 'white',
          strokeWeight: .20}}>
      </Marker>
    
      {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
		</div>
    <div className="botonVolver">
									<Button variant="success" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
			</div>
		</div>
    );
  };


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(Geolocalizacion);