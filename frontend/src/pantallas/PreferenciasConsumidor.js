import '../diseños/estilosGlobales.css';
import '../diseños/PreferenciasConsumidor.css';
import React, { Component } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

//Ejemplo del dropdown
//https://alligator.io/react/react-select/
//Por si les hace falta: npm install react-select@next

const frutas = [
	{ label: "Manzana", value: 1 },
	{ label: "Naranja", value: 2 },
	{ label: "Pomelo blanco", value: 3 },
	{ label: "Pomelo rosado", value: 4 },
	{ label: "Sandia", value: 5 },
	{ label: "Melon", value: 6 },
];

const verduras = [
	{ label: "Tomate perita", value: 1 },
	{ label: "Tomate cherry", value: 2 },
	{ label: "Pepino", value: 3 },
	{ label: "Lechuga", value: 4 },
	{ label: "Repollo", value: 5 },
	{ label: "Zapallo", value: 6 },
];

const otros = [
	{ label: "Aceitunas negras", value: 1 },
	{ label: "Aceituas verdes", value: 2 },
	{ label: "Miel", value: 3 },
	{ label: "Pickles", value: 4 },
];


class PreferenciasConsumidor extends Component {

	constructor(props) {
		super(props)
		
		this.state = {
			active: [],
			id: this.props.id_consumidor,
		}

		this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
	}

	mostrarPantallaPrincipal() {

		this.props.history.push({
			pathname: '/principalConsumidores',
			state: { id: this.state.id }
		})

	}
	
	onChange(value, key) {
		this.setState({
			[key]: value
		})
	}

	render() {

		return (
			<div className="container">
				<div className="titulosPrincipales">Preferencias</div>
				<div className="descripcionPagina">
					<h5>Seleccione sus productos de interés para recibir novedades sobre los mismos:</h5>
				</div>
				<br />
				<div className="opciones">
					<div className="tituloProductos">Verduras:</div>
					<Select className="dropdownProductos" options={verduras} placeholder="Seleccione uno o varios items..." isMulti onChange={opt => console.log(opt.label, opt.value)} />
				</div>
				<br />
				<div className="opciones">
					<div className="tituloProductos">Frutas:</div>
					<Select className="dropdownProductos" options={frutas} placeholder="Seleccione uno o varios items..." isMulti onChange={opt => console.log(opt.label, opt.value)} />
				</div>
				<br />
				<div className="opciones">
					<div className="tituloProductos">Otros:</div>
					<Select className="dropdownProductos" options={otros} placeholder="Seleccione uno o varios items..." isMulti onChange={opt => console.log(opt.label, opt.value)} />
				</div>
				<br />
				<div className="botonesPreferencias">
					<div className="botonCrear">
						<Button variant="success" type="submit" onClick={this.handleFormSubmit}>Guardar</Button>
					</div>
					<div className="botonAtras">
						<a href='/principalConsumidores'><Button variant="success">Cancelar</Button></a>
					</div>
				</div>
			</div>
		)
	};
}

export default PreferenciasConsumidor;