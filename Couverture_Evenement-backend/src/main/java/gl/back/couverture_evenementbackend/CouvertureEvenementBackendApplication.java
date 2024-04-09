package gl.back.couverture_evenementbackend;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import gl.back.couverture_evenementbackend.repository.PrestationRepository;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.service.prestataireService;


@SpringBootApplication
public class CouvertureEvenementBackendApplication implements CommandLineRunner {

  @Autowired
	private prestataireService pService;

	@Autowired
	private EvenementRepository evenementRepository;

	@Autowired
	private PrestationRepository prestationRepository;

	@Autowired
	private UtilisateurRepository utilisateurRepository;

	public static void main(String[] args) {
		SpringApplication.run(CouvertureEvenementBackendApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
//
//		List<Prestation> prestations = new ArrayList<>();
//
//		Utilisateur utilisateur1 = new Utilisateur(null,"Doe", "John", "Masculin",null, "john.doe@example.com", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "CLIENT",null);
//		Utilisateur utilisateur2 = new Utilisateur(null,"Smith", "Alice", "Féminin",null, "alice.smith@example.com", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "AGENT",null);
//		Utilisateur utilisateur3 = new Utilisateur(null,"Brown", "Bob", "Masculin",null, "bob.brown@example.com", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "CLIENT",null);
//		utilisateurRepository.saveAll(Arrays.asList(utilisateur1,utilisateur2,utilisateur3));
//
//		Evenement evenement1 = new Evenement();
//		evenement1.setNom("Conférence sur l'environnement");evenement1.setTypeEvenement("Conférence");
//		evenement1.setArchive(false);evenement1.setDateEvenement("2024-04-15");evenement1.setDuree(120);
//		evenement1.setUser(utilisateur1);
//
//		Evenement evenement2 = new Evenement();
//		evenement2.setNom("Séminaire de formation");evenement2.setTypeEvenement("Formation");evenement2.setArchive(false);
//		evenement2.setDateEvenement("2024-05-20");evenement2.setDuree(180);evenement2.setPrestations(prestations);
//		evenement2.setUser(utilisateur3);
//
//		Evenement evenement3 = new Evenement();
//		evenement3.setNom("Soirée de gala");evenement3.setTypeEvenement("Soirée");evenement3.setArchive(false);
//		evenement3.setDateEvenement("2024-06-30");evenement3.setDuree(240);
//		evenement3.setUser(utilisateur3);
//
//		Evenement evenement4 = new Evenement();
//		evenement4.setNom("Tournoi de tennis");evenement4.setTypeEvenement("Sport");evenement4.setArchive(false);
//		evenement4.setDateEvenement("2024-07-10");evenement4.setDuree(300);evenement4.setPrestations(prestations);
//		evenement4.setUser(utilisateur1);
//
//		Evenement evenement5 = new Evenement();
//		evenement5.setNom("Exposition d'art contemporain");evenement5.setTypeEvenement("Exposition");evenement5.setArchive(false);
//		evenement5.setDateEvenement("2024-08-25");evenement5.setDuree(150);evenement5.setUser(utilisateur3);
//		evenementRepository.saveAll(Arrays.asList(evenement1,evenement2,evenement3,evenement4,evenement5));
//
//		Prestation prestation1 = new Prestation();prestation1.setLibelle(" Restauration ");
//		prestations.add(prestation1);
//
//		Prestation prestation2 = new Prestation();prestation2.setLibelle(" Animation ");
//
//		Prestation prestation3 = new Prestation();prestation3.setLibelle(" Transport");
//
//		Prestation prestation4 = new Prestation();prestation4.setLibelle(" Hébergement");
//		prestations.add(prestation4);
//
//		Prestation prestation5 = new Prestation();prestation5.setLibelle(" Sonorisation");
//		prestationRepository.saveAll(Arrays.asList(prestation5,prestation1,prestation2,prestation3,prestation4));
//
//
//		Prestataire prestataire1 = new Prestataire(null,"salif service",null,"la qualité superieure", "louer accessoire", "77 237 36 83", "salif1234@gmail.com", null);
//		Prestataire prestataire2 = new Prestataire(null,"diagne service",null,"la qualité inferieure", "louer velo", "77 000 00 00", "moussa1234@gmail.com", null);
//		Prestataire prestataire3 = new Prestataire(null,"cmc service",null,"la qualité moyenne", "louer moto", "77 111 11 11", "cmc1234@gmail.com", null);
//
//		pService.ajouter_prestataire(prestataire1);
//		pService.ajouter_prestataire(prestataire2);
//		pService.ajouter_prestataire(prestataire3);

	}

}
