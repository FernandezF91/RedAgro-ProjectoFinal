package app.modelos;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
//import javax.persistence.Inheritance;
//import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "Usuario")
public class EntidadUsuario {

	    @Id
	    @GeneratedValue(strategy=GenerationType.IDENTITY)
	    @Column(name = "id")
	    private Long id;
	    
	    @OneToOne(mappedBy = "usuario")
	    private EntidadConsumidor consumidor;
	    
	    @OneToOne(mappedBy = "usuario")
	    private EntidadProductor productor;
	    
	    @Fetch(FetchMode.JOIN)
	    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	    private List<EntidadAlerta> alertas = new ArrayList<>();
	    
	    @Column(name = "usuario", nullable = false)
	    private String usuario;
	    
	    @Column(name = "contraseña", nullable = false)
	    private String contraseña;

	    @Column(name = "nombre", nullable = false)
	    private String nombre;
	    
	    @Column(name = "apellido", nullable = false)
	    private String apellido;

	    @Column(name = "fecha_nacimiento", nullable = false)
	    private Date fecha_nacimiento;
	    
	    @Column(name = "rol", nullable = false)
	    private String rol;
	    
	    @Column(name = "telefono", nullable = false)
	    private String telefono;
	    
	    @Column(name = "activo")
	    private Boolean activo;
	    
	    public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getUsuario() {
			return usuario;
		}

		public void setUsuario(String usuario) {
			this.usuario = usuario;
		}

		public String getContraseña() {
			return contraseña;
		}

		public void setContraseña(String contraseña) {
			this.contraseña = contraseña;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getApellido() {
			return apellido;
		}

		public void setApellido(String apellido) {
			this.apellido = apellido;
		}

		public Date getFecha_nacimiento() {
			return fecha_nacimiento;
		}

		public void setFecha_nacimiento(Date fecha_nacimiento) {
			this.fecha_nacimiento = fecha_nacimiento;
		}

		public String getRol() {
			return rol;
		}

		public void setRol(String rol) {
			this.rol = rol;
		}

		public String getTelefono() {
			return telefono;
		}

		public void setTelefono(String telefono) {
			this.telefono = telefono;
		}

		public Boolean getActivo() {
			return activo;
		}

		public void setActivo(Boolean activo) {
			this.activo = activo;
		}

		public List<EntidadAlerta> getAlertas() {
			return alertas;
		}

		public void setAlertas(List<EntidadAlerta> alertas) {
			this.alertas = alertas;
		}

		public EntidadConsumidor getConsumidor() {
			return consumidor;
		}

		public void setConsumidor(EntidadConsumidor consumidor) {
			this.consumidor = consumidor;
		}

		public EntidadProductor getProductor() {
			return productor;
		}

		public void setProductor(EntidadProductor productor) {
			this.productor = productor;
		}

		
	    
	}
	