
import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import '../diseños/ModificarContraseña.css';

class ModificarContraseña extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fields: [],
            errores: [],
            usuario: {},
            visible: false,
            mensaje: "",
            titulo:"",
            user: this.props.usuario //para ir pasando el ID del usuario de pantalla a pantalla
        }

        this.validarDatos = this.validarDatos.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    detectarCambios(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        })
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }


   validarDatos(){


   if((!this.state.fields["contraseñaNueva"] || !this.state.fields["contraseñaActual"] || !this.state.fields["confirmarContraseña"]) ||
      ((this.state.fields["contraseñaNueva"])!==(this.state.fields["confirmarContraseña"])) ||
       ((this.state.fields["contraseñaActual"])!==(this.state.user.contraseña))){

        // alert(this.state.user.contraseña);
        // alert(this.state.fields["contraseñaActual"]);
        // alert(this.state.fields["contraseñaNueva"]);
        // alert(this.state.fields["confirmarContraseña"]);

        this.setState({titulo:"Error",
                       mensaje:"Datos incompletos o incorrectos",
                       visible:true});

                       return false;

       }

       return true;

   }

    modificarContraseña() {
    
            const path_principal = "http://localhost:3000/redAgro/modificar_contraseña?c=";

            var password = this.state.fields["contraseñaNueva"];

            const final_path = path_principal + password;

            var _this = this;


            if(_this.validarDatos()){

            fetch(final_path, {
                method: "PUT",
                headers: {

                    'Content-type': 'application/json;charset=UTF-8',

                },
            })
                .then(function (response) {

                    if (response.status !== 200) {

                        // alert("Ocurrió algún problema. Intenta nuevamente")

                        let mensajeError = "Ocurrió algun problema, intenta nuevamente"
                        
                        _this.setState({
                            visible: true,
                            titulo:"Error",
                            mensaje: mensajeError
                        });

                        return;

                    }

                    response.json().then(

                        function (response) {

                                let mensaje = "Cuenta inexistente o datos incorrectos";
                                _this.setState({
                                    visible: true,
                                    titulo:"Modificación exitosa",
                                    mensaje:""
                                });
                            

                        });
                });
            }
        }

  
    

    mostrarPantallaPrincipal() {

        this.state.user.rol === "Productor" ?

            this.props.history.push({
                pathname: '/principalProductores',
                state: { id: this.state.user.id }
            })
            :

            this.props.history.push("/principalConsumidores", { id: this.state.user.id });

    }

    render() {

        return (
            <div>
                <div className="titulosPrincipales">Modificar contraseña</div>
                <div className="contenidoMF">
                    <div className="contraseñaActual" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Contraseña actual
									</Form.Label>
                            <Form.Control
                                required
                                type="mf"
                                name="contraseñaActual"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="contraseñaNueva" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Contraseña nueva
									</Form.Label>
                            <Form.Control
                                required
                                type="mf"
                                name="contraseñaNueva"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="confirmarContraseña" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Confirmar contraseña
									</Form.Label>
                            <Form.Control
                                required
                                type="mf"
                                name="confirmarContraseña"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="botonesNuevoProducto">
                        <div className="botonAtras">
                            <a onClick={this.mostrarPantallaPrincipal}>
                                <Button variant="success">Cancelar</Button>
                            </a>
                        </div>
                        <div className="botonCrear">
                            <Button variant="success" type="submit" onClick={(e) => this.modificarContraseña(e)}>Crear</Button>
                        </div>
                    </div>
                </div>
                <section>
                        <Modal
                            visible={this.state.visible}
                            width="460"
                            height="120"
                            effect="fadeInUp"
                            onClickAway={() => this.closeModal()}
                        >
                            <div>
                                <h1>{this.state.titulo}</h1>
                                <p>{this.state.mensaje}</p>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Cerrar</a>
                            </div>
                        </Modal>
                    </section>
            </div>
        );
    };
}

export default ModificarContraseña;