package gl.back.couverture_evenementbackend;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import gl.back.couverture_evenementbackend.repository.PrestationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class CouvertureEvenementBackendApplication implements CommandLineRunner {

	@Autowired
	private EvenementRepository evenementRepository;

	@Autowired
	private PrestationRepository prestationRepository;

	public static void main(String[] args) {
		SpringApplication.run(CouvertureEvenementBackendApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {

		List<Prestation> prestations = new ArrayList<>();

		Evenement evenement1 = new Evenement();
		evenement1.setNom("Conférence sur l'environnement");evenement1.setTypeEvenement("Conférence");
		evenement1.setArchive(false);evenement1.setDateEvenement("2024-04-15");evenement1.setDuree(120);

		Evenement evenement2 = new Evenement();
		evenement2.setNom("Séminaire de formation");evenement2.setTypeEvenement("Formation");evenement2.setArchive(false);
		evenement2.setDateEvenement("2024-05-20");evenement2.setDuree(180);evenement2.setPrestations(prestations);

		Evenement evenement3 = new Evenement();
		evenement3.setNom("Soirée de gala");evenement3.setTypeEvenement("Soirée");evenement3.setArchive(false);
		evenement3.setDateEvenement("2024-06-30");evenement3.setDuree(240);

		Evenement evenement4 = new Evenement();
		evenement4.setNom("Tournoi de tennis");evenement4.setTypeEvenement("Sport");evenement4.setArchive(false);
		evenement4.setDateEvenement("2024-07-10");evenement4.setDuree(300);evenement4.setPrestations(prestations);

		Evenement evenement5 = new Evenement();
		evenement5.setNom("Exposition d'art contemporain");evenement5.setTypeEvenement("Exposition");evenement5.setArchive(false);
		evenement5.setDateEvenement("2024-08-25");evenement5.setDuree(150);
		evenementRepository.saveAll(Arrays.asList(evenement1,evenement2,evenement3,evenement4,evenement5));

		Prestation prestation1 = new Prestation();prestation1.setLibelle(" Restauration ");
		prestations.add(prestation1);

		Prestation prestation2 = new Prestation();prestation2.setLibelle(" Animation ");

		Prestation prestation3 = new Prestation();prestation3.setLibelle(" Transport");

		Prestation prestation4 = new Prestation();prestation4.setLibelle(" Hébergement");
		prestations.add(prestation4);

		Prestation prestation5 = new Prestation();prestation5.setLibelle(" Sonorisation");
		prestationRepository.saveAll(Arrays.asList(prestation5,prestation1,prestation2,prestation3,prestation4));

	}


}
