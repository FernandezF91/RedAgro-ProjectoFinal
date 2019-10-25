import React from 'react';
import chat from "./Chat";
import config from "./Config";
import Loader from 'react-loader-spinner';
import '../diseños/Mensajes.css'
import { thisExpression } from '@babel/types';

class Mensajes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensajesAEnviar: null,
            historialMensajes: [],
            loading: false,
        }
    }

    sendMessage = () => {
        chat.sendPrivateMessage(this.props.usuarioEmisor.id_msj, this.state.mensajesAEnviar, this.props.usuarioReceptor.id_msj).then(
            message => {
                console.log("Message sent successfully:", message);
                var agregarMensaje = {
                    id_msj: this.state.historialMensajes.length,
                    enviadoPor: this.props.usuarioEmisor.id_msj,
                    recibid_msjoPor: this.state.mensajesAEnviar,
                    mensaje: this.state.mensajesAEnviar,
                }
                let historialDeMensajes = this.state.historialMensajes
                historialDeMensajes.push(agregarMensaje);
                this.setState({
                    // historialMensajes: historialDeMensajes,
                    mensajesAEnviar: null
                });
            },
            error => {
                console.log("No se pudo enviar el mensaje" + error);
            })
    };

    sendNotification = () => {
        var path = "http://localhost:3000/redAgro/Alertas/NuevoMensaje?id_Emisor=" + this.setState.usuarioEmisor.id + "&id_Receptor=" + this.setState.usuarioReceptor.id;
        fetch(path, {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8' }
        })
    }

    scrollToBottom = () => {
        const chat = document.getElementById("chatList");
        chat.scrollTop = chat.scrollHeight;
    };

    handleSubmit = event => {
        event.preventDefault();
        this.sendMessage();
        this.sendNotification();
        event.target.reset();
    };

    handleChange = event => {
        this.setState({ mensajesAEnviar: event.target.value });
    };

    getUser = () => {
        chat
            .getLoggedinUser()
            .then(user => {
                console.log("user details:", { user });
                this.setState({ user });
            })
            .catch(({ error }) => {
                if (error.code === "USER_NOT_LOGED_IN") {
                    this.setState({
                        isAuthenticated: false
                    });
                }
            });
    };

    messageListener = () => {
        chat.addMessageListener((data, error) => {
            if (error) return console.log(`error: ${error}`);

            var detalleHistorial = {
                id_msj: data.id_msj,
                enviadoPor: data.sender.uid_msj,
                recibid_msjoPor: data.receiver,
                mensaje: data.text
            }

            this.setState(
                prevState => ({
                    historialMensajes: [...prevState.historialMensajes, detalleHistorial]
                }),
                () => {
                    this.scrollToBottom();
                }
            );
        });
    };

    chequearUsuarios(usuario, nombre) {
        //Chequeo que el usuario este creado
        var path = "https://api.cometchat.com/v1.8/users/" + usuario;
        fetch(path,
            {
                method: 'GET',
                headers: {
                    'appid_msj': '9835b2e58f31f7',
                    'apikey': 'd1a0006501d645fd2419b8dbdec84d5ae5d2fe5b'
                },
            })
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status !== 200) { //==> Creo el usuario
                        path = "https://api.cometchat.com/v1.8/users";
                        fetch(path, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'appid_msj': '9835b2e58f31f7',
                                'apikey': 'd1a0006501d645fd2419b8dbdec84d5ae5d2fe5b'
                            },
                            body: {
                                'uid_msj': usuario,
                                'name': nombre,
                                'status': "offline",
                                'createdAt': "1544090097",
                            }
                        })
                            .catch(error => console.error(error))
                            .then(response2 => {
                                try {
                                    if (response2.status !== 200) {
                                        console.log("Error al crear usuario de mensajeria")
                                        return false;
                                    }
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            })
                    }
                    else {
                        return true;
                    }
                }
                catch (error) {
                    console.log(error);
                }
            })
    }

    cargarHistorialDeMensajes(usuarioEmisor, usuarioReceptor) {
        var path = "https://api.cometchat.com/v1.8/users/" + usuarioEmisor + "/users/" + usuarioReceptor + "/messages";
        fetch(path,
            {
                method: 'GET',
                headers: {
                    'appid_msj': '9835b2e58f31f7',
                    'apikey': 'd1a0006501d645fd2419b8dbdec84d5ae5d2fe5b'
                },
            })
            .catch(error => console.error(error))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("Verificar error");
                }
            })
            .then(data => {
                if (data !== undefined) {
                    this.setState({
                        historialMensajes: data.data.map(item => {
                            return {
                                id_msj: item.id_msj,
                                enviadoPor: item.sender,
                                recibid_msjoPor: item.receiver,
                                mensaje: item.data.text
                            }
                        }),
                        loading: false,
                    })
                }
            })
    }

    componentDid_msjMount() {
        this.chequearUsuarios(this.props.usuarioEmisor.id_msj, this.props.usuarioEmisor.nombre);
        //this.chequearUsuarios(id_msjUsuarioReceptor, nombreUsuarioReceptor);
        chat.init();
        chat.login(this.props.usuarioEmisor.id_msj);
        this.cargarHistorialDeMensajes(this.props.usuarioEmisor.id_msj, this.props.usuarioReceptor.id_msj);
        this.messageListener();
    }

    render() {
        if (this.state.loading) return (
            <Loader
                type="Grid_msj"
                color="#28A745"
                height={150}
                wid_msjth={150}
                className="loader"
            />
        )

        return (
            <div className="chatWindow">
                <ul className="chat" id_msj="chatList">
                    {this.state.historialMensajes.map(data => (
                        <div key={data.id_msj}>
                            {this.props.usuarioEmisor.id_msj === data.enviadoPor ? (
                                <li className="self">
                                    <div className="mensajeEnviado">
                                        <p>{this.props.usuarioEmisor.nombre}</p>
                                        <div className="message"> {data.mensaje}</div>
                                    </div>
                                </li>
                            ) : (
                                    <li className="other">
                                        <div className="msg">
                                            <p>{this.props.usuarioReceptor.nombre}</p>
                                            <div className="message"> {data.mensaje} </div>
                                        </div>
                                    </li>
                                )}
                        </div>
                    ))}
                </ul>

                <div className="chatInputWrapper">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="textarea input"
                            type="text"
                            placeholder="Escribí tu mensaje acá..."
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
export default Mensajes;
