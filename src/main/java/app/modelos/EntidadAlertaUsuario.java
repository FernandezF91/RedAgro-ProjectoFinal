package app.modelos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "Alerta_usuario")
public class EntidadAlertaUsuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "usuario_id")
	EntidadUsuario usuario;

	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "alerta_id")
	EntidadAlerta alerta;
	
	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "frecuencia_id")
	EntidadAlertaFrecuencia alertaFrecuencia;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public EntidadUsuario getUsuario() {
		return usuario;
	}

	public void setUsuario(EntidadUsuario usuario) {
		this.usuario = usuario;
	}

	public EntidadAlerta getAlerta() {
		return alerta;
	}

	public void setAlerta(EntidadAlerta alerta) {
		this.alerta = alerta;
	}

	public EntidadAlertaFrecuencia getAlertaFrecuencia() {
		return alertaFrecuencia;
	}

	public void setAlertaFrecuencia(EntidadAlertaFrecuencia alertaFrecuencia) {
		this.alertaFrecuencia = alertaFrecuencia;
	}
}
