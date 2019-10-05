package app.clases;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Arrays;
import java.util.HashMap;

import smile.*;

//import smile.Network;

public class Planificador {
	private String periodo;
	private String provincia;
	
	
	public Planificador(String periodo, String provincia){
	
		// License issued by BayesFusion Licensing Server
		// This code must be executed before any other jSMILE object is created
		new smile.License(
			"SMILE LICENSE bbf3ed59 e15480dc 0cb1f7b5 " +
			"THIS IS AN ACADEMIC LICENSE AND CAN BE USED " +
			"SOLELY FOR ACADEMIC RESEARCH AND TEACHING, " +
			"AS DEFINED IN THE BAYESFUSION ACADEMIC " +
			"SOFTWARE LICENSING AGREEMENT. " +
			"Serial #: b1909hjel3g27sswusbdnsib8 " +
			"Issued for: Eze Bosso (eze.bosso@gmail.com) " +
			"Academic institution: UTN Buenos Aires " +
			"Valid until: 2020-04-03 " +
			"Issued by BayesFusion activation server",
			new byte[] {
			19,64,38,-112,31,90,-102,57,-47,-11,-111,16,11,93,-66,106,
			47,69,-53,127,-94,90,-59,53,-24,-2,126,125,-28,-33,59,-110,
			69,27,84,108,-89,-113,-61,-126,82,-25,109,-89,39,4,4,111,
			-10,-62,23,-81,-128,118,86,32,124,-46,-116,103,48,-16,60,109
			}
		);
			
	
		this.setPeriodo(periodo);
		this.setProvincia(provincia);
	}

	
	public List<String> obtenerResultados(){

			Map<Long, String> Registros = new TreeMap<Long, String>(); 
			Network net = new Network();
			net.readFile("C:/Bayes/RedBayesProduccion.xdsl");
			net.setEvidence("periodo", this.getPeriodo());
			System.out.println(this.getPeriodo());
			net.setEvidence("provincia",this.getProvincia());
			net.setEvidence("Ventas", "ventasMayor");
			net.updateBeliefs();
			double[] lista = net.getNodeValue("Alimento");
			List<String> listaNombres= new ArrayList<String>();
			double[] listaOrdenada = net.getNodeValue("Alimento");
			List<String> listaNombresOrd= new ArrayList<String>();
			//Arrays.sort(lista);
			List<String> alimentos = new ArrayList<String>();
			int j=0;
			for (int i = 0 ; i<lista.length ; i++) {
				listaNombres.add(net.getOutcomeId("Alimento", i));
				long myBill = (int)(lista[i]*100);
				Registros.put(myBill, net.getOutcomeId("Alimento", i));
				//System.out.println(listaNombres.get(i) + " = " + (int)(lista[i]*100));
				
			}
				System.out.println(Registros.values());
				System.out.println(Registros.keySet());
			for (int i = lista.length - 1 ; i>=0 ; i--) {
//				System.out.println(
//						net.getOutcomeId("Alimento", i) + " = " + lista[i]);
				listaOrdenada[j] = lista[i];
				j++;
			}
			
//			for (int i = 0; i<5 ; i++) {
//			alimentos.add(net.getOutcomeId("Alimento", i) );
//			}
//			
//			System.out.println(alimentos);
			return alimentos;
	}


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

