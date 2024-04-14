package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import gl.back.couverture_evenementbackend.repository.PrestationRepository;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvenementService {

    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private  PrestationService prestationService;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private gl.back.couverture_evenementbackend.service.prestataireService prestataireService;

    public List<Evenement> getEvenementsArchives() {
        return evenementRepository.findByArchiveTrue();
    }

    public List<Evenement> getAllEvenement() {
        return evenementRepository.findAll();
    }

    public List<Evenement> getEvenementsOfUser(Long id) { return evenementRepository.findByUserId(id); }

    public Evenement getOneEvenement(Long id) {
        return evenementRepository.findById(id).get();
    }

    public Evenement createEvenement(Evenement E) {
        E.setValide("en cour de traitement");
        return evenementRepository.save(E);
    }

    public Evenement updateEvenement(Long id, Evenement newE) {
        if (evenementRepository.existsById(id)) {
            Evenement oldE = getOneEvenement(id);
            oldE.setNom(newE.getNom());
            oldE.setTypeEvenement(newE.getTypeEvenement());
            oldE.setArchive(newE.isArchive());
            oldE.setDuree(newE.getDuree());
            oldE.setDateEvenement(newE.getDateEvenement());
            oldE.setDescription(newE.getDescription());
            oldE.setLieu(newE.getLieu());
            oldE.setValide(newE.getValide());
            return evenementRepository.save(oldE);
        }
        return null;
    }

    public void deleteEvenement(Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
        }
    }

/**
 * @addPrestationToEvenement
 * 
 * */
    public void addPrestationToEvenement(Long idE, Long idP) {
        Evenement event = getOneEvenement(idE);
        Prestation service = prestationService.getOnePrestation(idP);
        event.getPrestations().add(service);
        evenementRepository.save(event);
    }

    public void addPrestataireToEvenement(Long idE, Long idP) {
        Evenement event = getOneEvenement(idE);
        Prestataire prestataire = prestataireService.rechercher_prestataire(idP);
        event.getPrestataires().add(prestataire);
        evenementRepository.save(event);
    }

    public void addUserToEvenement(Long idE, Long idU) {
        Evenement event = getOneEvenement(idE);
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(idU);
        utilisateur.getEvenements().add(event);
        utilisateurRepository.save(utilisateur);
        event.getUsers().add(utilisateur);
        evenementRepository.save(event);
    }

    public Evenement updateValide(Long id, Evenement e) {
        Evenement oldE = getOneEvenement(id);
        oldE.setValide(e.getValide());
        return evenementRepository.save(oldE);
    }

    public Evenement updateArchiver(Long id) {
        Evenement oldE = getOneEvenement(id);
        oldE.setArchive(true);
        return evenementRepository.save(oldE);
    }

}
