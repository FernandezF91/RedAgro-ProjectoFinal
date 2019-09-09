import '../diseños/estilosGlobales.css';
import '../diseños/PreferenciasConsumidor.css';
import React, { Component } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

//Ejemplo del dropdown
//https://alligator.io/react/react-select/
//Por si les hace falta: npm install react-select@next

class PreferenciasConsumidor extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: [],
			id: this.props.id_consumidor,
			preferencias: [],
			seleccionados: {
				verduras: [],
				frutas: [],
				otros: [],
			},
			otros: [],
			verduras: [],
			frutas: []
		};

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

	addNewPreferencia(categoria, newPreferencia) {
		if (categoria === "verduras") {
			this.setState({ seleccionados: {...this.state.seleccionados, verduras: newPreferencia } });
		}
		if (categoria === "frutas") {
			this.setState({ seleccionados: { ...this.state.seleccionados, frutas: newPreferencia } });
		}
		if (categoria === "otros") {
			this.setState({ seleccionados: { ...this.state.seleccionados, otros: newPreferencia } });
		}
	}

	getPreferencesSaved(data, categoria) {
		var itemList = [];
		var dataFiltered = data.filter(function (item) {
			return item.producto.categoria === categoria
		}
		).map(function (item) {
			return {
				label: item.producto.tipo,
				value: item.producto.id
			}
		});

		if (dataFiltered.length > 0) {
			itemList = dataFiltered;
		}
		return itemList;
	}

	componentDidMount() {
		//Obtengo las preferencias del Consumidor
		var path = "http://localhost:3000/redAgro/preferencia_consumidor?id=" + this.state.id;
		fetch(path)
			.catch(err => console.error(err))
			.then(response => { return response.json(); })
			.then(data => {
				this.setState({
					seleccionados: {
						verduras: this.getPreferencesSaved(data, "Verduras"),
						frutas: this.getPreferencesSaved(data, "Frutas"),
						otros: this.getPreferencesSaved(data, "Otros")
					},
					preferencias: data.map((item) => {
						return {
							categoria: item.producto.categoria,
							tipo: item.producto.tipo,
							id: item.producto.id
						}
					})
				});
			})
		//Cargo los productos 'Frutas'
		fetch('http://localhost:3000/redAgro/obtener_tipo_productos?categoria=frutas')
			.catch(err => console.error(err))
			.then(response => { return response.json(); })
			.then(data => {
				this.setState({
					frutas: data.map((item) => {
						return {
							label: item.tipo,
							value: item.id
						}
					})
				});
			})
		//Cargo los productos 'verduras'
		fetch('http://localhost:3000/redAgro/obtener_tipo_productos?categoria=verduras')
			.catch(err => console.error(err))
			.then(response => { return response.json(); })
			.then(data => {
				this.setState({
					verduras: data.map((item) => {
						return {
							label: item.tipo,
							value: item.id
						}
					})
				});
			})
		//Cargo los productos 'Otros'
		fetch('http://localhost:3000/redAgro/obtener_tipo_productos?categoria=otros')
			.catch(err => console.error(err))
			.then(response => { return response.json(); })
			.then(data => {
				this.setState({
					otros: data.map((item) => {
						return {
							label: item.tipo,
							value: item.id
						}
					})
				});
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
					<Select className="dropdownProductos"
						value={this.state.seleccionados.verduras}
						options={this.state.verduras}
						placeholder="Seleccione uno o varios items..."
						isMulti
						//newPreferencia.label, newPreferencia.value)} />
						onChange={newVerdura => this.addNewPreferencia("verduras", newVerdura)} />
				</div>
				<br />

				<div className="opciones">
					<div className="tituloProductos">Frutas:</div>
					<Select className="dropdownProductos"
						//	defaultValue={this.state.frutasSelect}
						value={this.state.seleccionados.frutas}
						options={this.state.frutas}
						placeholder="Seleccione uno o varios items..."
						isMulti
						//onChange={opt => console.log(opt.label, opt.value)} />
						onChange={newFruta => this.addNewPreferencia("frutas", newFruta)} />
				</div>
				<br />

				<div className="opciones">
					<div className="tituloProductos">Otros:</div>
					<Select className="dropdownProductos"
						value={this.state.seleccionados.otros}
						options={this.state.otros}
						placeholder="Seleccione uno o varios items..."
						isMulti
						//	onChange={opt => console.log(opt.label, opt.value)} />
						onChange={newOtros => this.addNewPreferencia("otros", newOtros)} />
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