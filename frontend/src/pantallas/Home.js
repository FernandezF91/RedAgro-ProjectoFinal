import '../diseños/Home.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react';
import { Navbar, Nav, InputGroup, FormControl, Container } from 'react-bootstrap';
import { MDBModal, MDBCol, MDBRow } from 'mdbreact';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import CarouselProductos from './CarouselProductos'
import ResultadoBusquedaSinLogin from './ResultadoBusquedaSinLogin';

import culturaVerde from '../imagenes/cultura-verde-2.png';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            busqueda: "",
            loading: true,
            productos: [],
            paginaActual: 1,
            productosPerPage: 3,
            tamañoListado: 3,
            showModal: false,
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.mostrarDetalleProducto = this.mostrarDetalleProducto.bind(this);
    }

    mostrarDetalleProducto = (productoSeleccionado) => {
        this.setState({
            showModal: true
        });
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        var path = "http://" + window.$ip + ":3000/redAgro/ProductosProductor/obtenerProductosPantallaInicial";
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
                        resultadoRequest: 504
                    });
                }
            })
            .then(data => {
                if (data !== undefined) {
                    this.setState({
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
                        }),
                        loading: false,
                    })
                } else {
                    this.setState({ loading: false });
                }
            })
    }

    handleInputChange = e => {
        this.setState({ busqueda: this.busqueda.value });
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            if (this.busqueda.value.length > 0) {
                this.setState({ busqueda: this.busqueda.value });
            }
        }
    }

    crearListaDeProductos(numberOfPages, productosPerPage, productos) {
        let nuevaLista = [];
        var indexOfLastProducto, indexOfFirstProducto;
        for (let i = 1; i <= numberOfPages; i++) {
            indexOfLastProducto = i * productosPerPage;
            indexOfFirstProducto = indexOfLastProducto - productosPerPage;
            let lista = productos.slice(indexOfFirstProducto, indexOfLastProducto)
            nuevaLista.push(lista);
        }
        return nuevaLista;
    }

    render() {
        const { productosPerPage, productos } = this.state;
        const numberOfPages = Math.ceil(productos.length / productosPerPage);
        let lista = this.crearListaDeProductos(numberOfPages, productosPerPage, productos);

        if (this.state.loading) return (
            <div className="fondo">
                <div className="divLoaderWhitesmoke">
                    <Loader
                        type="Grid"
                        color="#28A745"
                        height={150}
                        width={150}
                        className="loader loaderWhitesmoke"
                    />
                </div>
            </div>
        )

        return (
            <div className="fondo">
                <Navbar className="barraNavegacion alturaBarra">
                    <MDBCol md="2" className="culturaVerde">
                        <div className="culturaVerde">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </div>
                    </MDBCol>
                    <MDBCol md="1" />
                    <MDBCol md="5">
                        <MDBRow className="alturaSeccionesBarra">
                            <InputGroup className="barraBusquedaNuevo">
                                <FormControl
                                    placeholder="Buscar productos y productores.."
                                    aria-label="Buscar productos y productores.."
                                    onKeyPress={this.onKeyPress}
                                    ref={input => (this.busqueda = input)}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text className="botonBusqueda cursorManito" onClick={this.handleInputChange}>
                                        <i className="fa fa-search iconoBusqueda" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol>
                        <Nav className="alturaSeccionesBarra">
                            <Nav.Link href='/login'>Ingresar</Nav.Link>
                            <Nav.Link href='/seleccionUsuario'>Creá tu cuenta</Nav.Link>
                        </Nav>
                    </MDBCol>
                    <MDBCol md="1">
                        <Nav.Item className="alturaSeccionesBarra">
                            <i className="fas fa-info-circle iconosBarra" />
                        </Nav.Item>
                    </MDBCol>
                </Navbar>
                <Container fluid className="contenedor">
                    {
                        this.state.busqueda !== "" ?
                            <ResultadoBusquedaSinLogin
                                busqueda={this.state.busqueda} />
                            :
                            <div>
                                <div className="titulosPrincipales">Novedades</div>
                                {
                                    (lista.length > 0) ?
                                        <CarouselProductos
                                            listadoProductos={lista}
                                            mostrarDetalleProducto={this.mostrarDetalleProducto} />
                                        :
                                        (this.state.resultadoRequest !== 504) ?
                                            <div className="notFound">
                                                <i className="fas fa-search iconoGrande" />
                                                <br />
                                                <br />
                                                <h5>Ups! No se encontraron novedades!</h5>
                                            </div>
                                            :
                                            <div className="notFound">
                                                <i className="fas fa-exclamation-circle iconoGrandeError" />
                                                <br />
                                                <br />
                                                <h5>Ups! Ocurrió un error al buscar las novedades! </h5>
                                                <h6 className="grey-text">Por favor, reintentá en unos minutos.</h6>
                                            </div>
                                }

                            </div>
                    }
                    {
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes" tabIndex="0">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                <div className="modal-body">
                                    <i className="fas fa-shopping-cart iconoModal" />
                                    <br />
                                    <br />
                                    <h5> Hola!
                                        <br />
                                        Para continuar tenés que iniciar sesión...
                                        </h5>
                                    <br />
                                    <h6 className="grey-text">
                                        Podes hacerlo por <Link to={'/login'}>acá</Link>
                                    </h6>
                                </div>
                            </div>
                        </MDBModal>
                    }
                </Container>
            </div >
        );
    }
}
export default HomePage;
