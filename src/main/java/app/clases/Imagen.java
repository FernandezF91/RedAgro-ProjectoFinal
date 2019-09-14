package app.clases;

public class Imagen {
	
	public Imagen (Long id, byte[] image, String nombre, String tipo_contenido) {
		this.setId(id);
		this.setImage(image);
		this.setNombre(nombre);
		this.setTipo_contenido(tipo_contenido);
	}
	
	private Long id;
	//private ProductoProductor producto_productor; Lo dejo comentado por ahora
	private byte[] image;
	private String nombre;
	private String tipo_contenido;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getTipo_contenido() {
		return tipo_contenido;
	}
	public void setTipo_contenido(String tipo_contenido) {
		this.tipo_contenido = tipo_contenido;
	}
}
