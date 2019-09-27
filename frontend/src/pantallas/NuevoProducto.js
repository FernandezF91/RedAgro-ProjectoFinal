import React, { Component, useState } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import 'moment/locale/es';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import Select from 'react-select';

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
;

const minDate = new Date();
registerPlugin(FilePondPluginImagePreview, FilePondTypeValidate);

const categorias = [
    { label: "Frutas", value: 1 },
    { label: "Verduras", value: 2 },
    { label: "Variado", value: 3 },
    { label: "Otros", value: 4 }
];

const unidades = [
    { label: "Kilos", value: 1 },
    { label: "Bolsones", value: 2 },
];

const tipoProduccion = [
    { label: "Orgánica", value: 1 },
    { label: "Agroecológica", value: 2 },
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
            disabled: false,
            id: this.props.id_productor
        }

        this.featurePond = React.createRef();
        this.mostrarPantallaPrincipal = this.mostrarPantallaPrincipal.bind(this);
        this.obtenerTiposProducto = this.obtenerTiposProducto.bind(this);
        this.validarCampos = this.validarCampos.bind(this);
        this.subirArchivos = this.subirArchivos.bind(this);
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

        if ((!this.state.campos["categoria"]) || (!this.state.campos["tipo_produccion"]) || (!this.state.campos["peso"])
            || (!this.state.campos["stock"]) || (!this.state.campos["precio"])
            || (!this.state.campos["tiempo_preparacion"]) || ((!this.state.campos["descripcion"]) || (this.state.campos["descripcion"].length > 255))
            || ((!this.state.campos["titulo"]) || (this.state.campos["titulo"].length > 100)) || (this.state.files.length === 0) ||
            (!this.state.campos["fecha_ven"] ? false : this.validarFecha())) {

            this.setState({
                visible: true,
                titulo: "Error",
                mensaje: "Campos incompletos o incorrectos"
            });
            return false;
        }
        return true;
    }

    closeModalSeguirCargando() {

        this.setState({ visibleOk: false, formOk: false })

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
        e.preventDefault();

        if (_this.validarCampos()) {

            var path_principal = "http://localhost:3000/redAgro/usuario_productor/nuevo_producto?id_productor=";
            var id_productor = _this.props.id_productor;
            var id_producto = _this.state.campos["tipo_producto"];
            var path_final = path_principal + id_productor + "&id_producto=" + id_producto;

            alert(path_final);

            fetch(path_final, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({

                    "titulo": this.state.campos["titulo"],
                    "descripcion": this.state.campos["descripcion"],
                    "fecha_vencimiento": this.state.campos["fecha_ven"],
                    "precio": this.state.campos["precio"],
                    "stock": this.state.campos["stock"],
                    "peso": this.state.campos["peso"],
                    "tiempo_preparacion": this.state.campos["tiempo_preparacion"],
                    "tipo_produccion": this.state.campos["tipo_produccion"]
                }),
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
                            _this.subirArchivos(response);
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
        campos["peso"] = "";


        this.featurePond.current.getFiles().forEach(file => {

            this.featurePond.current.removeFile(file);
        });

        this.setState({
            campos: campos,
            files: files, valueCat: [], valueTp: [], valueTprod: []
        });


    }


    cambiosSelect(opt, a, value) {


        let campos = this.state.campos;
        campos[a.name] = opt.label;
        this.setState({ campos, valueTprod: value })
    }

    cambiosSelectTipoProducto(opt, a, value) {

        this.setState({ valueTp: value });
        let campos = this.state.campos;
        campos[a.name] = opt.value;
        this.setState({ campos })
    }

    cambiosSelectCategoria(opt, a, value) {

        this.setState({ valueCat: value, valueTp: "", tipos_producto: [], disabled: false });
        let campos = this.state.campos;
        campos[a.name] = opt.label;

        if (this.state.campos["categoria"] === "Variado") {

            this.setState({ disabled: true })

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

                            _this.state.campos["tipo_producto"] = response[0].id

                            return;

                        }

                        response.forEach(producto => _this.setState({
                            tipos_producto: [..._this.state.tipos_producto, {
                                label: producto.tipo,
                                value: producto.id
                            }]
                        }));
                    });
            });
    }

    mostrarPantallaPrincipal() {
        this.props.history.push({
            pathname: '/principalProductores',
            state: { id: this.state.id }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="titulosPrincipales">Nuevo Producto</div>
                <div className="condicionesInputsCO">(*) Campos obligatorios</div>
                <Form ref="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="titulo" >
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Título
									</Form.Label>
                            <Form.Control
                                value={this.state.campos["titulo"]}
                                type="titulo"
                                name="titulo"
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
                            <Select value={this.state.valueCat} className="selectCategoria" name="categoria" options={categorias} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectCategoria(opt, a, value)} />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProducto">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                Tipo de producto
								</Form.Label>
                            <Select isDisabled={this.state.disabled} value={this.state.valueTp} className="selectTipoProducto" name="tipo_producto" options={this.state.tipos_producto} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelectTipoProducto(opt, a, value)} />
                        </Form.Group>
                    </div>
                    <div className="dropdownTipoProduccion">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Tipo de Producción
								</Form.Label>
                            <Select value={this.state.valueTprod} className="selectTipoProduccion" name="tipo_produccion" options={tipoProduccion} placeholder="Seleccione un item..." onChange={(opt, a, value) => this.cambiosSelect(opt, a, value)} />
                        </Form.Group>
                    </div>
                    <div className="peso">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Peso (en kg)
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["peso"]}
                                type="number"
                                name="peso"
                                min="1"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="stock">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Stock
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["stock"]}
                                type="number"
                                name="stock"
                                min="1"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="precio">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Precio
                                </Form.Label>
                            <Form.Control
                                value={this.state.campos["precio"]}
                                type="number"
                                min="1"
                                name="precio"
                                onChange={(e) => this.detectarCambios(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="tiempo_preparacion">
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>
                                *Tiempo de preparación (en días)
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
                        <div className="tituloImagen">
                            *Imágenes
								</div>
                        <FilePond
                            className="cursorCajaArchivos"
                            ref={this.featurePond}
                            allowMultiple={true} maxFiles={5} imagePreviewHeight={150} acceptedFileTypes="image/jpeg, image/png, image/jpg" labelIdle={"Arrastre o suba sus imágenes aquí"}
                            onupdatefiles={(fileItems) => {
                                // Set current file objects to this.state
                                this.setState({
                                    files: fileItems.map(fileItem => fileItem.file)
                                });
                            }} />
                    </div>
                    <div className="condicionesInputsImg">(*) 5 imágenes como máximo</div>
                    <div className="botonesNuevoProducto">
                        <div className="botonAtras">
                            <a onClick={this.mostrarPantallaPrincipal}>
                                <Button variant="success">Cancelar</Button>
                            </a>
                        </div>
                        <div className="botonCrear">
                            <Button variant="success" type="submit">Crear</Button>
                        </div>
                        <div className="botonLimpiar">
                            <Button variant="success" onClick={() => this.limpiarCampos()}>Limpiar</Button>
                        </div>
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
                            <h1>Producto Guardado</h1>
                            <p>¿Querés seguir cargando productos?</p>
                            <Button variant="success" onClick={() => this.closeModalSeguirCargando()}>Si</Button>
                            <Button variant="success" onClick={() => this.closeModal()}>No</Button>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    };
}

export default NuevoProducto;