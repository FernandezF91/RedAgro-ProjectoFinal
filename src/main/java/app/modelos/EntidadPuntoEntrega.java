package app.modelos;

import java.util.ArrayList;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Punto_entrega")
public class EntidadPuntoEntrega {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@ManyToOne()
    @JoinColumn(name = "productor_id", nullable = false)
    private EntidadProductor productor;
	
	@OneToMany(mappedBy = "punto_entrega", cascade = CascadeType.ALL)
    private List<EntidadFechaEntrega> fechas_entrega = new ArrayList<>();
	
	@OneToMany(mappedBy = "punto_entrega", cascade = CascadeType.ALL)
    private List<EntidadReserva> reservas = new ArrayList<>();
	
	@Column(name = "pais", nullable = false)
    private String pais;

	@Column(name = "provincia", nullable = false)
    private String provincia;
	
	@Column(name = "localidad", nullable = false)
    private String localidad;
	
	@Column(name = "cod_postal", nullable = false)
    private int cod_postal;
	
	@Column(name = "direccion", nullable = false)
    private String direccion;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public int getCod_postal() {
		return cod_postal;
	}

	public void setCod_postal(int cod_postal) {
		this.cod_postal = cod_postal;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public List<EntidadFechaEntrega> getFechas_entrega() {
		return fechas_entrega;
	}

	public void setFechas_entrega(List<EntidadFechaEntrega> fechas_entrega) {
		this.fechas_entrega = fechas_entrega;
	}

	public List<EntidadReserva> getReservas() {
		return reservas;
	}

	public void setReservas(List<EntidadReserva> reservas) {
		this.reservas = reservas;
	}
	
	

}
