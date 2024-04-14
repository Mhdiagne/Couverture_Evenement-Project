package gl.back.couverture_evenementbackend.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import gl.back.couverture_evenementbackend.entity.Evenement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfGeneratorService {

    @Autowired
    private EvenementService evenementService;

    public byte[] generatePdfRapport() {
        List<Evenement> evenementsArchives = evenementService.getEvenementsArchives();

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             PdfWriter writer = new PdfWriter(outputStream);
             PdfDocument pdfDocument = new PdfDocument(writer);
             Document document = new Document(pdfDocument)) {

            // Créez le tableau avec les en-têtes
            Table table = new Table(6);
            table.addCell("ID");
            table.addCell("Nom");
            table.addCell("Type d'événement");
            table.addCell("Date d'événement");
            table.addCell("Durée");
            table.addCell("Client");

            // Remplissez le tableau avec les données des événements archivés
            for (Evenement evenement : evenementsArchives) {
                table.addCell(String.valueOf(evenement.getId_Evenement()));
                table.addCell(evenement.getNom());
                table.addCell(evenement.getTypeEvenement());
                table.addCell(evenement.getDateEvenement());
                table.addCell(String.valueOf(evenement.getDuree()));
                //                table.addCell(evenement.getUser().getPrenom() + " " + evenement.getUser().getNom());

            }

            // Ajoutez le tableau au document PDF
            document.add(table);

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
