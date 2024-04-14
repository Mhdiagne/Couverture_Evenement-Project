package gl.back.couverture_evenementbackend.restController;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import gl.back.couverture_evenementbackend.service.EvenementService;
import gl.back.couverture_evenementbackend.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/evenement")
public class EvenementController {

    @Autowired
    private EvenementService evenementService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public ResponseEntity<List<Evenement>> getAllEvenement() {
        if (!evenementService.getAllEvenement().isEmpty())
            return new ResponseEntity<>(evenementService.getAllEvenement(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/archives")
    public List<Evenement> genererRapportEvenementsArchives() {

        return evenementService.getEvenementsArchives();
    }
    @GetMapping("/{id}")
    public Evenement getOneEvenement(@PathVariable Long id) {
        return evenementService.getOneEvenement(id);
    }

    @PostMapping("/create")
    public  Evenement createEvenement(@RequestBody Evenement R, HttpServletRequest request) {
        Evenement newE = evenementService.createEvenement(R);
        String mail = jwtService.getAuthUser(request);
        Utilisateur user =  utilisateurRepository.findUtilisateurByMail(mail)
                .orElseThrow(()-> new RuntimeException("Client "+mail+" not found"));
        System.out.println(newE.getId_Evenement());
        Long id = newE.getId_Evenement();
        evenementService.addUserToEvenement(id, user.getId_user());
        return newE;
    }

    @PutMapping("/edit/{id}")
    public Evenement editEvenement(@PathVariable Long id, @RequestBody Evenement R) {
        return evenementService.updateEvenement(id, R);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEvenement(@PathVariable Long id) {
        evenementService.deleteEvenement(id);
    }

    @PostMapping("/{idP}/addService/{idE}")
    public void addServiceToEvent(@PathVariable Long idE, @PathVariable Long idP) {
        evenementService.addPrestationToEvenement(idE,idP);
    }

    @PostMapping("/{idP}/addPrestataire/{idE}")
    public void addPrestataireToEvent(@PathVariable Long idE, @PathVariable Long idP) {
        evenementService.addPrestataireToEvenement(idE,idP);
    }

    @PostMapping("/{idU}/addUser/{idE}")
    public void addUserToEvent(@PathVariable Long idE, @PathVariable Long idU) {
        evenementService.getOneEvenement(idE).setAttribuer(true);
        evenementService.addUserToEvenement(idE,idU);
    }

    @GetMapping("/evenementofuser/{idU}")
    public List<Evenement> getEvenementsOfUser(@PathVariable Long idU) {
        return evenementService.getEvenementsOfUser(idU);
    }

    @PatchMapping("/validate/{id}")
    public Evenement validateEvenement(@PathVariable Long id, @RequestBody Evenement e) {
        return evenementService.updateValide(id, e);
    }

    @PatchMapping("/archiver/{id}")
    public Evenement archiverEvenement(@PathVariable Long id) {
        return evenementService.updateArchiver(id);
    }
}
