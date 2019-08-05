//este import para cabecera
import './PantallaPrincipalConsumidores.css';
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

//imagenes para barra
import culturaVerde from './cultura-verde.png';
import usuario from './usuario.png';
import carrito from './carrito.png';

//imagenes para menu desplegable
import Micuenta from './Micuenta.png';
import campanalertas from './campanalertas.png';
import configuracion from './configuracion.png';
import reservas from './reservas.png';
import compras from './compras.png';
import preferencias from './preferencias.png';
import flechadespliegaderecha from './flechadespliegaderecha.png';



import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';


class PantallaPrincipalconsumidores extends Component {

	render() {

		return (
			

			<body>
				
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="150px" height="60px"></img>
						<div className="barraBusqueda">
							<Form.Control size="sm" type="barra" placeholder="Buscar productos y productores.. "/>						
						</div>
						<div className="imagenUsuario">
							<img src={usuario} width="30px" height="30px"></img>	
						</div>

						<div className="imagencampanaalertas">
							<img src={campanalertas} width="50px" height="50px"></img>	
						</div>
						<div className="imagencarrito">
							<img src={carrito} width="40px" height="40px"></img>	
						</div>
					</Navbar>
				</div>

				<Container fluid className="contenedor">	
					<div className="menuConsumidor">
					<nav>
       	 				<ul>
            				<li><a href="#"><img src={Micuenta} width="30px" height="25px"></img> Mi cuenta</a></li>
							<li><a href="#"><img src={reservas} width="30px" height="25px"></img> Reservas</a></li>
							<li><a href="#"><img src={campanalertas} width="30px" height="30px"></img> Alertas</a></li>
							<li><a href="#"><img src={preferencias} width="30px" height="19px"></img> Preferencias</a></li>
            				<li><a href="#"><img src={compras} width="30px" height="19px"></img> Comprar <img src={flechadespliegaderecha} width="10px" height="10px" position = "rigth" ></img></a>
								<ul>
                					<li><a href="#">Geolocalizacion</a></li>
                					<li><a href="#">Categorias</a></li>
            					</ul>
							</li>
            				<li><a href="#"><img src={configuracion} width="30px" height="25px"></img> Configuracion</a>
								<ul>
                					<li><a href="/login">editar datos usuario</a></li>
                					<li><a href="/login">modificar contraseña</a></li>
            					</ul>
							</li>
        				</ul>
					</nav>
				</div>
				</Container>	
			</body>

		);	
	};		
}

export default PantallaPrincipalconsumidores;