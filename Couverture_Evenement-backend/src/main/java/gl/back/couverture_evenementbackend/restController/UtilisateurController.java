package gl.back.couverture_evenementbackend.restController;


//import gl.back.couverture_evenementbackend.CouvertureEvenementBackendApplication;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import gl.back.couverture_evenementbackend.service.UtilisateurService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/utilisateur")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

//    private static final Logger logger = LoggerFactory.getLogger(CouvertureEvenementBackendApplication.class);

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

    @GetMapping(path = "/{id}/get_img")
    public ResponseEntity<?> touverArticleImage(@PathVariable Long id) throws IOException{
        byte[] image = utilisateurService.getImageUtilisateur(id);
        //String imgType = FileUploadUtil.getContentType(aService.getArticleById(id).getImageCouverture());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

//    @PostMapping("/inscriptionClient")
//    public  Utilisateur createUtilisateur(@RequestParam("image") MultipartFile file,@RequestBody Utilisateur user) throws IOException {
//        logger.info("Inscription reussie!");
//        Utilisateur userF = utilisateurService.createUtilisateur(user);
//        utilisateurService.addImageToUtilisateur(file,userF.getId_user());
//        return userF;
//    }

    @PostMapping("/inscriptionClient")
    public Utilisateur createUtilisateur(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("sexe") String sexe,
            @RequestParam("mail") String mail,
            @RequestParam("password") String password) throws IOException {
        Utilisateur user = new Utilisateur();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setSexe(sexe);
        user.setMail(mail);
        user.setPassword(password);
        Utilisateur userF = utilisateurService.createUtilisateur(user);
        utilisateurService.addImageToUtilisateur(file, userF.getId_user());
//        logger.info("Inscription réussie!");
        return userF;
    }


    @PutMapping("/edit/{id}")
    public Utilisateur editUtilisateur(@PathVariable Long id, @RequestBody Utilisateur user) {
        return utilisateurService.updateUtilisateur(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
    }

//    @PutMapping("/{id}/set-img")
//    public Utilisateur setImgToUtilisateur(@RequestParam("image") MultipartFile file, @PathVariable Long id) throws IOException {
//        return utilisateurService.addImageToUtilisateur(file,id);
//    }
}
