package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.FileUploadUtil;
import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${dossier.image}")
    private String dossierImg;

    public Long getIdMail(String mail){
        return utilisateurRepository.findIdMail(mail);
    }

    public String getRoleMail(String mail){
        return utilisateurRepository.findRoleMail(mail);
    }

    public List<Utilisateur> getAllUtilisateur() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).get();
    }

    public Utilisateur createUtilisateur(Utilisateur user) {
        String mdpCrypte = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(mdpCrypte);
        user.setRole("CLIENT");
        return utilisateurRepository.save(user);
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur user) {
        if (utilisateurRepository.existsById(id)) {
            Utilisateur updateUser = getUtilisateurById(id);
            updateUser.setNom(user.getNom());
            updateUser.setPrenom(user.getPrenom());
            updateUser.setSexe(user.getSexe());
            updateUser.setMail(user.getMail());
            updateUser.setPassword(user.getPassword());
            updateUser.setRole(user.getRole());
            return utilisateurRepository.save(updateUser);
        }
        return null;
    }

    public void deleteUtilisateur(Long id) {
        if (utilisateurRepository.existsById(id)) {
            utilisateurRepository.deleteById(id);
        }
    }

    public Utilisateur addImageToUtilisateur(MultipartFile multipartFile, Long id) throws IOException {
        Optional<Utilisateur> optUtilisateur = utilisateurRepository.findById(id);
        if (optUtilisateur.isPresent() && FileUploadUtil.isImageFile(multipartFile)) {
            Utilisateur utilisateur = optUtilisateur.get();
            String fileName = utilisateur.getId_user()+"_"+multipartFile.getOriginalFilename();
            FileUploadUtil.saveFile(dossierImg, fileName, multipartFile);
            utilisateur.setImage(fileName);
            return utilisateurRepository.save(utilisateur);
        }else {
            throw new IOException("Une erreur est survenue ! Verifier que vous soumettez bien une image et que l'Utilisateur existe ");
        }
    }

    public byte[] getImageUtilisateur(Long id) throws IOException {
        String imageName = utilisateurRepository.findById(id).get().getImage();
        if (imageName!=null) {
            byte[] image = FileUploadUtil.getFile(dossierImg, imageName);
            return image;
        } else{
            throw new EntityNotFoundException("Cette Utilisateur n'a pas d'image de couverture");
        }
    }
}
