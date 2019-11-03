import culturaVerde from '../imagenes/cultura-verde-2.png';
import '../diseños/Home.css';
import '../diseños/estilosGlobales.css';
import { MDBModal } from 'mdbreact';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import CarouselProductos from './CarouselProductos'
import { Navbar, Nav, Row, InputGroup, FormControl, Container } from 'react-bootstrap';
import ResultadoBusquedaSinLogin from './ResultadoBusquedaSinLogin';

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
        var path = "http://localhost:3000/redAgro/ProductosProductor/obtenerProductosPantallaInicial";
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
        const numberOfPages = Math.ceil(productos.length / productos);
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
                <div className="barraNavegacion">
                    <Navbar className="alturaBarra">
                        <div className="culturaVerde">
                            <img src={culturaVerde} width="130px" height="50px" alt="Cultura Verde" />
                        </div>
                        <div className="barraBusqueda">
                            <Row>
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
                            </Row>
                        </div>
                        <div className="textos">
                            <Nav>
                                <Nav.Link href='/login'>Ingresar</Nav.Link>
                                <Nav.Link href='/seleccionUsuario'>Creá tu cuenta</Nav.Link>
                            </Nav>
                        </div>
                        <div className="verticalDivider" role="separator" />
                        <Nav.Item className="menuUsuario">
                            <i className="fas fa-info-circle iconosBarra" />
                        </Nav.Item>
                    </Navbar>
                </div>
                <Container fluid className="contenedor">
                    {
                        this.state.busqueda !== '' ?
                            <ResultadoBusquedaSinLogin
                                busqueda={this.state.busqueda} />
                            :
                            <CarouselProductos
                                listadoProductos={lista}
                                mostrarDetalleProducto={this.mostrarDetalleProducto} />
                    }
                    {
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes">
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
            </div>
        );
    }
}
export default HomePage;
