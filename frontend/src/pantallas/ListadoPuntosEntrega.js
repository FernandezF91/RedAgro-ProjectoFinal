import React, { Component } from 'react';

import '../diseños/ListadoPuntosEntrega.css';
import '../diseños/estilosGlobales.css';

class ListadoPuntosEntrega extends Component {
	
	constructor (props) {
		super(props)
		
		this.state = {
			selectedRadioOption: "Nunca",
			id: this.props.id_productor,
			imagenes:[]
					}
					
		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
	}

	mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
	}
	 

componentDidMount(){


var _this=this;
	 
			//  var myImage = document.querySelector("#jeje");

				fetch("http://localhost:3000/redAgro/obtener_imagen?id=2")
				.then(response => response.blob())
				.then(function(myBlob) {

				var objectURL = URL.createObjectURL(myBlob);

				_this.setState({imagenes:[objectURL]})
				//  myImage.src = objectURL;

				});

	}

mostrarImagenes = () =>{

return this.state.imagenes.map(url=>{

return <img src={url}/>;

})

}

	render() {
		return (
			<div className="container">
				<div className="titulosPrincipales">Listado Puntos de entrega</div>
				<div className="imagenes">
				{this.mostrarImagenes()}
				</div>
			</div>
		);

	};

}

export default ListadoPuntosEntrega;
			
