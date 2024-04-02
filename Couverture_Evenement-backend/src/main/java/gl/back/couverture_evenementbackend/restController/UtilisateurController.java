package gl.back.couverture_evenementbackend.restController;


import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.service.UtilisateurService;
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

    @PostMapping("/create")
    public  Utilisateur createUtilisateur(@RequestBody Utilisateur user) {
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
}
