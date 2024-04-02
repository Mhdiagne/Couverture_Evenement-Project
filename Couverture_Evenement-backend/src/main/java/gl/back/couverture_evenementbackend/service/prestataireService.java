package gl.back.couverture_evenementbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.repository.prestataireRepository;
//import gl.back.couverture_evenementbackend.entity.Evenement;

@Service
public class prestataireService {

     @Autowired
    private prestataireRepository pRepository;

    public Prestataire ajouter_prestataire(Prestataire prestataire) {
        return pRepository.save(prestataire);

    }

    public List<Prestataire> afficher_tout_prestataire() {
        return pRepository.findAll();
    }

    public Prestataire rechercher_prestataire(Long id) {
        return pRepository.findById(id).get();
    }

    public void suprimer_prestataire(Long id) {
        pRepository.deleteById(id);
    }

    public void modifier_prestataire(Prestataire prestataire, Long id) {
        prestataire.setId_prestataire(id);
        pRepository.save(prestataire);
    }

   
    //public List<Evenement> afficher_les_Evenements(Prestataire prestataire) {
      //  return pRepository.findByPrestataires(prestataire);
    //}
    
}
