package gl.back.couverture_evenementbackend.restController;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.service.prestataireService;
//import gl.back.couverture_evenementbackend.entity.Evenement;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/prestataire/api")
public class prestataireController {

    @Autowired
    private prestataireService pService;

    /*****************************************************
     * PARTIE REST
     *****************************/
    @GetMapping(path = "/listerPrestataire")
    public List<Prestataire> listerPrestataires() {
        return pService.afficher_tout_prestataire();
    }

    @GetMapping(path = "/trouverPrestataire/{id}")
    public Prestataire rechercherPrestataire(@PathVariable Long id) {
        return pService.rechercher_prestataire(id);
    }

 @PostMapping(path = "/ajouterPrestataire")
public ResponseEntity<Prestataire> ajouterPrestataire(@RequestBody Prestataire prestataire) {
    Prestataire nouvellePrestataire = pService.ajouter_prestataire(prestataire);
    return ResponseEntity.ok(nouvellePrestataire);
}


    @PutMapping(path = "/modifierPrestataire/{id}")
    public void modifierPrestataire(@RequestBody Prestataire prestataire, @PathVariable Long id) {
        pService.modifier_prestataire(prestataire, id);
    }

    @DeleteMapping(path = "/supprimerPrestataire/{id}")
    public void supprimerPrestataire(@PathVariable Long id) {
        pService.suprimer_prestataire(id);
    }

   // @GetMapping("/prestataire_lister_evenement/{id}")
    //public List<Evenement> listerEvenements(@PathVariable Long id) {
      //  Prestataire prestataire = pService.rechercher_prestataire(id);
        //return pService.afficher_les_Evenements(prestataire);
   // }
    
}
