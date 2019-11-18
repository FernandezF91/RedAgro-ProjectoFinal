import React, { Component } from "react";
import culturaVerde from '../imagenes/cultura-verde.png';
import '../diseños/ConfirmacionCuenta.css';

class ConfirmacionCuenta extends Component {

    constructor(props) {

        super(props);

        this.state = {

            id: this.props.match.params.id,
            titulo: "Confirmando cuenta, espere por favor..",
            mensaje: ""

        }
    }

    componentDidMount() {
        if (isNaN(parseInt(this.state.id))) {
            this.props.history.push({
                pathname: '/*',

            })
        }

        const path_principal = "http://"+window.$ip+":3000/redAgro/confirmar_cuenta?id=";
        var id = this.state.id;
        const final_path = path_principal + +id;

        var _this = this;

        fetch(final_path, {
            method: "PUT"
        })
            .then(function (response) {

                if (response.status !== 200) {

                    _this.setState({
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intentá confirmar la cuenta nuevamente"
                    });
                    return;
                }

                response.text().then(
                    function (response) {
                        _this.setState({
                            titulo: "Cuenta confirmada!",
                            mensaje: "Vas a ser redireccionado automáticamente hacia el acceso de usuarios"
                        });

                        window.setTimeout(() => {

                            _this.props.history.push('/login')
                        }, 3000);
                    });
            });
    }

    render() {
        return (
            <div className="fondoConfirmacion">
                <div className="imagen">
                    <img src={culturaVerde} width="400px" height="200px" alt="Cultura Verde" />
                </div>
                <div className="textos">
                    <h1>{this.state.titulo}</h1>
                    <p>{this.state.mensaje}</p>
                </div>
            </div>
        );

    };

}

export default ConfirmacionCuenta;