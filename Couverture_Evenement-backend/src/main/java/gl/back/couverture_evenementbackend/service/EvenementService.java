package gl.back.couverture_evenementbackend.service;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvenementService {

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
            Evenement updateE = getOneEvenement(id);
            updateE.setId_Evenement(E.getId_Evenement());
            return evenementRepository.save(updateE);
        }
        return null;
    }

    public void deleteEvenement(Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
        }
    }
}
