import React, { Component } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import Select from 'react-select';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from 'react-loader-spinner';

import '../diseños/nuevoProducto.css';
import '../diseños/estilosGlobales.css';
import Modal from 'react-awesome-modal';

import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondTypeValidate from "filepond-plugin-file-validate-type";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'; import { isDate } from 'moment';

const minDate = new Date();

const regularExp = {
    numerosDecimales: /^[0-9]*(\,[0-9]{0,2})?$/
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
            titulo: "",
            visible: false,
            mensaje: "",
            tipos_producto: [],
            formOk: false,
            visibleOk: false,
            valueCat: [],
            valueTp: [],
            valueTprod: [],
            valueUnidadVenta: [],
            disabled: true,
            disabled2: false,
            id: this.props.id_productor,
            loading: true,
            showModal: false
        }

        this.featurePond = React.createRef();
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.obtenerTiposProducto = this.obtenerTiposProducto.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.subirArchivos = this.subirArchivos.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    cerrarModal() {
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

    validarFecha() {
        return !isDate(this.state.campos["fecha_ven"]);
    }

    validarCampos() {
        if ((!this.state.campos["categoria"]) || (!this.state.campos["tipo_produccion"]) || (!this.state.campos["unidad_venta"])
            || (!this.state.campos["stock"]) || (!this.state.campos["precio"]) || (!regularExp.numerosDecimales.test(this.state.campos["precio"]))
            || (!isNaN((this.state.campos["precio"])) && (this.state.campos["precio"]) < 1)
            || (this.state.campos["categoria"] !== "Variado" ? !this.state.campos["tipo_producto"] : false)
            || (!this.state.campos["descripcion"]) || (!this.state.campos["titulo"]) || (this.state.files.length === 0) ||
            (!this.state.campos["fecha_ven"] ? false : this.validarFecha())) {

            this.setState({
                visible: true,
                titulo: "Error",
                mensaje: "Campos incompletos o incorrectos",
                loading: false
            });
            return false;
        }
        return true;
    }

    closeModalSeguirCargando() {
        this.setState({
            visibleOk: false,
            formOk: false,
            disabled: false,
            disabled2: false
        });
        this.limpiarCampos();
    }

    closeModal() {
        if (this.state.formOk === true) {
            this.mostrarPantallaPrincipal();
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
                "fecha_vencimiento": this.state.campos["fecha_ven"],
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
                            visible: true,
                            titulo: "Error",
                            mensaje: "Ocurrió algún error inesperado. Intenta nuevamente",
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
            formOk: true,
            visibleOk: true
        });
    }

    cambiosFecha(e) {
        let campos = this.state.campos;
        campos["fecha_ven"] = e;
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
        campos["fecha_ven"] = "";
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
            valueCat: [],
            valueTp: [],
            valueTprod: [],
            valueUnidadVenta: []
        });
    }

    cambiosSelectTprod(opt, a, value) {
        let campos = this.state.campos;
        campos[a.name] = opt.label;
        this.setState({
            campos,
            valueTprod: value
        })
    }

    cambiosSelectUnidadV(opt, a, value) {
        let campos = this.state.campos;
        campos[a.name] = opt.label;

        this.setState({
            campos,
            valueUnidadVenta: value,
            disabled2: false
        })

        if (this.state.campos["unidad_venta"] === "Kilogramo") {

            this.setState({
                disabled2: true
            });

        }
    }

    cambiosSelectTipoProducto(opt, a, value) {
        this.setState({
            valueTp: value
        });
        let campos = this.state.campos;
        campos[a.name] = opt.value;
        this.setState({
            campos
        })
    }

    cambiosSelectCategoria(opt, a, value) {
        this.setState({
            valueCat: value,
            valueTp: "",
            tipos_producto: [],
            loadingTipo: true
        });
        let campos = this.state.campos;
        campos[a.name] = opt.label;

        if (this.state.campos["categoria"] === "Variado") {
            this.setState({
                disabled: true,
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
                        visible: true,
                        titulo: "Error",
                        mensaje: "Ocurrió algún error inesperado. Intenta nuevamente"
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
                            disabled: false,
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
                <div className="titulosPrincipales">Nuevo producto</div>
                <div className="condicionesInputsCO">(*) Campos obligatorios</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="titulo">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>*Título</Form.Label>
                            <Form.Control
                                value={this.state.campos["titulo"]}
                                type="titulo"
                                name="titulo"
                                maxLength="100"
                                onChange={(e) => this.detectarCambios(e)}
                            />
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
                        </Form.Group>
                        <div className="condicionesInputs">(*) 255 caracteres como máximo</div>
                    </div>
                    <div className="dropdownCategoria">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Categoria
								</Form.Label>
                            <Select
                                value={this.state.valueCat}
                                className="selectCategoria"
                                name="categoria"
                                options={categorias}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectCategoria(opt, a, value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProducto">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Tipo de producto
								</Form.Label>
                            <Select
                                isLoading={this.state.loadingTipo}
                                isDisabled={this.state.disabled}
                                value={this.state.valueTp}
                                className="selectTipoProducto"
                                name="tipo_producto"
                                options={this.state.tipos_producto}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectTipoProducto(opt, a, value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProduccion">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Tipo de Producción
								</Form.Label>
                            <Select
                                value={this.state.valueTprod}
                                className="selectTipoProduccion"
                                name="tipo_produccion"
                                options={tipoProduccion}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectTprod(opt, a, value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="unidad_venta">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Unidad de venta
                                </Form.Label>
                            <Select
                                value={this.state.valueUnidadVenta}
                                className="selectTipoUnidad"
                                name="unidad_venta"
                                options={tipoUnidadVenta}
                                placeholder="Seleccione un item..."
                                onChange={(opt, a, value) => this.cambiosSelectUnidadV(opt, a, value)}
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
                                disabled={this.state.disabled2}
                                maxLength="50"
                                onChange={(e) => this.detectarCambios(e)}
                            />
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
                                min="1"
                                name="tiempo_preparacion"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="fechaVencimiento">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Fecha de vencimiento
                                </Form.Label>
                            <DatePickerInput
                                name="fecha_ven"
                                displayFormat='DD/MM/YYYY'
                                minDate={minDate}
                                className="calen"
                                value={this.state.campos["fecha_ven"]}
                                onChange={(e) => this.cambiosFecha(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="imagenes">
                        <div className="tituloImagen">*Imágenes</div>
                        <FilePond
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
                    <div className="botones">
                        <Button variant="light" onClick={this.mostrarPantallaPrincipal}>Cancelar</Button>
                        <Button variant="light" onClick={() => this.limpiarCampos()}>Limpiar</Button>
                        <Button variant="success" type="submit">Crear</Button>
                    </div>
                </Form>
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="120"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div>
                            <h1>{this.state.titulo}</h1>
                            <p>{this.state.mensaje}</p>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Volver</a>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.visibleOk}
                        width="400"
                        height="160"
                        effect="fadeInUp"
                    >
                        <div>
                            <h1>Producto guardado</h1>
                            <p>¿Querés seguir cargando productos?</p>
                            <Button variant="light" onClick={() => this.closeModal()}>No</Button>
                            <Button variant="success" onClick={() => this.closeModalSeguirCargando()}>Si</Button>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}

export default NuevoProducto;