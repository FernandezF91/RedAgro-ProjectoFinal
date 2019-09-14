import React, { Component } from 'react'
import { Navbar, Container, Form, Col, Row, Button } from 'react-bootstrap';
import culturaVerde from '../imagenes/cultura-verde-2.png';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';


import '../diseños/estilosGlobales.css';
import '../diseños/Mapa.css';

const mapStyles = {
  width: '50%',
      height: '50%'
};

class Geolocalizacion extends Component {

	constructor(props) {
		super(props);

this.state = {
	  campos: [],
	  id:this.props.id_consumidor,
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
			  {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => alert("You clicked me!")} />
    })
  }

  render() {
    return (
		<div className="containerGeneral">
		<div className="titulosPrincipales">
		Búsqueda por geolocalización
		</div>
		<div className="contenedorMapa">
				<Map
					google={this.props.google}
					zoom={8}
					style={mapStyles}
					initialCenter={{ lat: 47.444, lng: -122.176 }}
				>
					{this.displayMarkers()}
				</Map>
		</div>
		</div>
    );
  };


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(Geolocalizacion);