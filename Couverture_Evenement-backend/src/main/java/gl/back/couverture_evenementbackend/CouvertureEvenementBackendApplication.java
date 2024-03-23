package gl.back.couverture_evenementbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.service.prestataireService;


@SpringBootApplication
public class CouvertureEvenementBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(CouvertureEvenementBackendApplication.class, args);
	}

	@Autowired
	private prestataireService pService;

	//@Autowired
	//rivate evenementService eService;

	public void run(String... args) throws Exception{



		Prestataire prestataire1 = new Prestataire(null,"salif service","la qualité superieure", "louer accessoire", "77 237 36 83", "salif1234@gmail.com", null);
		Prestataire prestataire2 = new Prestataire(null,"diagne service","la qualité inferieure", "louer velo", "77 000 00 00", "moussa1234@gmail.com", null);
		Prestataire prestataire3 = new Prestataire(null,"cmc service","la qualité moyenne", "louer moto", "77 111 11 11", "cmc1234@gmail.com", null);

		pService.ajouter_prestataire(prestataire1);
		pService.ajouter_prestataire(prestataire2);
		pService.ajouter_prestataire(prestataire3);

		
	}

}
