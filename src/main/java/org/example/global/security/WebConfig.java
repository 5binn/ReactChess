package org.example.global.security;

import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "PATCH", "DELETE");
    }

    public static class PasswordEncoder {
        public static String encodePassword(String password) {
            return BCrypt.hashpw(password, BCrypt.gensalt());
        }

        public static boolean checkPassword(String checkPassword, String hashedPassword) {
            return BCrypt.checkpw(checkPassword, hashedPassword);
        }
    }
}
