package app.clases;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import java.util.Collections;
import smile.*;
import smile.learning.DataSet;
import smile.learning.TAN;

public class Planificador {
	private String periodo;
	private String provincia;

	public Planificador(String periodo, String provincia) {
		this.setPeriodo(periodo);
		this.setProvincia(provincia);
	}

	public boolean crearRed() {
		boolean red_ok = false;
		
		DataSet ds = new DataSet();		
			
			try{
				
				ds.readFile("c:/Bayes/BayesCulturaVerde.csv");
			}
			catch(SMILEException e) {
				
				return red_ok;
				
			}
				
			TAN tanSearch = new TAN();
			tanSearch.setClassVariableId("Ventas");
			Network net = tanSearch.learn(ds);
			net.writeFile("C:/Bayes/BayesCulturaVerde.xdsl");
					
			red_ok = true;
			
			return red_ok;
	}
	
	
	public List<String> obtenerResultados() {
		Map<Integer, String> Registros = new TreeMap<Integer, String>();
		List<String> alimentos = new ArrayList<String>();
		List<String> planificados = new ArrayList<String>();

		Network net = new Network();
		net.readFile("C:/Bayes/BayesCulturaVerde.xdsl");
		net.setEvidence("periodo", this.getPeriodo());
		
		// System.out.println(this.getPeriodo());
		
		try{net.setEvidence("provincia", this.getProvincia());}
		catch (smile.SMILEException e) {
			while(alimentos.size()<5)
				{
					alimentos.add("No hay productos para mostrar");
				}
			planificados = alimentos.subList(0, 5);
			System.out.println(planificados);
			return planificados;
		}
				
		
		net.setEvidence("Ventas", "ventasMayor");
		net.updateBeliefs();
		double[] lista = net.getNodeValue("tipo");
		//System.out.println(lista);
		for (int i = 0; i < lista.length; i++) {
			int clave = (int) (lista[i] * 100);
			Registros.put(clave, net.getOutcomeId("tipo", i));
		}

		Registros.forEach((k, v) -> alimentos.add(v));

		System.out.println(Registros);

		Collections.reverse(alimentos);
		if(alimentos.size()>4) {
			planificados = alimentos.subList(0, 5);
			System.out.println(planificados);
			return planificados;		
			} else {
			while(alimentos.size()<5)
				{
				alimentos.add("No hay productos para mostrar");
				}
		}
		
		planificados = alimentos.subList(0, 5);
		System.out.println(planificados);
		return planificados;	
	}
	
	
//	public void escribirResultados() {
//		Network net = new Network();
//
//		String[] nodes = { "Ventas", "periodo", "provincia", "tipo", "categoria" };
//		int nbSlices = 5;
//
//		for (String n : nodes) {
//		net.addNode(Network.NodeType.CPT, n);
//		net.setOutcomeId(n, 0, "f");
//		net.setOutcomeId(n, 1, "t");
//		//net.setOutcomeId(n, 2, "p");
//		//net.setNodeTemporalType(n, Network.NodeTemporalType.Plate);
//		}
//		net.setSliceCount(nbSlices);
//		net.addArc("Ventas", "periodo");
//		net.addArc("Ventas", "provincia");
//		net.addArc("Ventas", "tipo");
//		net.addArc("Ventas", "categoria");
//		net.addArc("categoria", "tipo");
//		net.addArc("tipo", "provincia");
//		net.addArc("tipo", "periodo");
//		//net.addTemporalArc("A", "A", 1);
//
//		double[] ventas = { 0.33, 0.33 };
//		net.setNodeDefinition("Ventas", ventas);
//		double[] categorias = { 0.5, 0.5, 0.5, 0.5};
//		net.setNodeDefinition("categoria", categorias);
//		double[] tipos = { 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1};
//		net.setNodeDefinition("tipo", tipos);
//		double[] provincias = { 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25 };
//		net.setNodeDefinition("provincia", provincias);
//	
//		net.writeFile("C:/Bayes/net_tut_6_bycode.xdsl");
//	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}
	
		
}