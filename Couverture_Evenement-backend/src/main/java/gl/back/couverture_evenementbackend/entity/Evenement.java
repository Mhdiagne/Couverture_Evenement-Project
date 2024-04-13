package gl.back.couverture_evenementbackend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_Evenement;
    private String nom;
    private String typeEvenement;
    private String description;
    private String lieu;
    private boolean archive;
    private String dateEvenement;
    private String valide;
    private int duree;

    @ManyToMany
    private List<Prestation> prestations;

    @ManyToMany
    private List<Prestataire> prestataires;

    @ManyToMany
    private List<Utilisateur> users;
}
