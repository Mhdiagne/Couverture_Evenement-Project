package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import gl.back.couverture_evenementbackend.repository.PrestationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvenementService {

    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private PrestationRepository prestationRepository;

    @Autowired
    private  PrestationService prestationService;

    @Autowired
    private gl.back.couverture_evenementbackend.service.prestataireService prestataireService;

    public List<Evenement> getAllEvenement() {
        return evenementRepository.findAll();
    }

    public Evenement getOneEvenement(Long id) {
        return evenementRepository.findById(id).get();
    }

    public Evenement createEvenement(Evenement E) {
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
            oldE.setUser(newE.getUser());
            oldE.setDescription(newE.getDescription());
            oldE.setLieu(newE.getLieu());
            return evenementRepository.save(oldE);
        }
        return null;
    }

    public void deleteEvenement(Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
        }
    }

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

}
