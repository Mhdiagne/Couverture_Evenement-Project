package gl.back.couverture_evenementbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;


//import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    private String nom;
    private String prenom;
    private String sexe;
    private String mail;
    private String password;
    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Evenement> evenement;
}
