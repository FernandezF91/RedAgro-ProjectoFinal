package app.clases;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class Usuario {
	
	public Usuario (long ID, List<Alerta> a, String u, String c, String n, String ap, Date fn, String r, String t, Boolean ac) {
		
		this.setId(ID);
		this.alertas= alertas != null ? alertas: new ArrayList<Alerta>();
		this.setUsuario(u);
		this.setContraseña(c);
		this.setNombre(n);
		this.setApellido(ap);
		this.setFecha_nacimiento(fn);
		this.setRol(r);
		this.setTelefono(t);
		this.setActivo(ac);		
		
	}

	    private Long id;
	    
	    private List<Alerta> alertas;
	    
	    private String usuario;
	    
	    private String contraseña;

	    private String nombre;
	    
	    private String apellido;

	    private Date fecha_nacimiento;

	    private String rol;

	    private String telefono;

	    private Boolean activo;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		
		public List<Alerta> getAlertas() {
			return alertas;
		}

		public void setAlertas(List<Alerta> alertas) {
			this.alertas = alertas;
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
	    
	    

}
