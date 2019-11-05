import React, { Component } from 'react'
import { Form, Row, Button, InputGroup } from 'react-bootstrap';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import { MDBModal } from 'mdbreact';

import '../diseños/nuevoProducto.css';
import '../diseños/estilosGlobales.css';

import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondTypeValidate from "filepond-plugin-file-validate-type";
//import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'; import { isDate } from 'moment';

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
            contenidoDeshabilitado: false
        }

        this.featurePond = React.createRef();
        this.mostrarListadoDeProductos = this.mostrarListadoDeProductos.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.subirArchivos = this.subirArchivos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
    }

    componentDidMount() {
        const path = "http://localhost:3000/redAgro/obtenerProducto/" + this.props.match.params.idProducto;
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
                        precio: data.precio,
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
        } else if (!regularExp.numerosDecimales.test(this.state.campos["precio"])) {
            validaciones["precio"] = "Formato invalido reg";
            showModal = true;
        } else if (isNaN(this.state.campos["precio"])) {
            validaciones["precio"] = "Formato invalido nan";
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

        // if (!this.state.campos["files"]) {
        //     validaciones["files"] = "Campo requerido";
        //     showModal = true;
        // }

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
            var path = "http://localhost:3000/redAgro/actualizarProductoProductor?id_producto_productor=" + _this.state.productoAEditar.id;

            fetch(path, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    "titulo": this.state.campos["titulo"],
                    "descripcion": this.state.campos["descripcion"],
                    "fecha_vencimiento": this.state.campos["fecha_vencimiento"],
                    //"precio": this.state.campos["precio"].replace(",", "."),
                    "precio": this.state.campos["precio"],
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
                        loading: false
                    })
                })
                .then(data => {
                    if (data !== undefined) {
                        _this.setState({
                            mensaje: data,
                            showModal: true,
                            loading: false
                        });
                        //_this.subirArchivos(response);
                    }
                })

        }
    }

    subirArchivos(producto_productor) {
        const path = "http://localhost:3000/redAgro/subir_archivos?producto_productor=";

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
            <div className="container">
                <div className="titulosPrincipales">Editar producto</div>
                <div className="condicionesInputsCO">(*) Campos obligatorios</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="titulo">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>*Título</Form.Label>
                            <Form.Control
                                value={this.state.campos["titulo"]}
                                type="titulo"
                                name="titulo"
                                onChange={(e) => this.detectarCambios(e)}
                                maxLength="100"
                            />
                            {
                                (this.state.validaciones["titulo"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["titulo"]} />
                            }
                        </Form.Group>
                        <div className="condicionesInputs">(*) 100 caracteres como máximo</div>
                    </div>
                    <div className="descripcion" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Descripción
									</Form.Label>
                            <Form.Control
                                value={this.state.campos["descripcion"]}
                                as="textarea"
                                rows="3"
                                type="desc"
                                name="descripcion"
                                maxLength="255"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                            {
                                (this.state.validaciones["descripcion"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["descripcion"]} />
                            }
                        </Form.Group>
                        <div className="condicionesInputs">(*) 255 caracteres como máximo</div>
                    </div>
                    <div className="dropdownCategoria">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Categoria
								</Form.Label>
                            <Select
                                isDisabled={true}
                                value={this.state.categoria}
                                className="selectCategoria"
                                name="categoria"
                            />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProducto">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Tipo de producto
								</Form.Label>
                            <Select
                                isDisabled={true}
                                value={this.state.tipoProducto}
                                className="selectTipoProducto"
                                name="tipo_producto"
                            />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProduccion">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Tipo de Producción
								</Form.Label>
                            <Select
                                isDisabled={true}
                                value={this.state.tipoProduccion}
                                className="selectTipoProduccion"
                                name="tipo_produccion"
                            />
                        </Form.Group>
                    </div>
                    <div className="unidad_venta">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Unidad de venta
                                </Form.Label>
                            <Select
                                isDisabled={true}
                                value={this.state.valueUnidadVenta}
                                className="selectTipoUnidad"
                                name="unidad_venta"
                            />
                        </Form.Group>
                    </div>
                    <div className="contenido">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Contenido
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["contenido"]}
                                type="contenido"
                                name="contenido"
                                maxLength="50"
                                onChange={(e) => this.detectarCambios(e)}
                                disabled={this.state.contenidoDeshabilitado}
                            />
                            {
                                (this.state.validaciones["contenido"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["contenido"]} />
                            }
                        </Form.Group>
                    </div>
                    <div className="stock">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Cantidad disponible
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["stock"]}
                                type="number"
                                name="stock"
                                min="0"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                            {
                                (this.state.validaciones["stock"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["stock"]} />
                            }
                        </Form.Group>
                    </div>
                    <div className="precio">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Precio (por unidad de venta)
                                </Form.Label>
                            <InputGroup className="estiloCampoPrecio">
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="iconoPrecio sinBorde">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    value={this.state.campos["precio"]}
                                    type="text"
                                    name="precio"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="campoSinBordeNumeros inputDerecha"
                                />
                            </InputGroup>
                            {
                                (this.state.campos["precio"] <= 0) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title="El precio debe ser mayor a 0" />
                            }
                            {
                                (this.state.validaciones["precio"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["precio"]} />
                            }
                        </Form.Group>

                    </div>
                    <div className="tiempo_preparacion">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Tiempo de preparación (en días)
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["tiempo_preparacion"]}
                                type="number"
                                name="tiempo_preparacion"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                            {
                                (this.state.validaciones["tiempo_preparacion"] && this.state.campos["tiempo_preparacion"] <= 0) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title="El tiempo de preparación no puede ser menor a 0" />
                            }
                        </Form.Group>
                    </div>
                    <div className="fechaVencimiento">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Fecha de vencimiento
                                </Form.Label>
                            <DatePickerInput
                                name="fecha_vencimiento"
                                displayFormat='DD/MM/YYYY'
                                minDate={minDate}
                                className="calen"
                                value={this.state.campos["fecha_vencimiento"]}
                                onChange={(e) => this.cambiosFecha(e)}
                            />
                            {
                                (this.state.validaciones["fecha_vencimiento"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" title={this.state.validaciones["fecha_vencimiento"]} />
                            }
                        </Form.Group>
                    </div>
                    <div className="imagenes">
                        <div className="tituloImagen">*Imágenes</div>
                        <FilePond
                            files={this.state.files}
                            className="cursorManito"
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
                    </div>
                    <div className="condicionesInputsImg">(*) 5 imágenes como máximo</div>
                    <div className="botonesNuevoProducto">
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