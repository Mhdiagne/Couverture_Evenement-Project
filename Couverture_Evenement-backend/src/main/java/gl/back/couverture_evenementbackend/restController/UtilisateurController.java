package gl.back.couverture_evenementbackend.restController;


import gl.back.couverture_evenementbackend.CouvertureEvenementBackendApplication;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.service.UtilisateurService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/utilisateur")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    private static final Logger logger = LoggerFactory.getLogger(CouvertureEvenementBackendApplication.class);

    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUtilisateur() {
        if (!utilisateurService.getAllUtilisateur().isEmpty())
            return new ResponseEntity<>(utilisateurService.getAllUtilisateur(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public Utilisateur getOneUtilisateur(@PathVariable Long id) {
        return utilisateurService.getUtilisateurById(id);
    }

    @PostMapping("/inscriptionClient")
    public  Utilisateur createUtilisateur(@RequestBody Utilisateur user) {
        logger.info("Inscription reussie!");
        return utilisateurService.createUtilisateur(user);
    }

    @PutMapping("/edit/{id}")
    public Utilisateur editUtilisateur(@PathVariable Long id, @RequestBody Utilisateur user) {
        return utilisateurService.updateUtilisateur(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
    }

//    @PostMapping(path = "/inscriptionClient")
//    public void inscription(@RequestBody Client client){
//        logger.info("InscriptionClient");
//        clientService.inscription(client);
//    }
}
