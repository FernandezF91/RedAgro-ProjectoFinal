package app;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import app.clases.MailConfirmacion;
import app.clases.MailSender;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class RedAgroApplication {

	public static void main(String[] args){
		SpringApplication.run(RedAgroApplication.class, args);

		
	}

}
