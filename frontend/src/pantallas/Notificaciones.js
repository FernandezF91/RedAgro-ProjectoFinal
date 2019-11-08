import React from "react";
import '../diseños/Notificaciones.css';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
const Notificaciones = (props) => {
    return (

        <UncontrolledPopover trigger="legacy" placement="bottom" target="notificaciones">
            {
                props.listado.length > 0 ?
                    props.listado.map((item, index) => (
                        <div>
                            <PopoverHeader className="notiHeader">{item.titulo}</PopoverHeader>
                            <PopoverBody>{item.descripcion} </PopoverBody>
                        </div>
                    ))
                    :
                    <div>
                        <PopoverHeader>Notificaciones</PopoverHeader>
                        <PopoverBody>No hay nada nuevo por aquí.</PopoverBody>
                    </div>
            }
        </UncontrolledPopover>
    )
}
export default Notificaciones;