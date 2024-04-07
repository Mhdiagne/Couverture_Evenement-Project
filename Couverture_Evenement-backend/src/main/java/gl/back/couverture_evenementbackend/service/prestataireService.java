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


    public List<Prestataire> afficher_tout_prestataire() {
        return pRepository.findAll();
    }

    public Prestataire rechercher_prestataire(Long id) {
        return pRepository.findById(id).get();
    }

    public Prestataire ajouter_prestataire(Prestataire p) { return pRepository.save(p);}

    public void suprimer_prestataire(Long id) {
        pRepository.deleteById(id);
    }

    public void modifier_prestataire(Prestataire newP, Long id) {
        if (pRepository.existsById(id)) {
            Prestataire oldP = rechercher_prestataire(id);
            oldP.setNom(newP.getNom());
            oldP.setDescription(newP.getDescription());
            oldP.setMail(newP.getMail());
            oldP.setFonction(newP.getFonction());
            oldP.setTelephone(newP.getTelephone());
            pRepository.save(oldP);
        }
    }

   
    //public List<Evenement> afficher_les_Evenements(Prestataire prestataire) {
      //  return pRepository.findByPrestataires(prestataire);
    //}
    
}
