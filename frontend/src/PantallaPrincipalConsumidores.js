//este import para cabecera
import './PantallaPrincipalConsumidores.css';
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import culturaVerde from './cultura-verde.png';
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
						<div className="ListadoDesplegablemicuenta">
							<Dropdown>
  								<Dropdown.Toggle variant="success" id="dropdown-basic">
    								Usuario
  								</Dropdown.Toggle>
  								<Dropdown.Menu>
    								<Dropdown.Item href="">Mi cuenta</Dropdown.Item>
    								<Dropdown.Item href="/login">Salir</Dropdown.Item>
  								</Dropdown.Menu>
							</Dropdown>		
						</div>
					</Navbar>
				</div>

				<div className="menuConsumidor">
					<nav>
       	 				<ul>
            				<li><a href="#">Mi cuenta</a></li>
							<li><a href="#">Reservas</a></li>
							<li><a href="#">Alertas</a></li>
							<li><a href="#">Preferencias</a></li>
            				<li><a href="#">Comprar</a>
								<ul>
                					<li><a href="#">Geolocalizacion</a></li>
                					<li><a href="#">Categorias</a></li>
            					</ul>
							</li>
            				<li><a href="#">Configuracion</a>
								<ul>
                					<li><a href="/login">editar datos usuario</a></li>
                					<li><a href="/login">modificar contraseña</a></li>
            					</ul>
							</li>
        				</ul>
					</nav>
				</div>
			</body>
		);	
	};		
}

export default PantallaPrincipalconsumidores;