package gl.back.couverture_evenementbackend.restController;
import gl.back.couverture_evenementbackend.service.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rapport-generate")
public class PdfGeneratorController {

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    @GetMapping(produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generatePdfReport() {
        byte[] pdfContents = pdfGeneratorService.generatePdfRapport();
        if (pdfContents != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "rapport.pdf");
            headers.setContentLength(pdfContents.length);
            return new ResponseEntity<>(pdfContents, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
