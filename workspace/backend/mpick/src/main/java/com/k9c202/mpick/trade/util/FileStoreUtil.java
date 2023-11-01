package com.k9c202.mpick.trade.util;

import com.k9c202.mpick.trade.controller.component.ImageSaveForm;
import com.k9c202.mpick.trade.entity.TradeImage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

@Slf4j
@Component
public class FileStoreUtil {

    private final String currentPath = System.getProperty("user.dir");

    /**
     * 파일 업로드
     */
    public List<ImageSaveForm> uploadFiles(String fileType, List<MultipartFile> multipartFiles) {
        List<ImageSaveForm> imageSaveForms = new ArrayList<>();
        String uploadFilePath = currentPath + "\\" + "MpickStore" + "\\" + fileType + "\\" + getDate();

        Integer seq = 1;

        for (MultipartFile multipartFile : multipartFiles) {
            if(multipartFile.isEmpty()) continue;

            String originalFileName = multipartFile.getOriginalFilename();
            String uploadFileName = getUuidFileName(originalFileName);
            String uploadFileUrl = uploadFilePath + "\\" + uploadFileName;

            // 폴더 생성
            File Folder = new File(uploadFilePath);
            if (!Folder.exists()) {
                try {
                    Folder.mkdirs();
                }
                catch(Exception e) {
                    log.error("File: Unable to create folder");
//                    throw new FileException(File.class);
                }
            }

            // 파일 저장
            try {
                multipartFile.transferTo(new File(uploadFileUrl));
            } catch (IOException e) {
                log.error("File: Filed upload failed", e);
//                throw new FileException(MultipartFile.class);
            }

            ImageSaveForm imageSaveForm = ImageSaveForm.builder()
                            .uploadFileName(originalFileName)
                            .saveFileName(uploadFileUrl)
                            .sequence(seq++)
                            .build();

            imageSaveForms.add(imageSaveForm);
        }

        return imageSaveForms;
    }

    /**
     * 파일 삭제
     */
    public List<Long> deleteFiles(List<TradeImage> images) {
        List<Long> result = new ArrayList<>();

        for(TradeImage image : images) {
            try {
                File file = new File(image.getSaveFileName());

                if(file.exists()) {
                    file.delete();
                    result.add(image.getId());
                } else {
                    log.error("File: File not found");
                }
            } catch(Exception e) {
                log.error("File: Path not valid");
            }
        }

        return result;
    }

    // 날짜 문자열 생성(연/월/일)
    private String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String str = sdf.format(date);
        return str.replace("-", "\\");
    }

    // UUID 생성
    private String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID() + "." + ext;
    }

}
