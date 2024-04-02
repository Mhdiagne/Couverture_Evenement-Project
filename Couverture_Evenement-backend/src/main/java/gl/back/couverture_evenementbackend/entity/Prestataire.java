package gl.back.couverture_evenementbackend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity @Table(name="table_Prestataires")
public class Prestataire {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id_prestataire;
    private String nom;
    private String description;
    private String fonction;
    private String telephone;
    private String mail;


    @ManyToMany
    @JoinTable( name = "T_Prestataires_Evenements_Association",
                joinColumns = @JoinColumn( name = "id_prestataire" ),
                inverseJoinColumns = @JoinColumn( name = "id_evenement" ) )
    private List<Prestataire> prestataires = new ArrayList<>();
}
