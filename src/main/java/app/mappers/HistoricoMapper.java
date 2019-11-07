package app.mappers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import app.modelos.EntidadHistorico;
import app.modelos.EntidadProducto;
import app.modelos.EntidadProductor;

public class HistoricoMapper {

	@SuppressWarnings("resource")
	public ArrayList<EntidadHistorico> mapToEntity	(MultipartFile multiPartFile) throws IOException {
		String row;
		File file = convertMultiPartToFile(multiPartFile);
		BufferedReader csvReader = new BufferedReader (new FileReader (file));
		ArrayList<EntidadHistorico> historicos = new ArrayList<EntidadHistorico>();
		while ((row = csvReader.readLine()) != null) {
		    String[] data = row.split(",");
			EntidadHistorico entidad = new EntidadHistorico ();
			entidad.setCategoria(data[0]);
			entidad.setTipo_producto(data[1]);
			entidad.setCantidad_vendida(Integer.parseInt(data[2]));
			entidad.setMes(Integer.parseInt(data[3]));
			entidad.setZona(data[4]);
//			EntidadProducto producto = new EntidadProducto();
//			producto.setId(Integer.parseInt(data[3]));
//			entidad.setProducto(producto);
//			EntidadProductor productor = new EntidadProductor();
//			producto.setId(Integer.parseInt(data[4]));
//			entidad.setProductor(productor);
		    
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
	private static final String CSV_SEPARATOR = ",";
	private static String mes;
    public void escribirCsv(List<EntidadHistorico> list)
    {
    	
        try
        {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
            		new FileOutputStream("c:/Bayes/BayesCulturaVerde.csv"), "UTF-8"));
            //titulos
            StringBuffer titulos = new StringBuffer();
            titulos.append("categoria"); titulos.append(CSV_SEPARATOR);
            titulos.append("tipo"); titulos.append(CSV_SEPARATOR);
            titulos.append("provincia"); titulos.append(CSV_SEPARATOR);
            titulos.append("periodo"); titulos.append(CSV_SEPARATOR);
            titulos.append("Ventas"); titulos.append(CSV_SEPARATOR);
            bw.write(titulos.toString());
            bw.newLine();
            
            for (EntidadHistorico historico : list)
            {
            	switch (historico.getMes()) {
            	  case 12:mes="Verano";break;
            	  case 1:mes="Verano";break;
            	  case 2:mes="Verano";break;
            	  case 3:mes="Otono";break;
            	  case 4:mes="Otono";break;
            	  case 5:mes="Otono";break;
            	  case 6:mes="Invierno";break;
            	  case 7:mes="Invierno";break;
            	  case 8:mes="Invierno";break;
            	  case 9:mes="Primavera";break;
            	  case 10:mes="Primavera";break;
            	  case 11:mes="Primavera";break;
            	}
            	
                StringBuffer oneLine = new StringBuffer();
                oneLine.append(historico.getCategoria());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(historico.getTipo_producto());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(historico.getZona());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(mes);
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(historico.getCantidad_vendida() > 600 ? "ventasMayor": "ventasModeradas");
                oneLine.append(CSV_SEPARATOR);
                bw.write(oneLine.toString());
                bw.newLine();
            }
            bw.flush();
            bw.close();
        }
        catch (UnsupportedEncodingException e) {}
        catch (FileNotFoundException e){}
        catch (IOException e){}
    }
}