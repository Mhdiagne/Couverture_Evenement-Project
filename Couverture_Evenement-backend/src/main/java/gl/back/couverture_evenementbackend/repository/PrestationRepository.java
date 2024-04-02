package gl.back.couverture_evenementbackend.repository;

import gl.back.couverture_evenementbackend.entity.Prestation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestationRepository extends JpaRepository<Prestation, Long> {
}
