import '../diseños/estilosGlobales.css';
import '../diseños/PreferenciasConsumidor.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { MDBModal } from 'mdbreact';

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
            loading: true,
            showModal: false,
            resultadoRequest: 0
        };

        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.guardarPreferencias = this.guardarPreferencias.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalConsumidores/MiCuenta',
            state: { id: this.state.id }
        })
    }

    agregarNuevaPreferencia(categoria, newPreferencia) {
        if (categoria === "verduras") {
            this.setState({
                seleccionados: { ...this.state.seleccionados, verduras: newPreferencia }
            });
        }
        if (categoria === "frutas") {
            this.setState({
                seleccionados: { ...this.state.seleccionados, frutas: newPreferencia }
            });
        }
        if (categoria === "otros") {
            this.setState({
                seleccionados: { ...this.state.seleccionados, otros: newPreferencia }
            });
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
            listado.forEach(item => {
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

        var preferenciasAGuardar = [];
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.verduras, "Verduras");
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.frutas, "Frutas");
        preferenciasAGuardar = this.generarListadoSeleccionado(preferenciasAGuardar, this.state.seleccionados.otros, "Otros");

        var _this = this;
        //Guardo las nuevas preferencias
        var path = "http://localhost:3000/redAgro/guardarPreferencias?id=" + this.state.id;
        fetch(path, {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(preferenciasAGuardar)
        })
            .then(function (response) {
                _this.setState({
                    loading: false,
                    showModal: true,
                    resultadoRequest: response.status
                })
                return;
            })
    }

    componentDidMount() {
        //Obtengo las preferencias del Consumidor
        var path = "http://localhost:3000/redAgro/obtenerPreferencias?id=" + this.state.id;
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

    cerrarModal() {
        this.setState({
            showModal: false
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
            <div className="container" >
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
                <div className="botones">
                    <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                    <Button variant="success" type="submit" onClick={this.guardarPreferencias}>Guardar</Button>
                </div>
                {
                    (this.state.showModal) &&
                    (
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                {(this.state.resultadoRequest === 200) ?
                                    (
                                        <div>
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>Preferencias guardadas correctamente!</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-exclamation-circle iconoModalError" />
                                            <br />
                                            <br />
                                            <h5>Ocurrió un error al guardar las preferencias. Reintentá en unos minutos.</h5>
                                        </div>
                                    )
                                }
                            </div>
                        </MDBModal>
                    )
                }
            </div>
        )
    };
}
export default PreferenciasConsumidor;