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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

class NuevoProducto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            files: "",
            titulo: "",
            visible: false,
            mensaje: "",
            tipos_producto: [],
            formOk: false,
            visibleOk: false,
            categoria: [],
            tipoProducto: [],
            tipoProduccion: [],
            valueUnidadVenta: [],
            id: this.props.id_productor,
            loading: true,
            showModal: false,
            productoAEditar: [],
            validaciones: [],
            resultadoRequest: 0,
            showError: false,
            showErrorMensaje: "",
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
        this.setState({
            productoAEditar: this.props.productoAEditar
        })

        if (this.state.productoAEditar !== undefined) {
            if (this.props.productoAEditar.tipoDeUnidad === "Kilogramo") {
                this.setState({
                    contenidoDeshabilitado: true
                });
            }
            let campos = [];
            campos["titulo"] = this.props.productoAEditar.titulo;
            campos["descripcion"] = this.props.productoAEditar.descripcion;
            if (this.props.productoAEditar.fechaDeVencimiento !== "-") {
                campos["fecha_vencimiento"] = moment(this.props.productoAEditar.fechaDeVencimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }
            campos["precio"] = this.props.productoAEditar.precio;
            campos["stock"] = this.props.productoAEditar.stock;
            campos["contenido"] = this.props.productoAEditar.contenido;
            campos["tiempo_preparacion"] = this.props.productoAEditar.tiempoDePreparacion;

            //var imagen = this.props.productoAEditar.imagenes[0].tipo_contenido + ";base64," + this.props.productoAEditar.imagenes[0].image
            this.setState({
                campos: campos,
                categoria: [{
                    label: this.props.productoAEditar.categoria,
                    value: 1
                }],
                tipoProducto: [{
                    label: this.props.productoAEditar.tipo,
                    value: 1
                }],
                valueUnidadVenta: [{
                    label: this.props.productoAEditar.tipoDeUnidad,
                    value: 1
                }],
                tipoProduccion: [{
                    label: this.props.productoAEditar.tipoDeProduccion,
                    value: 1
                }],
                // files: [{
                //     source: imagen,
                //     options: {
                //         type: 'local'
                //     }
                // }]
            })
        }
        this.setState({
            loading: false
        });
    }

    cerrarModal() {
        this.setState({
            showModal: false
        })
    }

    cerrarModalError() {
        this.setState({
            showError: false
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
        var showError = false;
        this.setState({
            validaciones: []
        });
        let validaciones = [];
        if (!this.state.campos["stock"]) {
            validaciones["stock"] = "Campo requerido";
            showError = true;
        }

        if (!this.state.campos["precio"]) {
            validaciones["precio"] = "Campo requerido";
            showError = true;
        } else if (!regularExp.numerosDecimales.test(this.state.campos["precio"])) {
            validaciones["precio"] = "Formato invalido reg";
            showError = true;
        } else if (isNaN(this.state.campos["precio"])) {
            validaciones["precio"] = "Formato invalido nan";
            showError = true;
        }

        if (!this.state.campos["descripcion"]) {
            validaciones["descripcion"] = "Campo requerido";
            showError = true;
        }

        if (!this.state.campos["titulo"]) {
            validaciones["titulo"] = "Campo requerido";
            showError = true;
        }

        // if (!this.state.campos["files"]) {
        //     validaciones["files"] = "Campo requerido";
        //     showError = true;
        // }

        if (!this.state.campos["fecha_vencimiento"]) {
            validaciones["fecha_vencimiento"] = "Campo requerido";
            showError = true;
        } else if (moment(this.state.campos["fecha_vencimiento"], 'DD/MM/YYYY').format('YYYY-MM-DD') === "Invalid date") {
            validaciones["fecha_vencimiento"] = "Formato incorrecto";
            showError = true;
        }

        if (showError) {
            this.setState({
                validaciones: validaciones,
                showError: showError,
                showErrorMensaje: "Ups! Campos incompletos o incorrectos",
                loading: false
            });
            return false;
        } else {
            return true;
        }
    }

    closeModalSeguirCargando() {
        this.setState({
            visibleOk: false,
            formOk: false
        });
        this.limpiarCampos();
    }

    closeModal() {
        if (this.state.formOk === true) {
            this.mostrarListadoDeProductos();
        }

        this.setState({
            visible: false
        });
    }

    handleSubmit(e) {
        var _this = this;
        
        _this.setState({
            loading: true
        });
        e.preventDefault();

        if (_this.validarCampos()) {
            var path = "http://localhost:3000/redAgro/actualizarProductoProductor?id_producto_productor=" + _this.props.productoAEditar.id;

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
                        return response.json();
                    } else if (response.status === 504) {
                        console.log("Timeout");
                    } else {
                        console.log("Otro error");
                    }
                    _this.setState({
                        mensaje: "Ocurrió un error al actualizar el producto. Reintentá en unos minutos.",
                    })
                })
                .then(data => {
                    _this.setState({
                        mensaje: data,
                        showModal: true
                    });
                    //_this.subirArchivos(response);
                })
        }
        _this.setState({
            loading: false
        });
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

    mostrarMensajeOk() {
        this.setState({
            formOk: true,
            visibleOk: true
        });
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_vencimiento"] = e;
        this.setState({ campos })
    }

    limpiarCampos() {
        let files = [];
        let campos = this.state.campos;
        campos["titulo"] = "";
        campos["descripcion"] = "";
        campos["categoria"] = "";
        campos["tipo_producto"] = "";
        campos["tipo_produccion"] = "";
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
            files: files,
            categoria: [],
            tipo: [],
            tipoProduccion: [],
            valueUnidadVenta: []
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
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModal} />
                                <br />
                                {(this.state.resultadoRequest === 200) ?
                                    (
                                        <div>
                                            <i className="fas fa-check-circle iconoModalOk" />
                                            <br />
                                            <br />
                                            <h5>{this.state.mensaje}</h5>
                                        </div>
                                    ) : (
                                        <div>
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
                {
                    (this.state.showError) &&
                    (
                        <MDBModal isOpen={this.state.showError} centered size="sm">
                            <div className="modalMargenes">
                                <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                <br />
                                <i className="fas fa-exclamation-circle iconoModalError" />
                                <br />
                                <br />
                                <h5>{this.state.showErrorMensaje}</h5>
                            </div>
                        </MDBModal>
                    )
                }
            </div>
        );
    };
}

export default NuevoProducto;