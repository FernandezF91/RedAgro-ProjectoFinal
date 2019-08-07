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


@Entity
@Table(name = "Producto")
public class EntidadProducto {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column(name="descripcion", nullable=false)
	private String descripcion;
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadOferta> ofertas = new ArrayList<>();
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadHistorico> historicos = new ArrayList<>();
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadPreferencia> preferencias = new ArrayList<>();
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadPreferencia> productos_productor = new ArrayList<>();
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<EntidadDetalleReserva> detallesReserva = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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

	public List<EntidadPreferencia> getProductos_productor() {
		return productos_productor;
	}

	public void setProductos_productor(List<EntidadPreferencia> productos_productor) {
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
	
	
	
}
