package gl.back.couverture_evenementbackend.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import gl.back.couverture_evenementbackend.FileUploadUtil;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import gl.back.couverture_evenementbackend.entity.Prestataire;
import gl.back.couverture_evenementbackend.repository.prestataireRepository;
import org.springframework.web.multipart.MultipartFile;
//import gl.back.couverture_evenementbackend.entity.Evenement;

@Service
public class prestataireService {

    @Autowired
    private prestataireRepository pRepository;

    @Value("${dossier.image}")
    private String dossierImg;

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

    public Prestataire addImageToPrestataire(MultipartFile multipartFile, Long id) throws IOException {
        Optional<Prestataire> optPrestataire = pRepository.findById(id);
        if (optPrestataire.isPresent() && FileUploadUtil.isImageFile(multipartFile)) {
            Prestataire prestataire = optPrestataire.get();
            String fileName = prestataire.getId_prestataire()+"_"+multipartFile.getOriginalFilename();
            FileUploadUtil.saveFile(dossierImg, fileName, multipartFile);
            prestataire.setImage(fileName);
            return pRepository.save(prestataire);
        }else {
            throw new IOException("Une erreur est survenue ! Verifier que vous soumettez bien une image et que l'Prestataire existe ");
        }
    }

    public byte[] getImagePrestataire(Long id) throws IOException {
        String imageName = pRepository.findById(id).get().getImage();
        if (imageName!=null) {
            byte[] image = FileUploadUtil.getFile(dossierImg, imageName);
            return image;
        } else{
            throw new EntityNotFoundException("Cette Prestataire n'a pas d'image de couverture");
        }
    }
    
}
