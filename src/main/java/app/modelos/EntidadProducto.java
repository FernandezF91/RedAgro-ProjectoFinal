package app.modelos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "Producto")
public class EntidadProducto {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@Column(name="categoria", nullable=false)
	private String categoria;
	
	@Column(name="tipo", nullable=false)
	private String tipo;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadOferta> ofertas = new ArrayList<>();
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadHistorico> historicos = new ArrayList<>();
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadPreferencia> preferencias = new ArrayList<>();
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadProductoProductor> productos_productor = new ArrayList<>();
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadDetalleReserva> detallesReserva = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(long id_producto) {
		this.id = id_producto;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public List<EntidadPreferencia> getPreferencia() {
		return preferencias;
	}

	public void setPreferencia(List<EntidadPreferencia> preferencias) {
		this.preferencias = preferencias;
	}

	public List<EntidadOferta> getOfertas() {
		return ofertas;
	}

	public void setOfertas(List<EntidadOferta> ofertas) {
		this.ofertas = ofertas;
	}

	public List<EntidadPreferencia> getPreferencias() {
		return preferencias;
	}

	public void setPreferencias(List<EntidadPreferencia> preferencias) {
		this.preferencias = preferencias;
	}

	public List<EntidadProductoProductor> getProductos_productor() {
		return productos_productor;
	}

	public void setProductos_productor(List<EntidadProductoProductor> productos_productor) {
		this.productos_productor = productos_productor;
	}

	public List<EntidadHistorico> getHistoricos() {
		return historicos;
	}

	public void setHistoricos(List<EntidadHistorico> historicos) {
		this.historicos = historicos;
	}

	public List<EntidadDetalleReserva> getDetallesReserva() {
		return detallesReserva;
	}

	public void setDetallesReserva(List<EntidadDetalleReserva> detallesReserva) {
		this.detallesReserva = detallesReserva;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	
}
