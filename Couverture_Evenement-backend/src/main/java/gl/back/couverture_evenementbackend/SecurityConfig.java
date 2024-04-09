
package gl.back.couverture_evenementbackend;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import gl.back.couverture_evenementbackend.service.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {
	
	@Autowired
	private UserDetailServiceImpl userDetailService;

	
	@Autowired
	private AuthEntryPoint exceptionHandler;
	
	@Autowired
	private AuthenticationFilter authenticationFilter;
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) 
			throws Exception {
	    return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
		return http
		.csrf(csrf -> csrf.disable())
		.cors(withDefaults())
		.sessionManagement(management -> management
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeRequests(authorizeRequests ->
			authorizeRequests
				.requestMatchers(HttpMethod.POST, "/login","/utilisateur/inscriptionClient").permitAll()
				.anyRequest().authenticated()
				)
		.exceptionHandling().authenticationEntryPoint(exceptionHandler).and()
		.addFilterBefore(authenticationFilter,
	UsernamePasswordAuthenticationFilter.class)
		.httpBasic(withDefaults())
		.build();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(false);
		config.applyPermitDefaultValues();

		source.registerCorsConfiguration("/**", config);
		return source;
	}


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception  {
		auth.userDetailsService(userDetailService)
		.passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	
}