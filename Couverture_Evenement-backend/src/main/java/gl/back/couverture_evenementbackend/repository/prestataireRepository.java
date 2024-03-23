package gl.back.couverture_evenementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import gl.back.couverture_evenementbackend.entity.Prestataire;
//import gl.back.couverture_evenementbackend.entity.Evenement;

@Repository
public interface prestataireRepository extends JpaRepository<Prestataire, Long> {

   //   @Query("SELECT prest FROM Evenement prest WHERE prest.prestataire = ?1")
     // java.util.List<Evenement> findByPrestataires(Prestataire prestataire);
}
