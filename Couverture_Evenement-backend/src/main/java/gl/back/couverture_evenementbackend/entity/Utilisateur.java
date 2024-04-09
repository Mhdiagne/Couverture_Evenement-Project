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
    @Column(unique = true,nullable = false)
    private String mail;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String role;

    @JsonIgnore
    @OneToMany
    private List<Evenement> evenement;
}
