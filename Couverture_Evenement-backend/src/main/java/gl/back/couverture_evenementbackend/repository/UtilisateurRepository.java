package gl.back.couverture_evenementbackend.repository;

import gl.back.couverture_evenementbackend.entity.Utilisateur;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
