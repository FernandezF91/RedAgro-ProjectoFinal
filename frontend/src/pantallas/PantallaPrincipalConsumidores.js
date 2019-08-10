//este import para cabecera
import '../diseños/PantallaPrincipalConsumidores.css';
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

//imagenes para barra
import culturaVerde from '../imagenes/cultura-verde-2.png';
import usuario from '../imagenes/usuario.png';
import carrito from '../imagenes/carrito.png';

//imagenes para menu desplegable
import miCuenta from '../imagenes/Micuenta.png'
import campanalertas from '../imagenes/campanalertas.png';
import configuracion from '../imagenes/configuracion.png';
import reservas from '../imagenes/reservas.png';
import compras from '../imagenes/compras.png';
import preferencias from '../imagenes/preferencias.png';
import flechadespliegaderecha from '../imagenes/flechadespliegaderecha.png';
import flechadespliegabajo from '../imagenes/flechadespliegabajo.png';



import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


class PantallaPrincipalconsumidores extends Component {

	render() {

		return (
			

			<body>
				
				<div className="barraNavegacion">
					<Navbar>
						<img src={culturaVerde} width="130px" height="50px"></img>
						<div className="barraBusqueda">
							<Form.Control size="sm" type="barra" placeholder="Buscar productos y productores.. "/>						
						</div>
						<div className="imagenUsuario">
							<img src={usuario} width="30px" height="30px"></img>	
						</div>
						<div className="menuUsuario">
							<navuser>
       	 						<uluser>
									<liuser><a href="#"> Usuario <img src={flechadespliegabajo} width="10px" height="10px"></img></a>
										<uluser>
                							<liuser><a href="#">Mi cuenta</a></liuser>
                							<liuser><a href="/login">Salir</a></liuser>
            							</uluser>
									</liuser>
            					</uluser>
							</navuser>
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
            				<li><a href="#"><img src={miCuenta} width="30px" height="25px"></img> Mi cuenta</a></li>
							<li><a href="#"><img src={reservas} width="30px" height="25px"></img> Reservas</a></li>
							<li><a href="#"><img src={campanalertas} width="30px" height="30px"></img> Alertas</a></li>
							<li><a href="#"><img src={preferencias} width="30px" height="19px"></img> Preferencias</a></li>
            				<li><a href="#"><img src={compras} width="30px" height="19px"></img> Comprar <img src={flechadespliegaderecha} width="10px" height="10px"></img></a>
								<ul>
                					<li><a href="#">Geolocalizacion</a></li>
                					<li><a href="#">Categorias</a></li>
            					</ul>
							</li>
            				<li><a href="#"><img src={configuracion} width="30px" height="25px"></img> Configuracion <img src={flechadespliegaderecha} width="10px" height="10px"></img></a>
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