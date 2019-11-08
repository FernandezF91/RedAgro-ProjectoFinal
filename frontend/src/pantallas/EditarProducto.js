import 'rc-datepicker/lib/style.css';
import '../diseños/nuevoProducto.css';
import '../diseños/estilosGlobales.css';

import React, { Component } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { MDBCol, MDBRow, MDBModal } from "mdbreact";
import { DatePickerInput } from 'rc-datepicker';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import Gallery from 'react-grid-gallery';

import 'moment/locale/es';

import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondTypeValidate from "filepond-plugin-file-validate-type";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const minDate = new Date();

const regularExp = {
    numerosDecimales: /^[0-9]*(\,[0-9]{0,2})?$/
}

//registerPlugin(FilePondPluginImagePreview, FilePondTypeValidate, FilePondPluginImageExifOrientation);
registerPlugin(FilePondPluginImagePreview, FilePondTypeValidate);

class EditarProducto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            files: "",
            mensaje: "",
            categoria: [],
            tipoProducto: [],
            tipoProduccion: [],
            valueUnidadVenta: [],
            id: this.props.id_productor,
            loading: true,
            showModal: false,
            productoAEditar: {},
            validaciones: [],
            resultadoRequest: 0,
            contenidoDeshabilitado: false,
            currentImage: 0,
            listadoImagenes: [],
            imagenesABorrar: [],
            cantidadImagenesActuales: 0,
            cantidadDisponibleImagenes: 5
        }

        this.featurePond = React.createRef();
        this.mostrarListadoDeProductos = this.mostrarListadoDeProductos.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.subirArchivos = this.subirArchivos.bind(this);
        this.eliminarFotos = this.eliminarFotos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.eliminarFoto = this.eliminarFoto.bind(this);
    }

    componentDidMount() {
        const path = "redAgro/obtenerProducto/" + this.props.match.params.idProducto;
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
                    var producto = {
                        id: data.id,
                        categoria: data.producto.categoria,
                        tipo: data.producto.tipo,
                        titulo: data.titulo,
                        descripcion: data.descripcion,
                        stock: data.stock,
                        tipoDeUnidad: data.unidad_venta,
                        tipoDeProduccion: data.tipo_produccion,
                        precio: data.precio.toString().replace(".", ","),
                        fechaDeVencimiento: data.fecha_vencimiento,
                        tiempoDePreparacion: data.tiempo_preparacion,
                        contenido: data.contenido,
                        imagenes: data.imagenes,
                        oferta: data.oferta
                    }

                    let campos = [];
                    if (producto !== undefined) {
                        if (producto.tipoDeUnidad === "Kilogramo") {
                            this.setState({
                                contenidoDeshabilitado: true
                            });
                        }

                        campos["titulo"] = producto.titulo;
                        campos["descripcion"] = producto.descripcion;
                        if (producto.fechaDeVencimiento !== "-") {
                            campos["fecha_vencimiento"] = producto.fechaDeVencimiento;
                        }

                        campos["precio"] = producto.precio;

                        campos["stock"] = producto.stock;
                        campos["contenido"] = producto.contenido;
                        campos["tiempo_preparacion"] = producto.tiempoDePreparacion;

                        var listadoImagenes = []

                        producto.imagenes.forEach((img) => {
                            console.log(this.state.cantidadImagenesActuales);
                            this.setState({
                                cantidadImagenesActuales: this.state.cantidadImagenesActuales + 1
                            });

                            var imagen = {
                                id: img.id,
                                src: "data:" + img.tipo_contenido + ";base64," + img.image,
                                thumbnail: "data:" + img.tipo_contenido + ";base64," + img.image,
                                thumbnailWidth: 100,
                                thumbnailHeight: 100,
                                caption: img.nommbre
                            }
                            listadoImagenes.push(imagen);
                        });;

                        this.setState({
                            listadoImagenes
                        })

                    }

                    this.setState({
                        productoAEditar: producto,
                        campos: campos,
                        categoria: [{
                            label: producto.categoria,
                            value: 1
                        }],
                        tipoProducto: [{
                            label: producto.tipo,
                            value: 1
                        }],
                        valueUnidadVenta: [{
                            label: producto.tipoDeUnidad,
                            value: 1
                        }],
                        tipoProduccion: [{
                            label: producto.tipoDeProduccion,
                            value: 1
                        }],
                        loading: false
                    })
                }
            })
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    eliminarFoto() {
        if (window.confirm("Estás seguro de eliminar esta foto?")) {
            var images = this.state.listadoImagenes.slice();
            images.splice(this.state.currentImage, 1);

            let imagenesABorrar = this.state.imagenesABorrar;
            imagenesABorrar.push(this.state.listadoImagenes[this.state.currentImage]);

            this.setState({
                listadoImagenes: images,
                cantidadImagenesActuales: this.state.cantidadImagenesActuales - 1,
                imagenesABorrar: imagenesABorrar,
                cantidadDisponibleImagenes: this.state.cantidadDisponibleImagenes + 1
            });
        }

        console.log(this.state.cantidadImagenesActuales);
        if (this.state.cantidadImagenesActuales === 1) {
            document.getElementById("lightboxBackdrop").remove();
        }
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
        this.mostrarListadoDeProductos();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;
        this.setState({
            campos
        })
    }

    validarCampos() {
        var showModal = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];
        if (!this.state.campos["stock"]) {
            validaciones["stock"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["precio"]) {
            validaciones["precio"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["precio"] < 0) {
            validaciones["precio"] = "Precio inválido";
            showModal = true;
        } else if (!regularExp.numerosDecimales.test(this.state.campos["precio"])) {
            validaciones["precio"] = "Formato invalido";
            showModal = true;
        }

        if (!this.state.campos["descripcion"]) {
            validaciones["descripcion"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["titulo"]) {
            validaciones["titulo"] = "Campo requerido";
            showModal = true;
        }

        if (this.state.files.length === 0 && this.state.cantidadImagenesActuales === 0) {
            validaciones["imagenes"] = "Campo requerido";
            showModal = true;
        }

        if (this.state.files.length === 5 && this.state.cantidadImagenesActuales > 0) {
            validaciones["imagenes"] = "El máximo permitido son 5 imágenes";
            showModal = true;
        }

        if (!this.state.campos["fecha_vencimiento"]) {
            validaciones["fecha_vencimiento"] = "Campo requerido";
            showModal = true;
        } else if (this.state.campos["fecha_vencimiento"] !== this.state.productoAEditar.fechaDeVencimiento) {
            if (moment(this.state.campos["fecha_vencimiento"], 'DD/MM/YYYY').format('YYYY-MM-DD') === "Invalid date") {
                validaciones["fecha_vencimiento"] = "Formato incorrecto";
                showModal = true;
            }
        }

        if (showModal) {
            this.setState({
                validaciones: validaciones,
                showModal: showModal,
                mensaje: "Ups! Campos incompletos o incorrectos",
                loading: false,
                resultadoRequest: 0
            });
            return false;
        } else {
            return true;
        }
    }

    handleSubmit(e) {
        var _this = this;

        _this.setState({
            loading: true
        });
        e.preventDefault();

        if (_this.validarCampos()) {
            var path = "redAgro/actualizarProductoProductor?id_producto_productor=" + _this.state.productoAEditar.id;

            fetch(path, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    "titulo": this.state.campos["titulo"],
                    "descripcion": this.state.campos["descripcion"],
                    "fecha_vencimiento": this.state.campos["fecha_vencimiento"],
                    "precio": this.state.campos["precio"].replace(",", "."),
                    "stock": this.state.campos["stock"],
                    "tiempo_preparacion": this.state.campos["tiempo_preparacion"],
                    "contenido": this.state.campos["contenido"]
                }),
            })
                .catch(err => console.error(err))
                .then(response => {
                    _this.setState({
                        resultadoRequest: response.status
                    })
                    if (response.status === 200) {
                        return response.text();
                    } else if (response.status === 504) {
                        console.log("Timeout");
                    } else {
                        console.log("Otro error");
                    }
                    _this.setState({
                        mensaje: "Ocurrió un error al actualizar el producto. Reintentá en unos minutos.",
                        showModal: true,
                        loading: false,
                        resultadoRequest: 0
                    })
                })
                .then(data => {
                    if (data !== undefined) {
                        _this.setState({
                            mensaje: data,
                            showModal: true,
                            loading: false
                        });
                        _this.eliminarFotos(_this.state.imagenesABorrar);
                        if (this.state.files.length > 0) {
                            _this.subirArchivos(_this.state.productoAEditar.id);
                        }
                    }
                })

        }
    }

    eliminarFotos(listadoImagenesAEliminar) {
        listadoImagenesAEliminar.forEach((img) => {
            var path = "redAgro/eliminarFoto?id=" + img.id;

            fetch(path, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json;charset=UTF-8' }
            })
                .catch(err => console.error(err))
                .then(response => {
                    if (response.status === 200) {
                        return response.text();
                    } else if (response.status === 504) {
                        console.log("Timeout");
                    } else {
                        console.log("Otro error");
                    }
                    this.setState({
                        mensaje: "Ocurrió un error al eliminar la imagen. Reintentá en unos minutos.",
                        showModal: true,
                        resultadoRequest: 0
                    })
                })
                .then(data => {
                    console.log(data);
                })
        })
    }

    subirArchivos(producto_productor) {
        const path = "redAgro/subir_archivos?producto_productor=";

        this.state.files.forEach((fileItem) => {

            let data = new FormData();
            data.append('file', fileItem);
            data.append('name', fileItem.name);

            const path_final = path + producto_productor

            fetch(path_final, {
                method: 'POST',
                body: data

            }).then(response => {

            }).catch(err => {

            });
        })
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_vencimiento"] = e;
        this.setState({
            campos
        });
    }

    limpiarCampos() {
        let files = [];
        let campos = this.state.campos;
        campos["titulo"] = "";
        campos["descripcion"] = "";
        campos["fecha_vencimiento"] = "";
        campos["stock"] = "";
        campos["precio"] = "";
        campos["tiempo_preparacion"] = "";
        campos["unidad_venta"] = "";
        campos["contenido"] = "";

        this.featurePond.current.getFiles().forEach(file => {
            this.featurePond.current.removeFile(file);
        });

        this.setState({
            campos: campos,
            files: files
        });
    }

    mostrarListadoDeProductos() {
        this.props.history.push({
            pathname: '/principalProductores/ListadoProductos',
            state: {
                id: this.state.id
            }
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
            <div>
                <div className="titulosPrincipales">Editar producto</div>
                <div className="condicionesInputsTitulo">(*) Campos obligatorios</div>
                <br />
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" className="labelCampoTextarea">
                            <Form.Label column>*Título</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["titulo"]}
                                    name="titulo"
                                    maxLength="100"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["titulo"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["titulo"]} />
                                }
                            </MDBRow>
                            <div className="condicionesInputs col-md-8">(*) 100 caracteres como máximo</div>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4" className="labelCampoTextarea">
                            <Form.Label column>*Descripción</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["descripcion"]}
                                    as="textarea"
                                    rows="3"
                                    name="descripcion"
                                    maxLength="255"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["descripcion"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["descripcion"]} />
                                }
                            </MDBRow>
                            <div className="condicionesInputs col-md-8">(*) 255 caracteres como máximo</div>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Categoria</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="padding0Column">
                            <Select
                                isDisabled={true}
                                value={this.state.categoria}
                                className="selectFormularios col-md-8"
                                name="categoria"
                            />
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Tipo de producto</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="padding0Column">
                            <Select
                                isDisabled={true}
                                value={this.state.tipoProducto}
                                className="selectFormularios col-md-8"
                                name="tipo_producto"
                            />
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Tipo de producción</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="padding0Column">
                            <Select
                                isDisabled={true}
                                value={this.state.tipoProduccion}
                                className="selectFormularios col-md-8"
                                name="tipo_produccion"
                            />
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Unidad de venta</Form.Label>
                        </MDBCol>
                        <MDBCol md="8" className="padding0Column">
                            <Select
                                isDisabled={true}
                                value={this.state.valueUnidadVenta}
                                className="selectFormularios col-md-8"
                                name="unidad_venta"
                            />
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Contenido</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["contenido"]}
                                    name="contenido"
                                    maxLength="50"
                                    onChange={(e) => this.detectarCambios(e)}
                                    disabled={this.state.contenidoDeshabilitado}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["contenido"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["contenido"]} />
                                }
                            </MDBRow>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Cantidad disponible</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["stock"]}
                                    type="number"
                                    name="stock"
                                    min="0"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["stock"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["stock"]} />
                                }
                            </MDBRow>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Precio (por unidad de venta)</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <InputGroup className="col-md-3 padding0Inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text className="iconoInputGroupBordeDerecho">$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        value={this.state.campos["precio"]}
                                        name="precio"
                                        onChange={(e) => this.detectarCambios(e)}
                                        className="inputDerecha"
                                    />
                                </InputGroup>
                                {
                                    (this.state.validaciones["precio"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["precio"]} />
                                }
                            </MDBRow>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Tiempo de preparación (en días)</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Form.Control
                                    value={this.state.campos["tiempo_preparacion"]}
                                    type="number"
                                    name="tiempo_preparacion"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["tiempo_preparacion"] && this.state.campos["tiempo_preparacion"] <= 0) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title="El tiempo de preparación no puede ser menor a 0" />
                                }
                            </MDBRow>
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Fecha de vencimiento</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <DatePickerInput
                                    name="fecha_vencimiento"
                                    displayFormat='DD/MM/YYYY'
                                    minDate={minDate}
                                    className="col-md-3 padding0Inputs"
                                    value={this.state.campos["fecha_vencimiento"]}
                                    onChange={(e) => this.cambiosFecha(e)}
                                />
                                {
                                    (this.state.validaciones["fecha_vencimiento"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["fecha_vencimiento"]} />
                                }
                            </MDBRow>
                        </MDBCol>
                    </Form.Group>
                    <br />
                    <div>
                        Imágenes actuales
                    </div>
                    <div
                        style={{
                            display: "block",
                            overflow: "auto",
                            width: "70%",
                            margin: "auto"
                        }}
                        className="cajaImagenesActuales"
                    >
                        <Gallery
                            images={this.state.listadoImagenes}
                            enableLightbox={true}
                            currentImageWillChange={this.onCurrentImageChange}
                            maxRows={1}

                            customControls={[
                                <button key="eliminarFoto" onClick={this.eliminarFoto}>Eliminar foto</button>
                            ]}
                        />
                    </div>
                    <br />
                    <div>
                        <MDBRow className="justifyContentCenter">
                            <span md="3">*Imágenes</span>
                            {
                                (this.state.validaciones["imagenes"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["imagenes"]} />
                            }
                        </MDBRow>
                        <br />
                        <FilePond
                            className="cursorManito cajaImagenesWidth"
                            ref={this.featurePond}
                            allowMultiple={true}
                            maxFiles={5}
                            imagePreviewHeight={150}
                            acceptedFileTypes="image/jpeg, image/png, image/jpg"
                            labelIdle={"Arrastre o suba sus imágenes aquí"}
                            onupdatefiles={(fileItems) => {
                                // Set current file objects to this.state
                                this.setState({
                                    files: fileItems.map(fileItem => fileItem.file)
                                });
                            }} />
                        <div className="condicionesInputs">(*) 5 imágenes como máximo</div>
                    </div>
                    <br />
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarListadoDeProductos}>Cancelar</Button>
                        <Button variant="light" onClick={() => this.limpiarCampos()}>Limpiar</Button>
                        <Button variant="success" type="submit">Guardar</Button>
                    </div>
                </Form>
                {
                    (this.state.showModal) &&
                    (
                        <MDBModal isOpen={this.state.showModal} centered size="sm">
                            <div className="modalMargenes">
                                {(this.state.resultadoRequest === 200) ?
                                    (
                                        <div>
                                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                            <br />
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    ) : (
                                        <div>
                                            <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                            <br />
                                            <i className="fas fa-exclamation-circle iconoModalError" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    )
                                }
                            </div>
                        </MDBModal>
                    )
                }
            </div>
        );
    };
}

export default EditarProducto;