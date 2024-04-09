package gl.back.couverture_evenementbackend;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
    
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException{
        Path uploadPath = Paths.get(uploadDir);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try( InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(multipartFile.getInputStream(), filePath);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: "+ fileName, ioe);
        }
    }

    public static byte[] getFile(String fileName, String uploadDir) throws IOException{
        Path filePath = Paths.get(fileName+uploadDir);
        return Files.readAllBytes(filePath);
    }

    
    // public static boolean isImageFile(MultipartFile file) {
    //     String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
    //     return Arrays.asList(new String[]{"png", "jpeg", "jpg", "bmp"})
    //             .contains(fileExtension.trim().toLowerCase());
    // }
    public static boolean isImageFile(MultipartFile file) throws IOException{
        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.contains(".")) {
            String fileExtension = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
            return Arrays.asList(new String[]{"png", "jpeg", "jpg"})
                .contains(fileExtension.trim().toLowerCase());
        }
        return false; 
    }

    public static String getContentType(String fileName){
        String fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase() ;
        String extension = "";
        switch (fileExtension) {
            case "png":
                extension = "image/png";
                break;
            case "jpg":
                extension = "image/jpg";
                break;
            case "jpeg":
                extension = "image/jpeg";
                break;
            default:
                extension = " ";
                break;
        }
        return extension;
    }
}