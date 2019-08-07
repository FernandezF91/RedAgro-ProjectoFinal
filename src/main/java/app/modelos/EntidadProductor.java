package app.modelos;

import java.util.ArrayList;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity
@Table(name = "Productor")
public class EntidadProductor{

	@Id
    private long id;
		
	@OneToOne
    @JoinColumn(name = "id")
    @MapsId
    private EntidadUsuario usuario;
	
	@OneToOne(mappedBy = "productor")
    private EntidadPerfil perfil;
	
	@OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
    private List<EntidadHistorico> historicos = new ArrayList<>();
	
	@OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
    private List<EntidadOferta> ofertas = new ArrayList<>();
	
	@OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
    private List<EntidadCalificacion> calificaciones = new ArrayList<>();
	
	@OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
    private List<EntidadProductoProductor> productos = new ArrayList<>();
	        
	    @OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
	    private List<EntidadZona> zonas = new ArrayList<>();
    
	    @OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
	    private List<EntidadPuntoEntrega> puntos_entrega = new ArrayList<>();
	    
	    @OneToMany(mappedBy = "productor", cascade = CascadeType.ALL)
	    private List<EntidadReserva> reservas = new ArrayList<>();
	    
	    @Column(name = "razon_social", nullable = false)
	    private String razon_social;
	    
	public String getRazon_social() {
			return razon_social;
		}

		public void setRazon_social(String razon_social) {
			this.razon_social = razon_social;
		}

		public EntidadUsuario getUsuario() {
			return usuario;
		}

		public void setUsuario(EntidadUsuario usuario) {
			this.usuario = usuario;
		}

		public List<EntidadZona> getZonas() {
			return zonas;
		}

		public void setZonas(List<EntidadZona> zonas) {
			this.zonas = zonas;
		}

		public List<EntidadPuntoEntrega> getPuntos_entrega() {
			return puntos_entrega;
		}

		public void setPuntos_entrega(List<EntidadPuntoEntrega> puntos_entrega) {
			this.puntos_entrega = puntos_entrega;
		}

		public List<EntidadCalificacion> getCalificaciones() {
			return calificaciones;
		}

		public void setCalificaciones(List<EntidadCalificacion> calificaciones) {
			this.calificaciones = calificaciones;
		}

		public List<EntidadProductoProductor> getProductos() {
			return productos;
		}

		public void setProductos(List<EntidadProductoProductor> productos) {
			this.productos = productos;
		}

		public List<EntidadOferta> getOfertas() {
			return ofertas;
		}

		public void setOfertas(List<EntidadOferta> ofertas) {
			this.ofertas = ofertas;
		}

		public List<EntidadHistorico> getHistoricos() {
			return historicos;
		}

		public void setHistoricos(List<EntidadHistorico> historicos) {
			this.historicos = historicos;
		}

		public List<EntidadReserva> getReservas() {
			return reservas;
		}

		public void setReservas(List<EntidadReserva> reservas) {
			this.reservas = reservas;
		}

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public EntidadPerfil getPerfil() {
			return perfil;
		}

		public void setPerfil(EntidadPerfil perfil) {
			this.perfil = perfil;
		}		
		
		
}
