package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.response.EmailVerificationResult;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final UserRepository userRepository;
    private final JavaMailSender emailSender;
    private final RedisService redisService;
    private static final String AUTH_CODE_PREFIX = "AuthCode ";
    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    // 이메일 전송
    public void sendEmail(String toEmail,
                          String title,
                          String text) {
        System.out.println("6666");
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);
        System.out.println("77777");
        try {
            System.out.println("8888");
            emailSender.send(emailForm);
            System.out.println("9999");
        } catch (Exception e) {
            log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, title, text);
            e.printStackTrace();
//            throw new BusinessLogicException(ExceptionCode.UNABLE_TO_SEND_EMAIL);
            throw new RuntimeException("email을 전송할 수 없습니다.");
        }
    }

    // 발신할 이메일 데이터 세팅
    private SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail); // 메일 수신자
        message.setSubject(title);  // 메일 제목
        message.setText(text);  // 메일 본문 내용

        return message;
    }

    // 인증코드 생성
    private String createCode() {
        int length = 6;
        System.out.println("createCode: 11111");
        try {
            System.out.println("createCode: 2222");
            Random random = SecureRandom.getInstanceStrong();
            System.out.println("createCode: 333");
            StringBuilder builder = new StringBuilder();
            System.out.println("createCode: 4444");
            for (int i = 0; i < length; i++) {
                System.out.println("createCode: 5555");
                builder.append(random.nextInt(10));
            }
            System.out.println("createCode: 6666");
            return builder.toString();
        } catch (Exception e) {
            log.debug("MemberService.createCode() exception occur");
            e.printStackTrace();
//            throw new BusinessLogicException(ExceptionCode.NO_SUCH_ALGORITHM);
            throw new RuntimeException("No such algorithm");
        }
    }

    // 인증코드 전송
    public void sendCodeToEmail(String toEmail) {
        System.out.println("11111");
        this.checkDuplicatedEmail(toEmail);
        System.out.println("33333");
        String title = "맘스픽 이메일 인증 번호";
        System.out.println("44444");
        String authCode = createCode();
        System.out.println("55555");
        sendEmail(toEmail, title, authCode);
        System.out.println("101010");

        // 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
        redisService.setValues(AUTH_CODE_PREFIX + toEmail,
                authCode, Duration.ofMillis(this.authCodeExpirationMillis));
        System.out.println("11-11-11");
    }

    // 인증코드 검증
    public EmailVerificationResult verifiedCode(String email, String authCode) {
        this.checkDuplicatedEmail(email);
        String redisAuthCode = redisService.getValues(AUTH_CODE_PREFIX + email);
        boolean authResult = redisService.checkExistsValue(redisAuthCode) && redisAuthCode.equals(authCode);

        return EmailVerificationResult.of(authResult);
    }

    // 중복 이메일 체크
    private void checkDuplicatedEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println("222222");
        if (user.isPresent()) {
            log.debug("MemberServiceImpl.checkDuplicatedEmail exception occur email: {}", email);
//            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
            throw new RuntimeException("Member exists");
        }
    }


}

