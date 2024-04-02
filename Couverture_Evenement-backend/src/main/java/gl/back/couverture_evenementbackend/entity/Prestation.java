package gl.back.couverture_evenementbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
public class Prestation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_Prestation;

    private String libelle;

    @JsonIgnore
    @ManyToMany(mappedBy = "prestations")
    private List<Evenement> evenements;
}
