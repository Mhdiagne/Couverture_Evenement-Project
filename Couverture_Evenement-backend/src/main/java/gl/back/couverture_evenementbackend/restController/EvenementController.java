package gl.back.couverture_evenementbackend.restController;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/evenement")
public class EvenementController {

    @Autowired
    private EvenementService evenementService;

    @GetMapping
    public ResponseEntity<List<Evenement>> getAllEvenement() {
        if (!evenementService.getAllEvenement().isEmpty())
            return new ResponseEntity<>(evenementService.getAllEvenement(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public Evenement getOneEvenement(@PathVariable Long id) {
        return evenementService.getOneEvenement(id);
    }

    @PostMapping("/create")
    public  Evenement createEvenement(@RequestBody Evenement R) {
        return evenementService.createEvenement(R);
    }

    @PutMapping("/edit/{id}")
    public Evenement editEvenement(@PathVariable Long id, @RequestBody Evenement R) {
        return evenementService.updateEvenement(id, R);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEvenement(@PathVariable Long id) {
        evenementService.deleteEvenement(id);
    }
}
