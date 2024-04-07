package gl.back.couverture_evenementbackend.service;


import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.repository.PrestationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrestationService {
    
    @Autowired
    private PrestationRepository prestationRepository;

    public List<Prestation> getAllPrestation() {
        return prestationRepository.findAll();
    }

    public Prestation getOnePrestation(Long id) {
        return prestationRepository.findById(id).get();
    }

    public Prestation createPrestation(Prestation E) {
        return prestationRepository.save(E);
    }

    public Prestation updateprestation(Long id, Prestation newS) {
        if (prestationRepository.existsById(id)) {
            Prestation oldS = getOnePrestation(id);
            oldS.setLibelle(newS.getLibelle());
            return prestationRepository.save(oldS);
        }
        return null;
    }

    public void deletePrestation(Long id) {
        if (prestationRepository.existsById(id)) {
            prestationRepository.deleteById(id);
        }
    }
}
