package gl.back.couverture_evenementbackend.service;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtService {
    static final long EXPIRATIONTIME = 86400000;
    static final String PREFIX = "Bearer";
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
    public String getToken(String mail, Long id, String role ) {
        String token = Jwts.builder()
            .setSubject(mail)
			.claim("id", id)
			.claim("role",role)
            .setExpiration(new Date(System.currentTimeMillis()+EXPIRATIONTIME))
            .signWith(key)
            .compact();
        return token;
    }

    public String getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
	
		if (token != null) {
			String user = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();
	    
			if (user != null)
				return user;
		}

		return null;
	}
} 


