import '../diseños/estilosGlobales.css';
import '../diseños/PreferenciasConsumidor.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Loader from 'react-loader-spinner';


//Ejemplo del dropdown
//https://alligator.io/react/react-select/
//Por si les hace falta: npm install react-select@next

class PreferenciasConsumidor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active: [],
            id: this.props.id_consumidor,
            seleccionados: {
                verduras: [],
                frutas: [],
                otros: [],
            },
            preferencias: [],
            otros: [],
            verduras: [],
            frutas: [],
            loading: true
        };

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.guardarPreferencias = this.guardarPreferencias.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores',
            state: { id: this.state.id }
        })
    }

    agregarNuevaPreferencia(categoria, newPreferencia) {
        if (categoria === "verduras") {
            this.setState({ seleccionados: { ...this.state.seleccionados, verduras: newPreferencia } });
        }
        if (categoria === "frutas") {
            this.setState({ seleccionados: { ...this.state.seleccionados, frutas: newPreferencia } });
        }
        if (categoria === "otros") {
            this.setState({ seleccionados: { ...this.state.seleccionados, otros: newPreferencia } });
        }
    }

    getPreferenciasGuardadas(data, categoria) {
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

    generarListadoSeleccionado(preferencias, listado, categoria) {
        if (listado.length > 0) {
            listado.map(item => {
                preferencias.push({
                    id: item.value,
                    categoria: categoria,
                    tipo: item.label,
                });
            })
        }
        return preferencias;
    }

    guardarPreferencias() {
        this.setState({
            loading: true
        })
        var _this = this;
        var preferenciasAGuardar = [];
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.verduras, "Verduras");
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.frutas, "Frutas");
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.otros, "Otros");

        //Guardo las nuevas preferencias
        var path = "http://localhost:3000/redAgro/preferencias_consumidor?id=" + this.state.id;
        fetch(path, {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(preferenciasAGuardar)
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Se aplicaron los cambios");
                }
                else {
                    console.log("No se aplicaron los cambios");
                }
                _this.setState({
                    loading: false
                })
                return;
            })
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
                        verduras: this.getPreferenciasGuardadas(data, "Verduras"),
                        frutas: this.getPreferenciasGuardadas(data, "Frutas"),
                        otros: this.getPreferenciasGuardadas(data, "Otros")
                    },
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
                    }),
                    loading: false
                });
            })
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
            <div className="container">
                <div className="titulosPrincipales">Preferencias</div>
                <div className="descripcionPagina">
                    <h5>Seleccione sus productos de interés para recibir novedades sobre los mismos:</h5>
                </div>
                <br />
                <div className="opciones">
                    <div className="tituloProductos">Verduras</div>
                    <Select className="dropdownProductos"
                        value={this.state.seleccionados.verduras}
                        options={this.state.verduras}
                        placeholder="Seleccione uno o varios items..."
                        isMulti
                        onChange={newVerdura => this.agregarNuevaPreferencia("verduras", newVerdura)} />
                </div>
                <br />
                <div className="opciones">
                    <div className="tituloProductos">Frutas</div>
                    <Select className="dropdownProductos"
                        value={this.state.seleccionados.frutas}
                        options={this.state.frutas}
                        placeholder="Seleccione uno o varios items..."
                        isMulti
                        onChange={newFruta => this.agregarNuevaPreferencia("frutas", newFruta)} />
                </div>
                <br />
                <div className="opciones">
                    <div className="tituloProductos">Otros</div>
                    <Select className="dropdownProductos"
                        value={this.state.seleccionados.otros}
                        options={this.state.otros}
                        placeholder="Seleccione uno o varios items..."
                        isMulti
                        onChange={newOtros => this.agregarNuevaPreferencia("otros", newOtros)} />
                </div>
                <br />
                <div className="botonesPreferencias">
                    <Button variant="success" className="botonAtras" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                    <Button variant="success" type="submit" className="botonCrear" onClick={this.guardarPreferencias}>Guardar</Button>
                </div>
            </div>
        )
    };
}
export default PreferenciasConsumidor;