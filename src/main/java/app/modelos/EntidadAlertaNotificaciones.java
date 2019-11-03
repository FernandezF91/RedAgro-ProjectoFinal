package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Alerta_Notificaciones")

public class EntidadAlertaNotificaciones {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	private EntidadUsuario usuario;

	@OneToOne
	@JoinColumn(name = "alerta_id", nullable = false)
	private EntidadAlerta alerta;
	
	@Column(name="tipo", nullable=false)
	private String tipo;
	
	@Column(name="titulo", nullable=false)
	private String titulo;
	
	@Column(name="descripcion", nullable=false)
	private String descripcion;
	
	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public EntidadUsuario getUsuario() {
		return usuario;
	}

	public void setUsuario(EntidadUsuario usuario) {
		this.usuario = usuario;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public EntidadAlerta getAlerta() {
		return alerta;
	}

	public void setAlerta(EntidadAlerta alerta) {
		this.alerta = alerta;
	}
}
