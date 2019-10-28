import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Button } from 'react-bootstrap';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import Loader from 'react-loader-spinner';

import '../diseños/estilosGlobales.css';
import '../diseños/Mapa.css';

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
            busqueda: "",
            loading: true
        }
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.updateParametroBusqueda = this.updateParametroBusqueda.bind(this);
    }

    updateParametroBusqueda() {
        if (this.state.selectedPlace.id > 0) {
            this.props.handleNuevaBusqueda(this.state.selectedPlace.id);
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
                        _this.setState({
                            markers: response,
                            loading: false
                        });
                    });
            });
    }

    displayMarkers = () => {

        return this.state.markers.map(marker => {
            return (
                <Marker onClick={this.onMarkerClick}
                    name={marker.productor.usuario.nombre + " " + marker.productor.usuario.apellido}
                    id={marker.productor.id}
                    direccion={marker.direccion}
                    localidad={marker.localidad}
                    link={"Mis productos"}
                    position={{
                        lat: marker.latitud,
                        lng: marker.longitud
                    }}
                />
            )
        });
    }

    onInfoWindowOpen(props, e) {
        const button = (
            <Button variant="success" size="sm" onClick={e => this.updateParametroBusqueda()}>
                {this.state.selectedPlace.link}
            </Button>
        );
        ReactDOM.render(
            React.Children.only(button),
            document.getElementById("geo")
        );
    }

    render() {
        if (this.state.loading) return (
            <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />
        )

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
                        google={this.props.google}>

                        <Marker
                            onClick={this.onMarkerClick}
                            name={'Tu ubicación'}
                            icon={{
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
                            onOpen={e => this.onInfoWindowOpen(this.props, e)}
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
                            <div id="geo" />
                        </InfoWindow>
                    </CurrentLocation>
                </div>
            </div>
        );
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(Geolocalizacion);