package gl.back.couverture_evenementbackend.restController;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.service.prestataireService;
import org.springframework.web.multipart.MultipartFile;
//import gl.back.couverture_evenementbackend.entity.Evenement;

@RestController
@RequestMapping("/prestataire")
public class prestataireController {

    @Autowired
    private prestataireService pService;

    /*****************************************************
     * PARTIE REST
     *****************************/
    @GetMapping
    public List<Prestataire> listerPrestataires() {
        return pService.afficher_tout_prestataire();
    }

    @GetMapping(path = "/{id}")
    public Prestataire rechercherPrestataire(@PathVariable Long id) {
        return pService.rechercher_prestataire(id);
    }

    @GetMapping(path = "/{id}/get_img")
    public ResponseEntity<?> touverArticleImage(@PathVariable Long id) throws IOException{
        byte[] image = pService.getImagePrestataire(id);
        //String imgType = FileUploadUtil.getContentType(aService.getArticleById(id).getImageCouverture());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @PostMapping("/create")
    public Prestataire createPrestataire(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("description") String description,
            @RequestParam("fonction") String fonction,
            @RequestParam("telephone") String telephone,
            @RequestParam("mail") String mail) throws IOException {
        Prestataire user = new Prestataire();
        user.setNom(nom);
        user.setDescription(description);
        user.setFonction(fonction);
        user.setTelephone(telephone);
        user.setMail(mail);
        Prestataire userF = pService.ajouter_prestataire(user);
        pService.addImageToPrestataire(file, userF.getId_prestataire());
        return userF;
    }

    @PutMapping(path = "/update/{id}")
    public void modifierPrestataire(@RequestBody Prestataire prestataire, @PathVariable Long id) {
        pService.modifier_prestataire(prestataire, id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void supprimerPrestataire(@PathVariable Long id) {
        pService.suprimer_prestataire(id);
    }

   // @GetMapping("/prestataire_lister_evenement/{id}")
    //public List<Evenement> listerEvenements(@PathVariable Long id) {
      //  Prestataire prestataire = pService.rechercher_prestataire(id);
        //return pService.afficher_les_Evenements(prestataire);
   // }
    
}
