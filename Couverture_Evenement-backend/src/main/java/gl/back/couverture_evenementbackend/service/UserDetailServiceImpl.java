package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Utilisateur;
import gl.back.couverture_evenementbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Optional<Utilisateur> user = utilisateurRepository.findUtilisateurByMail(mail);

        UserBuilder builder =null;
        if (user.isPresent()) {
            Utilisateur currentUser = user.get();
            builder = org.springframework.security.core.userdetails.User.withUsername(mail);
            builder.password(currentUser.getPassword());
            builder.roles(currentUser.getRole());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
        return builder.build();
    }
}
