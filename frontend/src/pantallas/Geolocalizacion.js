import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import ResultadoBusqueda from './ResultadoBusqueda';
import { BrowserRouter } from "react-router-dom";
import PantallaPrincipalConsumidores from "../pantallas/PantallaPrincipalConsumidores"

import '../diseños/estilosGlobales.css';
import '../diseños/Mapa.css';

const ResultadoBusquedaRouter = withRouter(ResultadoBusqueda);

class Geolocalizacion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id_consumidor,
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            google: this.props.google,
            markers: [],
            visible: "",
            titulo: "",
            mensaje: "",
            busqueda: ""

        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.updateParametroBusqueda = this.updateParametroBusqueda.bind(this);

    }

    updateParametroBusqueda(idProductor) {
        if (idProductor > 0) {
            this.props.handleNuevaBusqueda(idProductor);
        }
    }

    closeModal() {
        this.setState({
            visible: false
        });
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

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
    }

    componentDidMount() {

        var _this = this;

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
                    //     mensaje: "Ocurrió algún error inesperado. Intentá nuevamente"
                    // });
                    return;
                }

                response.json().then(
                    function (response) {

                        _this.setState({ markers: response });

                    });
            });
    }

    displayMarkers = () => {

        return this.state.markers.map(marker => {
            return <Marker onClick={this.onMarkerClick}
                name={marker.productor.usuario.nombre + " " + marker.productor.usuario.apellido}
                id={marker.productor.id}
                direccion={marker.direccion}
                localidad={marker.localidad}
                link={"Mis productos"}
                position={{ lat: marker.latitud, lng: marker.longitud }} />
        });

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
                        <Marker onClick={this.onMarkerClick} name={'Tu ubicación'} icon={{
                            path: this.state.google.maps.SymbolPath.CIRCLE,
                            fillColor: 'blue',
                            fillOpacity: .7,
                            scale: 10,
                            strokeColor: 'white',
                            strokeWeight: .5
                        }}>
                        </Marker>
                        {this.displayMarkers()}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
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
                                <a href="#" onClick={this.updateParametroBusqueda(this.state.selectedPlace.id)}>{this.state.selectedPlace.link}</a>
                            </div>
                        </InfoWindow>
                    </CurrentLocation>
                </div>
                <div className="botonVolver">
                    <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                </div>
            </div>
        );

    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(Geolocalizacion);