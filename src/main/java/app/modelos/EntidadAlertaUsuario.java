package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "Alerta_usuario")
public class EntidadAlertaUsuario {
	
	@Id
	@Column(name = "id")
    private long id;
	
	@ManyToOne
    @MapsId("id")
    @JoinColumn(name = "usuario_id")
    EntidadUsuario usuario;
 
    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "alerta_id")
    EntidadAlerta alerta;
    
    @Column(name="frecuencia")
    private String frecuencia;

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

	public String getFrecuencia() {
		return frecuencia;
	}

	public void setFrecuencia(String frecuencia) {
		this.frecuencia = frecuencia;
	}
       

}
