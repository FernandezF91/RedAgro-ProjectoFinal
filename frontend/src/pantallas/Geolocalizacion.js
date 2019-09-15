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
      markers: []

    }
    
    this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);;
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

  componentDidMount(){

    var _this=this;

  fetch("http://localhost:3000/redAgro/puntos_entrega_productor", {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    // _this.setState({
                    //     visible: true,
                    //     titulo: "Error",
                    //     mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                    // });
                    alert("todo mal");
                    return;
                }

                response.json().then(
                    function (response) {
           
                      _this.setState({markers:response});

                    });
            });



  }

  displayMarkers = () => {


			  return this.state.markers.map(marker => {
                         return <Marker onClick={this.onMarkerClick} 
                         name={marker.productor.usuario.nombre+" "+marker.productor.usuario.apellido}
                         id={marker.productor.id}
                         link={"Mis productos"}
                         position={{lat:marker.latitud,lng:marker.longitud}}/>                     
                    });
	

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
          strokeWeight: .5}}>
      </Marker>
      {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            {this.state.selectedPlace.name}
          </div>
          <div>
            <a href="/login">{this.state.selectedPlace.link}</a>
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