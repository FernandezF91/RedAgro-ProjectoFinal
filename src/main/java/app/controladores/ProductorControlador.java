package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Usuario;
import app.daos.ProductorDao;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadUsuario;


@RestController
public class ProductorControlador {

	@Autowired
	ProductorDao productorDAO;	
	
	
}
