package app.clases;

import java.io.Serializable;
import java.math.BigInteger; 

public class ResultadosEstadisticas implements Serializable{
	private static final long serialVersionUID = -427725319508134423L;
	private String clave;
	private int segundaClave;
	private BigInteger cantidad;
	
	public String getClave() {
		return clave;
	}
	
	public void setClave(String clave) {
		this.clave = clave;
	}
	
	public int getSegundaClave() {
		return segundaClave;
	}
	
	public void setSegundaClave(int segundaClave) {
		this.segundaClave = segundaClave;
	}
	
	public BigInteger getCantidad() {
		return cantidad;
	}
	
	public void setCantidad(BigInteger cantidad) {
		this.cantidad = cantidad;
	}
	
	public ResultadosEstadisticas() {
		super();
	}

	public ResultadosEstadisticas(String clave, BigInteger cantidad) {
		super();
		this.clave = clave;
		this.cantidad = cantidad;
	}
	
	public ResultadosEstadisticas(String clave, int segundaClave, BigInteger cantidad) {
		super();
		this.clave = clave;
		this.segundaClave = segundaClave;
		this.cantidad = cantidad;
	}
}
