package app.clases;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Collections;
//import smile.*;
//import smile.learning.DataSet;
//import smile.learning.TAN;

public class Planificador {
	private String periodo;
	private String provincia;

	public Planificador(String periodo, String provincia) {

		// License issued by BayesFusion Licensing Server
		// This code must be executed before any other jSMILE object is created
		/*new smile.License(
				"SMILE LICENSE bbf3ed59 e15480dc 0cb1f7b5 THIS IS AN ACADEMIC LICENSE AND CAN BE USED "
						+ "SOLELY FOR ACADEMIC RESEARCH AND TEACHING, AS DEFINED IN THE BAYESFUSION ACADEMIC "
						+ "SOFTWARE LICENSING AGREEMENT. Serial #: b1909hjel3g27sswusbdnsib8 "
						+ "Issued for: Eze Bosso (eze.bosso@gmail.com) Academic institution: UTN Buenos Aires "
						+ "Valid until: 2020-04-03 Issued by BayesFusion activation server",
				new byte[] { 19, 64, 38, -112, 31, 90, -102, 57, -47, -11, -111, 16, 11, 93, -66, 106, 47, 69, -53, 127,
						-94, 90, -59, 53, -24, -2, 126, 125, -28, -33, 59, -110, 69, 27, 84, 108, -89, -113, -61, -126,
						82, -25, 109, -89, 39, 4, 4, 111, -10, -62, 23, -81, -128, 118, 86, 32, 124, -46, -116, 103, 48,
						-16, 60, 109 });
*/
		this.setPeriodo(periodo);
		this.setProvincia(provincia);
	}

//	public void crearRed() {
//
//		DataSet ds = new DataSet();
//		ds.readFile("c:/Bayes/BayesCulturaVerde.csv");
//		TAN tanSearch = new TAN();
//		tanSearch.setClassVariableId("Ventas");
//		Network net = tanSearch.learn(ds);
//		net.writeFile("C:/Bayes/BayesCulturaVerde.xdsl");
//	}
	
	
	
//	public List<String> obtenerResultados() {
//
//		Map<Integer, String> Registros = new TreeMap<Integer, String>();
//		List<String> alimentos = new ArrayList<String>();
//		List<String> planificados = new ArrayList<String>();
//
//		Network net = new Network();
//		net.readFile("C:/Bayes/BayesCulturaVerde.xdsl");
//		net.setEvidence("periodo", this.getPeriodo());
//		// System.out.println(this.getPeriodo());
//		net.setEvidence("provincia", this.getProvincia());
//		net.setEvidence("Ventas", "ventasMayor");
//		net.updateBeliefs();
//		double[] lista = net.getNodeValue("tipo");
//
//		for (int i = 0; i < lista.length; i++) {
//			int clave = (int) (lista[i] * 100);
//			Registros.put(clave, net.getOutcomeId("tipo", i));
//		}
//
//		Registros.forEach((k, v) -> alimentos.add(v));
//		Collections.reverse(alimentos);
//		planificados = alimentos.subList(0, 5);
//		System.out.println(planificados);
//		return planificados;
//	}
	
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
//		
//		double[] categorias = { 0.5, 0.5, 0.5, 0.5};
//		net.setNodeDefinition("categoria", categorias);
//		
//		double[] tipos = { 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1};
//		net.setNodeDefinition("tipo", tipos);
//
//		double[] provincias = { 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25 };
//		net.setNodeDefinition("provincia", provincias);
//		
//		
//		net.writeFile("C:/Bayes/net_tut_6_bycode.xdsl");
//
//		
//	}
//	
//	public void run(List<String> lista) {
//
//		String[] strings = lista.stream().toArray(String[]::new);
//		for(int i=0; i < lista.size(); i++) {
//			strings[i] = lista.get(i);
//		}
//		
//        System.out.println("Starting Tutorial1..."+strings);
//        Network net = new Network();
//        net.setName("Cultura Verde");
//        int e = createCptNode(net,"Ventas", "Cantidad de Ventas",new String[] {"baja","media","alta"} ,160, 40);
//
//        int s = createCptNode(net,
//            "categoria", "Categoria de los productos",
//            new String[] {"Frutas","Verduras"},
//            60, 40);
//
//        int f = createCptNode(net,
//            "periodo", "Período de producción anual",
//            new String[] {"Verano","Primavera","Invierno"},
//            110, 140);
// 
//
//        net.addArc(e, s);
//        net.addArc(s, f);
//        // we can also use node identifiers when creating arcs  
//        net.addArc("Ventas", "periodo");
//
//        
//
//        double[] economyDef = {
//
//            0.2, // P(Economy=U)
//            0.7, // P(Economy=F)
//            0.1
//
//        };
//
//        net.setNodeDefinition(e, economyDef);
//
//        
//
//        double[] successDef = new double[] {
//
//            0.3, // P(Success=S|Economy=U)
//
//            0.7, // P(Success=F|Economy=U)
//
//            0.2, // P(Success=S|Economy=F)
//
//            0.8, // P(Success=F|Economy=F)
//
//            0.1, // P(Success=S|Economy=D)
//
//            0.9  // P(Success=F|Economy=D)
//
//        };
//
//        net.setNodeDefinition(s, successDef);
//
//                
//
//        double[] forecastDef = new double[] {
//
//            0.70, // P(Forecast=G|Success=S,Economy=U)
//
//            0.29, // P(Forecast=M|Success=S,Economy=U)
//
//            0.01, // P(Forecast=P|Success=S,Economy=U)
//
//    
//
//            0.65, // P(Forecast=G|Success=S,Economy=F)
//
//            0.30, // P(Forecast=M|Success=S,Economy=F)
//
//            0.05, // P(Forecast=P|Success=S,Economy=F)
//
//    
//
//            0.60, // P(Forecast=G|Success=S,Economy=D)
//
//            0.30, // P(Forecast=M|Success=S,Economy=D)
//
//            0.10, // P(Forecast=P|Success=S,Economy=D)
//
//    
//
//            0.15, // P(Forecast=G|Success=F,Economy=U)
//
//            0.30, // P(Forecast=M|Success=F,Economy=U)
//
//            0.55, // P(Forecast=P|Success=F,Economy=U)
//
//    
//
//            0.10, // P(Forecast=G|Success=F,Economy=F)
//
//            0.30, // P(Forecast=M|Success=F,Economy=F)
//
//            0.60, // P(Forecast=P|Success=F,Economy=F)
//
//    
//
//            0.05, // P(Forecast=G|Success=F,Economy=D)
//
//            0.25, // P(Forecast=G|Success=F,Economy=D)
//
//            0.70  // P(Forecast=G|Success=F,Economy=D)        
//
//        };
//
//        net.setNodeDefinition(f, forecastDef);
//
// 
//
//        net.writeFile("C:/Bayes/tutorial1.xdsl");
//
// 
//
//        System.out.println(
//
//            "Tutorial1 complete: Network written to tutorial1.xdsl");
//
//    }
//
//    
//
//    
//    private static int createCptNode(
//
//            Network net, String id, String name, 
//
//            String[] outcomes, int xPos, int yPos) {
//
//        int handle = net.addNode(Network.NodeType.CPT, id);
//
//        
//
//        net.setNodeName(handle, name);
//
//        net.setNodePosition(handle, xPos, yPos, 85, 55);
//
//        
//
//        int initialOutcomeCount = net.getOutcomeCount(handle); 
//
//        for (int i=0; i < initialOutcomeCount; i ++) {
//
//            net.setOutcomeId(handle, i, outcomes[i]);
//
//        }
//
//        
//
//        for (int i = initialOutcomeCount; i < outcomes.length; i ++) {
//
//            net.addOutcome(handle, outcomes[i]);
//
//        }
//
//        
//
//        return handle;
//
//    }
//	
//    public void tutorial2() {
//
//        System.out.println("Starting Tutorial2...");
//
//        Network net = new Network();
//
//        
//
//        // load the network created by Tutorial1
//
//        net.readFile("C:/Bayes/tutorial1.xdsl");
//
// 
//
//        System.out.println("Posteriors with no evidence set:");
//
//        net.updateBeliefs();
//
//        printAllPosteriors(net);
//
// 
//
//        System.out.println("Setting Forecast=Good.");
//
//        changeEvidenceAndUpdate(net, "periodo", "Verano");
//
// 
//
//        System.out.println("Adding Economy=Up.");
//
//        changeEvidenceAndUpdate(net, "Ventas", "alta");
//
// 
//
//        System.out.println("Changing Forecast to Poor, keeping Economy=Up.");
//
//        changeEvidenceAndUpdate(net, "periodo", "Invierno");
//
// 
//
//        System.out.println(
//
//            "Removing evidence from Economy, keeping Forecast=Poor.");
//
//        changeEvidenceAndUpdate(net, "Ventas", null);
//
// 
//
//        System.out.println("Tutorial2 complete.");
//
//    }
//
//    
//
//    
//
//    private static void printPosteriors(Network net, int nodeHandle) {
//
//        String nodeId = net.getNodeId(nodeHandle);
//
//        if (net.isEvidence(nodeHandle)) {
//
//            System.out.printf("%s has evidence set (%s)\n", 
//
//                nodeId, 
//
//                net.getOutcomeId(nodeHandle, net.getEvidence(nodeHandle)));
//
//        } else {
//
//            double[] posteriors = net.getNodeValue(nodeHandle);
//
//            for (int i = 0; i < posteriors.length; i ++) {
//
//                System.out.printf("P(%s=%s)=%f\n", 
//
//                    nodeId, 
//
//                    net.getOutcomeId(nodeHandle, i),
//
//                    posteriors[i]);
//
//            }
//
//        }
//
//    }
//
// 
//
// 
//
//    private static void printAllPosteriors(Network net) {
//
//        for (int h = net.getFirstNode(); h >= 0; h = net.getNextNode(h)) {
//
//            printPosteriors(net, h);
//
//        }
//
//        System.out.println();
//
//    }
//
// 
//
//    
//
//    private static void changeEvidenceAndUpdate(
//
//            Network net, String nodeId, String outcomeId) {
//
//        if (outcomeId != null) {
//
//            net.setEvidence(nodeId, outcomeId);        
//
//        } else {
//
//            net.clearEvidence(nodeId);
//
//        }
//
//        
//
//        net.updateBeliefs();
//
//        printAllPosteriors(net);
//
//    }

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

//System.out.println(Registros.values());
//System.out.println(Registros.keySet());
//System.out.println(alimentos);
//System.out.println(alimentos);
//
