package gl.back.couverture_evenementbackend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id_prestataire;
    private String nom;
    private String image;
    private String description;
    private String fonction;
    private String telephone;
    private String mail;

    @JsonIgnore
    @ManyToMany(mappedBy = "prestataires")
    private List<Evenement> evenements ;
}
