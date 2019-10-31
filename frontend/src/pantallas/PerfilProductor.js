import '../diseños/PerfilProductor.css'
import '../diseños/estilosGlobales.css';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardText, MDBCarousel, MDBCarouselItem, MDBCarouselInner, MDBContainer } from "mdbreact";
import BeautyStars from 'beauty-stars';
import ResumenFechasEntrega from "./principales/ResumenFechasEntrega";
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
                productos: {},
                puntosEntrega: {},
            },
            calificacion: {},
            productos: [],
            listaFechasEntrega: [],
            loading: true,
            paginaActual: 1,
            productosPerPage: 3,
            tamañoListado: 3,
            resultadoRequest: '',
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
                        }
                    })

                    var id_productor = data.id;
                    this.obtenerProductos(id_productor);
                    this.obtenerCalificaciones(id_productor);
                    this.obtenerListadoFechasEntrega(id_productor);

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

    obtenerProductos(id_productor) {
        var path = "http://localhost:3000/redAgro/obtenerProductosProductor?id=" + id_productor;
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

    obtenerCalificaciones(id_productor) {
        var path = "http://localhost:3000/redAgro/obtenerPromedioCalificaciones?id_productor=" + id_productor;
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
                        calificacion: data,
                    })
                } else {
                    this.setState({ loading: false });
                }
            })
    }

    obtenerListadoFechasEntrega(id_productor) {
        var _this = this;
        _this.setState({
            loading: true
        });
        var path = "http://localhost:3000/redAgro/obtenerEntregasProximoMes?id_productor=" + id_productor;

        fetch(path)
            .catch(err => console.error(err))
            .then(response => {
                _this.setState({
                    resultadoRequestFechasEntrega: response.status
                })
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 504) {
                    console.log("Timeout");
                } else {
                    console.log("Otro error");
                }
            })
            .then(data => {
                if (data !== void (0)) {
                    _this.setState({
                        listaFechasEntrega: data.map((item) => {
                            var direccion = item.direccion + " (" + item.localidad + ")";
                            return {
                                fecha: moment(item.fechaEntrega, 'DD-MM-YYYY').format('DD/MM/YYYY'),
                                descripcion: item.descripcion,
                                direccion: direccion
                            }
                        })
                    })
                }
                _this.setState({
                    loading: false
                })
            })
    }

    generoItemFechas(item) {
        const itemMDBRows = [
            <tr key={"MDBRow-data-" + item.fecha}>
                <td>{item.fecha}</td>
                <td>
                    <div className="overflowDescripcion" title={item.descripcion}>
                        {item.descripcion}
                    </div>
                </td>
                <td>
                    <div className="overflowDescripcion" title={item.direccion}>
                        {item.direccion}
                    </div>
                </td>
            </tr>
        ];
        return itemMDBRows;
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
        const { productos, productosPerPage, listaFechasEntrega } = this.state;
        const numberOfPages = Math.ceil(productos.length / productosPerPage);
        let lista = this.crearListaDeProductos(numberOfPages, productosPerPage, productos);
        let bodyFechas = [];
        listaFechasEntrega.forEach(item => {
            bodyFechas.push(this.generoItemFechas(item));
        })

        return (
            <div>
                <MDBRow>
                    <div className="nombreDelPerfil titulosPrincipales tituloMiCuenta">
                        {this.state.datosProductor.nombre}
                        <h6 className="grey-text">{fecha} que forma parte de Cultura Verde</h6>
                    </div>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <MDBRow>
                            <MDBCol>
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardTitle> <i className="fas fa-star" /> Mis calificaciones</MDBCardTitle>
                                        {
                                            this.state.datosProductor.calificacion === "Aún no hay calificaciones" || this.state.datosProductor.calificacion === undefined ?
                                                'Aún no hay calificaciones' :
                                                <div>
                                                    <h6 className="grey-text">Promedio realizado en base a 1 reservas calificadas.</h6>
                                                    <BeautyStars
                                                        value={this.state.datosProductor.calificacion}
                                                        activeColor="#28A745"
                                                        inactiveColor="#757877"
                                                        size="24px" />
                                                </div>
                                        }
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="text-center">
                                        <MDBCardTitle>
                                            <i className="fas fa-map-marker-alt" /> Próximas fechas de entrega
                                        </MDBCardTitle>
                                        <MDBCardText className="resumenCentrado">
                                            <ResumenFechasEntrega
                                                listadoPuntosEntrega={bodyFechas}
                                                resultadoRequest={this.state.resultadoRequestFechasEntrega}
                                                vistaProductor={false}
                                            />
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <h4>
                                        <i className="fas fa-store" /> Mis productos
                                    </h4>
                                </MDBCardTitle>
                                <MDBContainer className="listadoDeProductos">
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
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}
export default PerfilProductor;