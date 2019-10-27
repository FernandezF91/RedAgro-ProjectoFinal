import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import '../diseños/PerfilProductor.css'
import Avatar from '@material-ui/core/Avatar';
import { Navbar, Nav, Row, InputGroup, FormControl, Container } from 'react-bootstrap';

class PerfilProductor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombrePerfil: this.props.match.params.nombrePerfil,
            datosProductor: {
                id: '',
                razon_social: '',
                nombre: '',
                telefono: '',
                productos: {},
                puntosEntrega: {},
                fechasEntrega: {},
            },
            loading: true,
        }
    }

    componentDidMount() {
        var path = "http://localhost:3000/redAgro/usuario/obtenerUsuarioByMail?usuario=" + this.state.nombrePerfil;
        fetch(path)
            .catch(error => console.error(error))
            .then(response => {
                try {
                    if (response.status === 200) {
                        this.setState({
                            resultadoRequest: response.status
                        });
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                        this.setState({
                            loading: false,
                            resultadoRequest: response.status
                        });
                    }
                } catch (error) {
                    console.log(error);
                    this.setState({
                        loading: false,
                        resultadoRequest: response.status
                    });
                }
            })
            .then(data => {
                if (data !== undefined) {
                    this.setState({
                        datosProductor: {
                            id: data.id,
                            razon_social: data.razon_social,
                            nombre: data.usuario.nombre + " " + data.usuario.apellido,
                            telefono: data.telefono,
                            puntosEntrega: data.puntosEntrega.map(item => {
                                return {
                                    pais: item.pais,
                                    provincia: item.provincia,
                                    localidad: item.localidad,
                                    cod_postal: item.cod_postal,
                                    direccion: item.direccion,
                                }
                            })
                        },
                    })

                    path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=" + data.id;
                    fetch(path)
                        .catch(error => console.error(error))
                        .then(response => {
                            try {
                                if (response.status === 200) {
                                    this.setState({
                                        resultadoRequest: response.status
                                    });
                                    return response.json();
                                }
                                else {
                                    console.log(response.status);
                                    this.setState({
                                        loading: false,
                                        resultadoRequest: response.status
                                    });
                                }
                            } catch (error) {
                                console.log(error);
                                this.setState({
                                    loading: false,
                                    resultadoRequest: response.status
                                });
                            }
                        })
                        .then(data => {
                            if (data !== undefined) {
                                this.setState({
                                    datosProductor: {
                                        ...this.state.datosProductor,
                                        productos: data.map((item) => {
                                            return {
                                                id: item.id,
                                                categoria: item.producto.categoria,
                                                tipo: item.producto.tipo,
                                                titulo: item.titulo,
                                                descripcion: item.descripcion,
                                                stock: item.stock,
                                                tipoDeUnidad: item.unidad_venta,
                                                tipoDeProduccion: item.tipo_produccion,
                                                precio: item.precio,
                                                fechaDeVencimiento: item.fecha_vencimiento,
                                                tiempoDePreparacion: item.tiempo_preparacion,
                                                contenido: item.contenido,
                                                imagenes: item.imagenes,
                                                oferta: item.oferta
                                            }
                                        })
                                    },
                                    loading: false
                                })
                            } else {
                                this.setState({ loading: false });
                            }
                        })
                    return
                } else {
                    console.log("No hay datos");
                    this.setState({ loading: false });
                }
            })
    }

    render() {

        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader" />;

        return (
            <div>
                <div className="nombreDelPerfil">{this.state.datosProductor.nombre} </div>
            </div>
        );
    }
}
export default PerfilProductor;