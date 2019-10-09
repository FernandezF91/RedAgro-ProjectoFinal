import '../diseños/estilosGlobales.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class MiCuenta extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_usuario: this.props.id_usuario,
            rolUsuario: this.props.rolUsuario,
            usuario: this.props.usuario,
            loading: true,
            cantidadReservasDisponibles: 0
        }

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.mostrarReservas = this.mostrarReservas.bind(this);
        this.generarMensajeReservas = this.generarMensajeReservas.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: { id: this.state.id_usuario }
        })
    }

    mostrarReservas() {
        this.props.history.push({
            pathname: '/principalConsumidores/ListadoReservas',
            state: {
                id_usuario: this.state.id_usuario,
                rolUsuario: this.state.rolUsuario
            }
        })
    }

    componentDidMount() {
        var _this = this;
        var path_usuario = "http://localhost:3000/redAgro/obtenerCantidadReservasDisponiblesConsumidor?id_consumidor=" + _this.state.id_usuario;

        fetch(path_usuario)
            .catch(err => console.error(err))
            .then(response => {
                if (response.status === 200) {
                    response.text().then(
                        function (response) {
                            if (response > 0) {
                                _this.setState({
                                    cantidadReservasDisponibles: response
                                });
                            }
                            else {
                                _this.setState({
                                    cantidadReservasDisponibles: 0
                                });
                            }
                        });
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
                _this.setState({
                    loading: false
                });
            })

    }

    generarMensajeReservas() {
        const mensaje = [
            (this.state.cantidadReservasDisponibles === 0) ? (
                < h4 className="textoMiCuenta" > No tenes reservas disponibles para retirar!</h4 >
            ) : (
                    (this.state.cantidadReservasDisponibles === "1") ? (
                        < h4 className="textoMiCuenta" > Tenes {this.state.cantidadReservasDisponibles} reserva disponible para retirar. Para más detalle, consulta tus < span onClick={this.mostrarReservas} className="linkBox cursorManito" > reservas</span >!</h4 >
                    ) : (
                            < h4 className="textoMiCuenta" > Tenes {this.state.cantidadReservasDisponibles} reservas disponibles para retirar. Para más detalle, consulta tus < span onClick={this.mostrarReservas} className="linkBox cursorManito" > reservas</span >!</h4 >
                        )
                )
        ]
        return mensaje;
    }

    render() {
        const nombres = this.state.usuario.nombre;
        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader"
            />;

        return (
            <div>
                <div className="titulosPrincipales tituloMiCuenta">Hola, <strong>{nombres}</strong></div>
                <div className="boxMiCuenta">
                    <i className="fas fa-shopping-bag iconoBox" />
                    {this.generarMensajeReservas()}
                </div>
            </div>
        );
    };
}
export default MiCuenta;