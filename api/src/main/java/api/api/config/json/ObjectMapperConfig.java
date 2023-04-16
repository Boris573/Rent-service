package api.api.config.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import api.api.config.json.serializer.LocalDateDeserializer;
import api.api.config.json.serializer.LocalDateSerializer;
import api.api.config.json.serializer.LocalDateTimeDeserializer;
import api.api.config.json.serializer.LocalDateTimeSerializer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObjectMapperConfig {

  @Bean
  public ObjectMapper objectMapper() {
    var objectMapper = new ObjectMapper();

    var javaTimeModule = new JavaTimeModule();
    javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer());
    javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer());
    javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer());
    javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());
    objectMapper.registerModule(javaTimeModule);

    return objectMapper;
  }
}
