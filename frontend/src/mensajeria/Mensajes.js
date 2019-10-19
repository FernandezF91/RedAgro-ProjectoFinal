import React from 'react';
import chat from "./Chat";
import config from "./Config";
import Loader from 'react-loader-spinner';
import '../diseños/Mensajes.css'

const header = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'appid': '9835b2e58f31f7',
    'apikey': 'd1a0006501d645fd2419b8dbdec84d5ae5d2fe5b'
}

class Mensajes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverID: "",
            mensajesAEnviar: null,
            groupMessage: [],
            isAuthenticated: false,
            historialMensajes: [],
            loading: true,
        }
        this.GUID = config.GUID;
    }

    sendMessage = () => {

    };

    scrollToBottom = () => {
        const chat = document.getElementById("chatList");
        chat.scrollTop = chat.scrollHeight;
    };

    handleSubmit = event => {
        event.preventDefault();
        this.sendMessage();
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
            this.setState(
                prevState => ({
                    groupMessage: [...prevState.groupMessage, data]
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
                    'appid': '9835b2e58f31f7',
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
                                'appid': '9835b2e58f31f7',
                                'apikey': 'd1a0006501d645fd2419b8dbdec84d5ae5d2fe5b'
                            },
                            body: {
                                'uid': usuario,
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
                    'appid': '9835b2e58f31f7',
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
                                id: item.id,
                                enviadoPor: item.sender,
                                recibidoPor: item.receiver,
                                mensaje: item.data.text
                            }
                        }),
                        loading: false,
                    })
                }
            })
    }

    componentDidMount() {
        var idUsuarioReceptor = "productor1"
        this.chequearUsuarios(this.props.usuarioEmisor.id, this.props.usuarioEmisor.nombre);
        //this.chequearUsuarios(idUsuarioReceptor, nombreUsuarioReceptor);
        this.cargarHistorialDeMensajes(this.props.usuarioEmisor.id, this.props.usuarioReceptor.id);
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
                <div className="chatWindow">
                    <ul className="chat" id="chatList">
                        {this.state.historialMensajes.map(data => (
                            <div key={data.id}>
                                {this.props.usuarioEmisor.id === data.enviadoPor ? (
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
