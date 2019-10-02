import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import '../diseños/estilosGlobales.css';
import '../diseños/Mapa.css';

class SeleccionarPtoEntrega extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            google: this.props.google,
            markers: this.props.puntosEntrega,
        }
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

    componentDidMount() {
        this.setState({ markers: this.props.puntosEntrega });
    }

    displayMarkers = () => {
        return this.state.markers.map(marker => {
            return <Marker
                onClick={this.onMarkerClick}
                name={marker.productor.usuario.nombre + " " + marker.productor.usuario.apellido}
                id={marker.productor.id}
                direccion={marker.direccion}
                localidad={marker.localidad}
                link={"Seleccionar punto de entrega"}
                position={{ lat: marker.latitud, lng: marker.longitud }} />
        });
    }

    render() {
        return (
            <div className="containerGeneral">
                <div className="descripcionPagina">
                    <h5>Elija el punto de entrega:</h5>
                </div>
                <div className="contenedorMapa">
                    <CurrentLocation
                        centerAroundCurrentLocation
                        google={this.props.google}>

                        <Marker onClick={this.onMarkerClick} name={'Tu ubicación'} icon={{
                            path: this.state.google.maps.SymbolPath.CIRCLE,
                            fillColor: 'blue',
                            fillOpacity: .7,
                            scale: 10,
                            strokeColor: 'white',
                            strokeWeight: .5
                        }} />
                        {
                            this.displayMarkers()
                        }

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}>
                            <div>
                                <h5 className="name">
                                    {this.state.selectedPlace.name}
                                </h5>
                            </div>
                            <div className="direcc">
                                {this.state.selectedPlace.direccion}
                            </div>
                            <div className="localidad">
                                {this.state.selectedPlace.localidad}
                            </div>
                            <div className="productos">
                                <a href="/login">{this.state.selectedPlace.link}</a>
                            </div>
                        </InfoWindow>
                    </CurrentLocation>
                </div>
            </div>
        );
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(SeleccionarPtoEntrega);