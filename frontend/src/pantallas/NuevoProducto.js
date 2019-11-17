import 'rc-datepicker/lib/style.css';
import '../diseños/nuevoProducto.css';
import '../diseños/EstilosGenerales.css';

import React, { Component } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { MDBCol, MDBRow, MDBModal } from "mdbreact";
import { DatePickerInput } from 'rc-datepicker';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import moment from 'moment';

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
    numerosDecimales: /^[0-9]*(,[0-9]{0,2})?$/
}

registerPlugin(FilePondPluginImagePreview, FilePondTypeValidate);

const categorias = [
    { label: "Frutas", value: 1 },
    { label: "Verduras", value: 2 },
    { label: "Variado", value: 3 },
    { label: "Otros", value: 4 }
];

const tipoProduccion = [
    { label: "Orgánica", value: 1 },
    { label: "Agroecológica", value: 2 },
];

const tipoUnidadVenta = [
    { label: "Kilogramo", value: 1 },
    { label: "Paquete", value: 2 },
    { label: "Atado", value: 3 },
    { label: "Frasco", value: 4 },
    { label: "Bolsa", value: 5 },
    { label: "Bolsón", value: 6 }
];

class NuevoProducto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campos: {},
            files: "",
            mensaje: "",
            tipos_producto: [],
            valueCategoria: [],
            valueTipoProducto: [],
            valueTipoProduccion: [],
            valueUnidadVenta: [],
            validaciones: [],
            disabledTipoProducto: true,
            disabledContenido: false,
            id: this.props.id_productor,
            loading: true,
            showModal: false,
            resultadoRequest: 0
        }

        this.featurePond = React.createRef();
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.obtenerTiposProducto = this.obtenerTiposProducto.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.subirArchivos = this.subirArchivos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarSeguirCargando = this.cerrarSeguirCargando.bind(this);
        this.cerrarModalError = this.cerrarModalError.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    cerrarModal() {
        this.setState({
            showModal: false,
        })
        this.mostrarListadoDeProductos();
    }

    cerrarSeguirCargando() {
        this.setState({
            showModal: false,
        })
        this.limpiarCampos();
    }

    cerrarModalError() {
        this.setState({
            showModal: false
        })
    }

    detectarCambios(e) {
        let campos = this.state.campos;
        campos[e.target.name] = e.target.value;

        let validaciones = this.state.validaciones;
        validaciones[e.target.name] = "";

        this.setState({
            campos,
            validaciones
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

        if (this.state.campos["fecha_vencimiento"] && moment(this.state.campos["fecha_vencimiento"], 'DD/MM/YYYY').format('YYYY-MM-DD') === "Invalid date") {
            validaciones["fecha_vencimiento"] = "Formato incorrecto";
            showModal = true;
        }

        if (this.state.validaciones["fecha_vencimientoAUX"] === "Invalid date") {
            validaciones["fecha_vencimiento"] = "Formato incorrecto";
            showModal = true;
        }

        if (!this.state.campos["categoria"]) {
            validaciones["categoria"] = "Campo requerido";
            showModal = true;
        }

        if (this.state.campos["categoria"] !== "Variado" && !this.state.campos["tipo_producto"]) {
            validaciones["tipo_producto"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["unidad_venta"]) {
            validaciones["unidad_venta"] = "Campo requerido";
            showModal = true;
        }

        if (!this.state.campos["tipo_produccion"]) {
            validaciones["tipo_produccion"] = "Campo requerido";
            showModal = true;
        }

        if (this.state.files.length === 0) {
            validaciones["imagenes"] = "Campo requerido";
            showModal = true;
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
            var path_principal = "http://localhost:3000/redAgro/usuario_productor/nuevo_producto?id_productor=";
            var id_productor = _this.props.id_productor;
            var id_producto = 1; //para el caso de variado
            if (this.state.campos["categoria"] !== "Variado") {
                id_producto = _this.state.campos["tipo_producto"];
            }
            var path_final = path_principal + id_productor + "&id_producto=" + id_producto;

            var body = JSON.stringify({
                "titulo": this.state.campos["titulo"],
                "descripcion": this.state.campos["descripcion"],
                "fecha_vencimiento": this.state.campos["fecha_vencimiento"],
                "precio": this.state.campos["precio"].replace(",", "."),
                "stock": this.state.campos["stock"],
                "unidad_venta": this.state.campos["unidad_venta"],
                "tiempo_preparacion": this.state.campos["tiempo_preparacion"],
                "tipo_produccion": this.state.campos["tipo_produccion"],
                "contenido": this.state.campos["contenido"]
            })

            fetch(path_final, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: body
            })
                .then(function (response) {
                    if (response.status !== 200) {

                        _this.setState({
                            showModal: true,
                            resultadoRequest: response.status,
                            mensaje: "Ocurrió un error al crear el producto. Reintentá en unos minutos.",
                            loading: false
                        });
                        return;
                    }
                    response.json().then(
                        function (response) {
                            _this.subirArchivos(response);
                            _this.setState({
                                loading: false
                            })
                        });

                    _this.mostrarMensajeOk();
                });
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

    mostrarMensajeOk() {
        this.setState({
            showModal: true,
            loading: false,
            resultadoRequest: 200,
            mensaje: "Producto creado correctamente!"
        });
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_vencimiento"] = e;

        let validaciones = this.state.validaciones;
        validaciones["fecha_vencimientoAUX"] = e;

        this.setState({
            campos,
            validaciones
        });
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
            validaciones: [],
            files: files,
            valueCategoria: [],
            valueTipoProducto: [],
            valueTipoProduccion: [],
            valueUnidadVenta: [],
            disabledTipoProducto: false,
            disabledContenido: false
        });
    }

    cambioTipoProduccion(opt, a, value) {
        let campos = this.state.campos;
        campos["tipo_produccion"] = opt.label;

        this.setState({
            campos,
            valueTipoProduccion: value
        })
    }

    cambioUnidadDeVenta(opt, a, value) {
        let campos = this.state.campos;
        campos["unidad_venta"] = opt.label;

        this.setState({
            campos,
            valueUnidadVenta: value,
            disabledContenido: false
        })

        if (this.state.campos["unidad_venta"] === "Kilogramo") {
            this.setState({
                disabledContenido: true
            });
        }
    }

    cambioTipoProducto(opt, a, value) {
        this.setState({
            valueTipoProducto: value
        });
        let campos = this.state.campos;
        campos[a.name] = opt.value;
        this.setState({
            campos
        })
    }

    cambiosSelectCategoria(opt, a, value) {
        this.setState({
            valueCategoria: value,
            valueTipoProducto: "",
            tipos_producto: [],
            loadingTipo: true
        });
        let campos = this.state.campos;
        campos[a.name] = opt.label;

        if (this.state.campos["categoria"] === "Variado") {
            this.setState({
                disabledTipoProducto: true,
                loadingTipo: false
            })
        }
        this.obtenerTiposProducto(this.state.campos["categoria"]);
    }

    obtenerTiposProducto(categoria) {
        var _this = this;

        const path_principal = "http://localhost:3000/redAgro/obtenerTiposProducto?categoria_producto=";
        const path_final = path_principal + categoria;

        fetch(path_final, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            }
        })
            .then(function (response) {
                if (response.status !== 200) {
                    _this.setState({
                        showModal: true,
                        resultadoRequest: response.status,
                        mensaje: "Ocurrió un error al cargar el listado de tipos de producto. Reintentá en unos minutos."
                    });
                    return;
                }

                response.json().then(
                    function (response) {
                        _this.setState({ tipos_producto: [] })

                        if (_this.state.campos["categoria"] === "Variado") {
                            _this.state.campos["tipo_producto"] = 0
                            return;
                        }

                        response.forEach(producto => _this.setState({
                            tipos_producto: [..._this.state.tipos_producto, {
                                label: producto.tipo,
                                value: producto.id
                            }]
                        }));
                        _this.setState({
                            disabledTipoProducto: false,
                            loadingTipo: false
                        })
                    });
            });
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores/MiCuenta',
            state: {
                id: this.state.id
            }
        })
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
                <div className="titulosPrincipales">Nuevo producto</div>
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
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["titulo"]) ?
                                    <MDBRow>
                                        <MDBCol md="4">
                                            <div className="mensajeErrorCampos">{this.state.validaciones["titulo"]}</div>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <div className="condicionesInputs">(*) 100 caracteres como máximo</div>
                                        </MDBCol>
                                    </MDBRow>
                                    :
                                    <MDBRow>
                                        <div className="condicionesInputs col-md-8">(*) 100 caracteres como máximo</div>
                                    </MDBRow>
                            }
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
                                    <i className="fa fa-exclamation-circle mensajeErrorForm labelCampoTextarea" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["descripcion"]) ?
                                    <MDBRow>
                                        <MDBCol md="4">
                                            <div className="mensajeErrorCampos">{this.state.validaciones["descripcion"]}</div>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <div className="condicionesInputs">(*) 255 caracteres como máximo</div>
                                        </MDBCol>
                                    </MDBRow>
                                    :
                                    <MDBRow>
                                        <div className="condicionesInputs col-md-8">(*) 255 caracteres como máximo</div>
                                    </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Categoria</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    value={this.state.valueCategoria}
                                    className="selectFormularios col-md-8"
                                    name="categoria"
                                    options={categorias}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambiosSelectCategoria(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["categoria"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["categoria"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["categoria"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>Tipo de producto</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    isLoading={this.state.loadingTipo}
                                    isDisabled={this.state.disabledTipoProducto}
                                    value={this.state.valueTipoProducto}
                                    className="selectFormularios col-md-8"
                                    name="tipo_producto"
                                    options={this.state.tipos_producto}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambioTipoProducto(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["tipo_producto"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["tipo_producto"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["tipo_producto"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Tipo de producción</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    value={this.state.valueTipoProduccion}
                                    className="selectFormularios col-md-8"
                                    name="tipo_produccion"
                                    options={tipoProduccion}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambioTipoProduccion(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["tipo_produccion"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["tipo_produccion"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["tipo_produccion"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <MDBCol md="4">
                            <Form.Label column>*Unidad de venta</Form.Label>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBRow>
                                <Select
                                    value={this.state.valueUnidadVenta}
                                    className="selectFormularios col-md-8"
                                    name="unidad_venta"
                                    options={tipoUnidadVenta}
                                    placeholder="Seleccione un item..."
                                    onChange={(opt, a, value) => this.cambioUnidadDeVenta(opt, a, value)}
                                />
                                {
                                    (this.state.validaciones["unidad_venta"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["unidad_venta"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["unidad_venta"]}</div>
                                </MDBRow>
                            }
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
                                    disabled={this.state.disabledContenido}
                                    maxLength="50"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["contenido"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["contenido"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["contenido"]}</div>
                                </MDBRow>
                            }
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
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["stock"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["stock"]}</div>
                                </MDBRow>
                            }
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
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["precio"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["precio"]}</div>
                                </MDBRow>
                            }
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
                                    min="1"
                                    name="tiempo_preparacion"
                                    onChange={(e) => this.detectarCambios(e)}
                                    className="col-md-8"
                                />
                                {
                                    (this.state.validaciones["tiempo"]) &&
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["tiempo"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["tiempo"]}</div>
                                </MDBRow>
                            }
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
                                    <i className="fa fa-exclamation-circle mensajeErrorForm" />
                                }
                            </MDBRow>
                            {
                                (this.state.validaciones["fecha_vencimiento"]) &&
                                <MDBRow>
                                    <div className="mensajeErrorCampos col-md-8">{this.state.validaciones["fecha_vencimiento"]}</div>
                                </MDBRow>
                            }
                        </MDBCol>
                    </Form.Group>
                    <br />
                    <div>
                        <MDBRow className="justifyContentCenter">
                            <span md="3">*Imágenes</span>
                            {
                                (this.state.validaciones["imagenes"]) &&
                                <i className="fa fa-exclamation-circle mensajeErrorForm" />
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
                            }}
                        />
                        {
                            (this.state.validaciones["imagenes"]) ?
                                <MDBRow center className="cajaImagenesWidth">
                                    <MDBCol md="6">
                                        <div className="mensajeErrorCampos">{this.state.validaciones["imagenes"]}</div>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <div className="condicionesInputs">(*) 5 imágenes como máximo</div>
                                    </MDBCol>
                                </MDBRow>
                                :
                                <MDBRow>
                                    <div className="condicionesInputs col-md-8 cajaImagenesWidth">(*) 5 imágenes como máximo</div>
                                </MDBRow>
                        }
                    </div>
                    <br />
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="light" onClick={() => this.limpiarCampos()}>Limpiar</Button>
                        <Button variant="success" type="submit">Crear</Button>
                    </div>
                </Form>
                {
                    (this.state.resultadoRequest === 200) ?
                        (
                            <MDBModal isOpen={this.state.showModal} centered>
                                <div className="modalMargenes" tabindex="0">
                                    <i className="fas fa-check-circle iconoModalOk" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                    <h5>¿Querés seguir cargando productos?</h5>

                                    <div className="botones">
                                        <Button variant="light" type="submit" onClick={this.cerrarModal}>No</Button>
                                        <Button variant="success" type="submit" onClick={this.cerrarSeguirCargando}>Si</Button>
                                    </div>
                                </div>
                            </MDBModal>
                        ) : (
                            <MDBModal isOpen={this.state.showModal} centered size="sm">
                                <div className="modalMargenes" tabindex="0">
                                    <i className="fas fa-times botonCerrarModal cursorManito" onClick={this.cerrarModalError} />
                                    <br />
                                    <i className="fas fa-exclamation-circle iconoModalError" />
                                    <br />
                                    <br />
                                    <h5>{this.state.mensaje}</h5>
                                </div>
                            </MDBModal>
                        )
                }
            </div>
        );
    };
}

export default NuevoProducto;