package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
}
