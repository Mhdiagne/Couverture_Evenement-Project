package gl.back.couverture_evenementbackend.restController;

import gl.back.couverture_evenementbackend.entity.AccountCredentials;
import gl.back.couverture_evenementbackend.service.JwtService;
import gl.back.couverture_evenementbackend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {
    @Autowired
	private JwtService jwtService;

	@Autowired
	private UtilisateurService utilisateurService;


	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
		UsernamePasswordAuthenticationToken creds =
				new UsernamePasswordAuthenticationToken(
						credentials.getMail(),
						credentials.getPassword());	

		Authentication auth = authenticationManager.authenticate(creds);
		String mail = auth.getName();

		Long idu = utilisateurService.getIdMail(mail);
		String roleu = utilisateurService.getRoleMail(mail);
		String unom = utilisateurService.getNomMail(mail);
		String uprenom = utilisateurService.getPrenomMail(mail);


		// Generate token
		String jwts = jwtService.getToken(auth.getName(), idu, roleu,uprenom,unom);
		// Build response with the generated token
		return ResponseEntity.ok()
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
			.build();
	}
}
