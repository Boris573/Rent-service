package api.api.Item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    private String id;
    private String title;
    private String image;
    private String type;
    private Number rentPrice;
    private Number buyPrice;
    @JsonProperty("isRent")
    private boolean isRent;
    @JsonProperty("isSale")
    private boolean isSale;
    private Number roomCount;
    private String description;
    private String flatNumber;
    private String houseNumber;
    private String street;
    private String city;
    private String country;
    private Object params;
    private String host;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;
}
