package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import app.daos.ProductorDao;

@RestController
public class ProductorControlador {

	@Autowired
	ProductorDao productorDAO;	
	
	
}
