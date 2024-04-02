package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvenementService {

    @Autowired
    private EvenementRepository evenementRepository;

    public List<Evenement> getAllEvenement() {
        return evenementRepository.findAll();
    }

    public Evenement getOneEvenement(Long id) {
        return evenementRepository.findById(id).get();
    }

    public Evenement createEvenement(Evenement E) {
        return evenementRepository.save(E);
    }

    public Evenement updateEvenement(Long id, Evenement E) {
        if (evenementRepository.existsById(id)) {
            E.setId_Evenement(id);
            return evenementRepository.save(E);
        }
        return null;
    }

    public void deleteEvenement(Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
        }
    }
}
