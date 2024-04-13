package gl.back.couverture_evenementbackend.repository;

import gl.back.couverture_evenementbackend.entity.Utilisateur;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findUtilisateurByMail(String mail);

    @Query("SELECT u.id_user FROM Utilisateur u WHERE u.mail = :mail")
    Long findIdMail(@Param("mail") String mail);

    @Query("SELECT u.role FROM Utilisateur u WHERE u.mail = :mail")
    String findRoleMail(@Param("mail") String mail);

    @Query("SELECT u.nom FROM Utilisateur u WHERE u.mail = :mail")
    String findNomMail(@Param("mail") String mail);

    @Query("SELECT u.prenom FROM Utilisateur u WHERE u.mail = :mail")
    String findPrenomMail(@Param("mail") String mail);
}
