package gl.back.couverture_evenementbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("gl.back.couverture_evenementbackend.repository")
public class CouvertureEvenementBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(CouvertureEvenementBackendApplication.class, args);


	}
//	@Override
//	public void run(String... args) throws Exception {
//
//	}


}
