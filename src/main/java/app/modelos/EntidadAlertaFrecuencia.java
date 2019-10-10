package app.modelos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Alerta_frecuencia")
public class EntidadAlertaFrecuencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "frecuencia", nullable = false)
	private String frecuencia;

	@OneToMany(mappedBy = "alerta")
	private List<EntidadAlertaUsuario> alerta_usuario = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<EntidadAlertaUsuario> getAlertas_frecuencia() {
		return alerta_usuario;
	}

	public void setAlertas_frecuencia(List<EntidadAlertaUsuario> alerta_frecuencia) {
		this.alerta_usuario = alerta_usuario;
	}

	public String getFrecuencia() {
		return frecuencia;
	}

	public void setFrecuencia(String frecuencia) {
		this.frecuencia = frecuencia;
	}
}
