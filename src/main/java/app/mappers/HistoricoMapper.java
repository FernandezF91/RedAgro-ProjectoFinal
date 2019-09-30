package app.mappers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.web.multipart.MultipartFile;

import antlr.collections.List;
import app.modelos.EntidadHistorico;
import app.modelos.EntidadProducto;
import app.modelos.EntidadProductor;

public class HistoricoMapper {

	public ArrayList<EntidadHistorico> mapToEntity	(MultipartFile multiPartFile) throws IOException {
		String row;
		File file = convertMultiPartToFile(multiPartFile);
		BufferedReader csvReader = new BufferedReader (new FileReader (file));
		ArrayList<EntidadHistorico> historicos = new ArrayList<EntidadHistorico>();
		while ((row = csvReader.readLine()) != null) {
		    String[] data = row.split(",");
			EntidadHistorico entidad = new EntidadHistorico ();
			entidad.setCantidad_vendida( Integer.parseInt(data[0]));
			EntidadProducto producto = new EntidadProducto();
			producto.setId(Integer.parseInt(data[3]));
			entidad.setProducto(producto);
			EntidadProductor productor = new EntidadProductor();
			producto.setId(Integer.parseInt(data[4]));
			entidad.setProductor(productor);
		    
			historicos.add(entidad);
		}
		
		return historicos;
	}

	private File convertMultiPartToFile(MultipartFile file ) throws IOException
    {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
        
    }
}