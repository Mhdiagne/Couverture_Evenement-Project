package gl.back.couverture_evenementbackend.restController;

import gl.back.couverture_evenementbackend.entity.Evenement;
import gl.back.couverture_evenementbackend.entity.Prestation;
import gl.back.couverture_evenementbackend.service.EvenementService;
import gl.back.couverture_evenementbackend.service.PrestationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/prestation")
public class PrestationController {
    @Autowired
    private PrestationService prestationService;

    @GetMapping
    public ResponseEntity<List<Prestation>> getAllPrestation() {
        if (!prestationService.getAllPrestation().isEmpty())
            return new ResponseEntity<>(prestationService.getAllPrestation(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public Prestation getOnePrestation(@PathVariable Long id) {
        return prestationService.getOnePrestation(id);
    }

    @PostMapping("/create")
    public  Prestation createPrestation(@RequestBody Prestation R) {
        return prestationService.createPrestation(R);
    }

    @PutMapping("/edit/{id}")
    public Prestation editPrestation(@PathVariable Long id, @RequestBody Prestation R) {
        return prestationService.updateprestation(id, R);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePrestation(@PathVariable Long id) {
        prestationService.deletePrestation(id);
    }
}
