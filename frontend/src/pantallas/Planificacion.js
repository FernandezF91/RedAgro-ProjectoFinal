import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import Select from 'react-select';

import '../diseños/estilosGlobales.css';
import Modal from 'react-awesome-modal';



const periodo = [
    { label: "Verano", value: 1 },
    { label: "Otoño", value: 2 },
    { label: "Invierno", value: 3 },
    { label: "Primavera", value: 4 }
];



class Planificacion extends Component{
	constructor(props){
		super(props);

		this.state = {
			campos: {},
            id: this.props.id_productor
		}
	}

	render(){
		return (
			<div className="container">
			<div className="titulosPrincipales">Nuevo Producto</div>
				<Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="dropdownCategoria">
						<Form.Group as={Row}>
							<Form.Label column sm={4}>
								*Periodo
								</Form.Label>
							<Select value={this.state.valueCat} className="selectPeriodo" name="periodo" options={periodo} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectCategoria(opt, a, value)} />
						</Form.Group>
					</div>
				</Form>	
			</div>

		);
	};
}
export default Planificacion