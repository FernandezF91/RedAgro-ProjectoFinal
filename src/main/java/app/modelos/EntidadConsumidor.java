package app.modelos;

import java.util.ArrayList;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Consumidor")
public class EntidadConsumidor {

	@Id
	@Column(name = "id")
	private long id;

	@JsonIgnore
	@OneToOne
	@MapsId
	private EntidadUsuario usuario;

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "consumidor", cascade = CascadeType.ALL)
	private List<EntidadPreferencia> preferencia = new ArrayList<>();

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "consumidor", cascade = CascadeType.ALL)
	private List<EntidadReserva> reservas = new ArrayList<>();

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "consumidor", cascade = CascadeType.ALL)
	private List<EntidadCalificacion> calificaciones = new ArrayList<>();

	public EntidadUsuario getUsuario() {
		return usuario;
	}

	public void setUsuario(EntidadUsuario usuario) {
		this.usuario = usuario;

	}

	public List<EntidadPreferencia> getPreferencia() {
		return preferencia;
	}

	public void setPreferencia(List<EntidadPreferencia> preferencia) {
		this.preferencia = preferencia;
	}

	public List<EntidadCalificacion> getCalificaciones() {
		return calificaciones;
	}

	public void setCalificaciones(List<EntidadCalificacion> calificaciones) {
		this.calificaciones = calificaciones;
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
}
