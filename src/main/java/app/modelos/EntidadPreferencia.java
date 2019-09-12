package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Preferencia")
public class EntidadPreferencia {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	@ManyToOne()
    @JoinColumn(name = "consumidor_id", nullable = false)
    private EntidadConsumidor consumidor;
	
	@ManyToOne()
    @JoinColumn(name = "producto_id", nullable = false)
    private EntidadProducto producto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadConsumidor getConsumidor() {
		return consumidor;
	}

	public void setConsumidor(EntidadConsumidor consumidor) {
		this.consumidor = consumidor;
	}

	public EntidadProducto getProducto() {
		return producto;
	}

	public void setProducto(EntidadProducto producto) {
		this.producto = producto;
	}
	
	
}
