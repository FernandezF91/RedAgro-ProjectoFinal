import '../diseños/PerfilProductor.css'
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Avatar from '@material-ui/core/Avatar';
import { Row, Col, Container } from 'react-bootstrap';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBRow, MDBCarousel, MDBCarouselItem, MDBCarouselInner, MDBContainer } from "mdbreact";
import Carousel from 'react-bootstrap/Carousel';
import Paginacion from './Paginacion';
import NumberFormat from 'react-number-format';
import moment from 'moment';

moment.locale('es');

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
            paginaActual: 1,
            productosPerPage: 3,
            tamañoListado: 3,
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
                            fecha_creacion: data.usuario.fecha_creacion,
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

    nextPage = (pageNumber) => {
        this.setState({ paginaActual: pageNumber });
    }

    generarProductosAMostrar = (item) => {
        return (
            <MDBCol md="4" key={item.id}>
                <MDBCard className="mb-2">
                    <MDBCardImage
                        className="imagenesBusqueda"
                        src={"data:" + item.imagenes[0].tipo_contenido + ";base64," + item.imagenes[0].image}
                        alt="ImagenBusqueda"
                        overlay="white-slight"
                        height="150x" width="auto" />

                    <MDBCardBody className="text-center">
                        <h6 className="grey-text">{item.tipo}</h6>
                        <MDBCardTitle>
                            <strong className="dark-grey-text">{item.titulo}</strong>
                        </MDBCardTitle>
                        <MDBCardText>
                            <strong className="float-center">
                                {
                                    (item.oferta === null || item.oferta === undefined) ?
                                        <div>
                                            <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                        </div>
                                        :
                                        (item.oferta.activo) ?
                                            <div title="Producto en oferta!">
                                                <strike>
                                                    <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                                </strike>
                                                <br />
                                                <NumberFormat value={item.precio - item.precio * item.oferta.porcentaje / 100} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                            </div>
                                            :
                                            <div>
                                                <NumberFormat value={item.precio} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix="$ " decimalScale={2} fixedDecimalScale={true} /> x {item.tipoDeUnidad}
                                            </div>
                                }
                            </strong>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
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

        if (this.state.loading)
            return <Loader
                type="Grid"
                color="#28A745"
                height={150}
                width={150}
                className="loader" />;

        var fecha = moment(this.state.datosProductor.fecha_creacion, "YYYY-MM-DD").fromNow().toString();
        fecha = fecha.charAt(0).toUpperCase() + fecha.slice(1);
        const productos = this.state.datosProductor.productos;
        const { productosPerPage } = this.state;
        const numberOfPages = Math.ceil(productos.length / productosPerPage);
        let lista = this.crearListaDeProductos(numberOfPages, productosPerPage, productos);

        return (
            <div className="perfilProductor">
                <Row>
                    <div className="nombreDelPerfil">
                        {this.state.datosProductor.nombre}
                        <h6 className="grey-text">{fecha} que forma parte de Cultura Verde</h6>
                    </div>
                </Row>

                <MDBContainer>
                <div className="listadoDeProductos">Mis productos</div>
                    <MDBCarousel activeItem={1} length={lista.length} slide={true} showControls={true} showIndicators={true} multiItem>
                        <MDBCarouselInner>
                            {
                                lista.map((itemLista, index) => (
                                    <MDBCarouselItem itemId={index + 1}>
                                        <MDBRow>
                                            {
                                                itemLista.map((item) => (
                                                    this.generarProductosAMostrar(item)
                                                ))
                                            }
                                        </MDBRow>
                                    </MDBCarouselItem>
                                ))
                            }
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>

            </div>

        );
    }
}
export default PerfilProductor;