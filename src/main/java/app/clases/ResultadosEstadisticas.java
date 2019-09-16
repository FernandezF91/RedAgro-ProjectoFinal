package app.clases;

import java.io.Serializable;
import java.math.BigInteger; 

public class ResultadosEstadisticas implements Serializable{
	private static final long serialVersionUID = -427725319508134423L;
	private String clave;
	private BigInteger cantidad;
	
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
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
}
