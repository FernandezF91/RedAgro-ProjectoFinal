package app.clases;

import java.util.Properties;


import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public abstract class MailSender {
	
	private String to;
	private String contenido_email;
	private String asunto;	
	static Properties mailServerProperties;
	static Session getMailSession;
	static MimeMessage generateMailMessage;
			

	public void enviarMail() throws AddressException, MessagingException{
		
		final String username = "equipo.culturaverde@gmail.com";
        final String password = "uocvdtlyvqovghjs";

		mailServerProperties = System.getProperties();
		mailServerProperties.put("mail.smtp.port", "587");
		mailServerProperties.put("mail.smtp.auth", "true");
		mailServerProperties.put("mail.smtp.starttls.enable", "true");
 
		getMailSession = Session.getDefaultInstance(mailServerProperties, null);
		generateMailMessage = new MimeMessage(getMailSession);
		generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(this.getTo()));
		generateMailMessage.setSubject(this.getAsunto());
		String emailBody = this.getContenido_email();
		generateMailMessage.setContent(emailBody, "text/html");
 
		Transport transport = getMailSession.getTransport("smtp");
 
		transport.connect("smtp.gmail.com", username, password);
		
		transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
		transport.close();
	}
		

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getContenido_email() {
		return contenido_email;
	}

	public void setContenido_email(String contenido_email) {
		this.contenido_email = contenido_email;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}
	

}
