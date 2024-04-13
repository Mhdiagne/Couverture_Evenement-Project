package gl.back.couverture_evenementbackend.repository;

import gl.back.couverture_evenementbackend.entity.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface EvenementRepository extends JpaRepository<Evenement, Long> {
    @Query("SELECT e FROM Evenement e WHERE e.archive = true")
    List<Evenement> findByArchiveTrue();

}
