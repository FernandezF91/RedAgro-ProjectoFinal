package app;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import app.clases.MailConfirmacion;
import app.clases.MailSender;
import app.clases.Planificador;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class RedAgroApplication {

	public static void main(String[] args){
		SpringApplication.run(RedAgroApplication.class, args);
		
		// License issued by BayesFusion Licensing Server
		// This code must be executed before any other jSMILE object is created
//		new smile.License(
//				"SMILE LICENSE bbf3ed59 e15480dc 0cb1f7b5 " +
//				"THIS IS AN ACADEMIC LICENSE AND CAN BE USED " +
//				"SOLELY FOR ACADEMIC RESEARCH AND TEACHING, " +
//				"AS DEFINED IN THE BAYESFUSION ACADEMIC " +
//				"SOFTWARE LICENSING AGREEMENT. " +
//				"Serial #: b1909hjel3g27sswusbdnsib8 " +
//				"Issued for: Eze Bosso (eze.bosso@gmail.com) " +
//				"Academic institution: UTN Buenos Aires " +
//				"Valid until: 2020-04-03 " +
//				"Issued by BayesFusion activation server",
//				new byte[] {
//				19,64,38,-112,31,90,-102,57,-47,-11,-111,16,11,93,-66,106,
//				47,69,-53,127,-94,90,-59,53,-24,-2,126,125,-28,-33,59,-110,
//				69,27,84,108,-89,-113,-61,-126,82,-25,109,-89,39,4,4,111,
//				-10,-62,23,-81,-128,118,86,32,124,-46,-116,103,48,-16,60,109
//				}
//			);
	}

}
