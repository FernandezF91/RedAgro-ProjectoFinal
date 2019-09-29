import React, { Component } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import { Autocomplete, GoogleApiWrapper, GoogleMap, ScriptLoaded } from 'google-maps-react';
import { DatePickerInput } from 'rc-datepicker';
import Modal from 'react-awesome-modal';

import '../diseños/NuevoPuntoEntrega.css';
import { isDate } from 'moment';

const minDate = new Date();

class IngresarPuntoEntrega extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campos: [],
            id: this.props.id_productor,
            google: this.props.google,
            disabled2:"",
            titulo:"",
            mensaje:"",
            visible:""
        }

        
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_entrega"] = e;
        this.setState({ campos })
    }


    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    componentDidMount() {
        this.autocomplete = new this.state.google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["geocode"] });

        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {

        let campos = this.state.campos;
        const place = this.autocomplete.getPlace();
        let address = place.address_components;
        campos["direccion"]= place.name;
        campos["localidad"]=address[2].short_name;
        campos["provincia"]=address[4].long_name;
        campos["cod_postal"]=address[6].short_name;
     
        this.setState({campos:campos,disabled2:true})
        


    }


    closeModal() {
   
        this.setState({
            visible: false
        });
    }

    validarFormulario(){

    if(!this.state.campos["provincia"] || !this.state.campos["localidad"] || !this.state.campos["direccion"]
    || !this.state.campos["cod_postal"] || !isDate(this.state.campos["fecha_entrega"])
    || !this.state.campos["fecha_entrega"] || !this.state.campos["hora_fin"] || !this.state.campos["hora_inicio"]){


        this.setState({visible:true, mensaje:"Campos incompletos o incorrectos",titulo:"Error"})

    }


    }

    render() {
        return (
            <div className="container">
                <div className="titulosPrincipales">Nuevo punto de entrega</div>
                <div className="formularioPuntoEntrega">
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                        Ubicación
                        </Form.Label>         
                        <input
                            ref={this.autocompleteInput}
                            id="autocomplete"
                            placeholder="Ingresá la dirección de tu punto de entrega"
                            name="direccion_entrega"
                        />
                        </Form.Group>             
                    </div>
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>         
                        País
                        </Form.Label>     
                        <input
                            name="pais"
                            disabled="true"
                            value="Argentina"
                           
                        />
                        </Form.Group>               
                    </div>
                    <div className= "inputs">
                     <Form.Group as={Row}>
                            <Form.Label column sm={4}> 
                        Provincia
                        </Form.Label>       
                        <input
                            name="provincia"
                            value={this.state.campos["provincia"]}
                            disabled={this.state.disabled2}
                        />
                        </Form.Group>               
                    </div>
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                        Localidad
                        </Form.Label>         
                        <input
                            name="localidad"
                            value={this.state.campos["localidad"]}
                            disabled={this.state.disabled2}
                        />
                        </Form.Group>               
                    </div>
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                        Direcc.
                        </Form.Label>      
                        <input
                            name="direccion"
                            value={this.state.campos["direccion"]}
                            disabled={this.state.disabled2}
                        />
                        </Form.Group>               
                    </div>
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                        Código postal
                        </Form.Label>      
                        <input
                            name="cod_postal"
                            value={this.state.campos["cod_postal"]}
                            disabled={this.state.disabled2}
                        />
                        </Form.Group>               
                    </div>
                    <div className="inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}> 
                                        Fecha de entrega
                                        </Form.Label>                       
                                        <DatePickerInput
                                            className="fecha_entrega"
                                            name="fecha_entrega"
                                            displayFormat='DD/MM/YYYY'
                                            minDate={minDate}                                          
                                            onChange={(e) => this.cambiosFecha(e)}
                                            value={this.state.campos["fecha_entrega"]}
                                        />
                                    </Form.Group>                          
                    </div>
                    <div className= "inputs">
                    <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                        Horario de entrega
                        </Form.Label>
                        <input
                            className="hora_inicio"
                            name="hora_inicio"
                            type="number"
                            min="6"
                            max="12"
                            placeHolder="Horario-inicio"
                        />
                        :
                        <input
                            className="hora_fin"
                            name="hora_fin"
                            type="number"
                            min="12"
                            max="21"
                            placeHolder="Horario-fin"
                        />
                        </Form.Group>
                    </div>
                    <div className="botones">
                        <Button variant="success" className="botonGuardar" onClick={() => this.validarFormulario()}>Guardar</Button>
                        <a onClick={this.mostrarPantallaPrincipal} className="botonCancelar">
                            <Button variant="success">Cancelar</Button>
                        </a>
                    </div>
                </div>
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="120"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>{this.state.mensaje}</p>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAKxBrG2z8psH-fGJfFDXI-Arn-LkniaqI'
})(IngresarPuntoEntrega);