package gl.back.couverture_evenementbackend.repository;

import gl.back.couverture_evenementbackend.entity.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface EvenementRepository extends JpaRepository<Evenement, Long> {
}
