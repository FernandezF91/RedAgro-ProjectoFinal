import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import Select from 'react-select';

import '../diseños/estilosGlobales.css';
import '../diseños/Planificacion.css';
import Modal from 'react-awesome-modal';



const periodo = [
    { label: "Verano", value: "p1" },
    { label: "Otoño", value: "p2" },
    { label: "Invierno", value: "p3" },
    { label: "Primavera", value: "p4" }
];



class Planificacion extends Component{
	constructor(props){
		super(props);

		this.state = {
			campos: {},
			
			id: this.props.id_productor
		}

		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);

	}
	
	cambiosSelectPeriodo(opt, a, value) {
        let campos = this.state.campos;
        campos[a.periodo] = opt.value;
        this.setState({ campos })
    }

	mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

	handleSubmit(e) {
        var _this = this;
        e.preventDefault();

            var path_principal = "http://localhost:3000/redAgro/usuario_productor/nuevo_producto?id_productor=";
            var id_productor = _this.props.id_productor;
            var id_producto = _this.state.campos["tipo_producto"];
            var path_final = path_principal + id_productor + "&id_producto=" + id_producto;

            alert(path_final);

            fetch(path_final, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({

                    "titulo": this.state.campos["titulo"],
                    "descripcion": this.state.campos["descripcion"],
                    "fecha_vencimiento": this.state.campos["fecha_ven"],
                    "precio": this.state.campos["precio"],
                    "stock": this.state.campos["stock"],
                    "unidad_venta": this.state.campos["unidad_venta"],
                    "tiempo_preparacion": this.state.campos["tiempo_preparacion"],
                    "tipo_produccion": this.state.campos["tipo_produccion"],
                    "contenido": this.state.campos["contenido"]
                }),
            })
                .then(function (response) {
                    if (response.status !== 200) {

                        _this.setState({
                            visible: true,
                            titulo: "Error",
                            mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
                        });
                        return;
                    }
                    response.json().then(
                        function (response) {
                            _this.subirArchivos(response);
                        });

                    _this.mostrarMensajeOk();
                });
    }


	render(){
		return (
			<div className="container">
			<div className="titulosPrincipales">Planificar Producción</div>
				<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="dropdownPeriodo">
						<Form.Group as={Row}>
							<Form.Label column sm={3}>
								Periodo
							</Form.Label>
							<Select value={this.state.valueCat} className="selectPeriodo" name="periodo" options={periodo} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectPeriodo(opt, a, value)} />
						</Form.Group>
					</div>
					<div className="botonesNuevoProducto">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="success" type="submit">Planificar</Button>
                    </div>
				</Form>	
			</div>

		);
	};
}
export default Planificacion