import React, { Component } from 'react';

import '../diseños/ListadoPuntosEntrega.css';
import '../diseños/estilosGlobales.css';

class ListadoPuntosEntrega extends Component {
	
	constructor (props) {
		super(props)
		
		this.state = {
			selectedRadioOption: "Nunca",
			id: this.props.id_productor
					}
					
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
	}

	mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Listado Puntos de entrega</div>
			</div>
		);

	};

}

export default ListadoPuntosEntrega;
			
