package api.api.Item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Number price;
    private String description;
    private String flatNumber;
    private String houseNumber;
    private String street;
    private String city;
    private String country;
    private Object params;
    private String host;
}
