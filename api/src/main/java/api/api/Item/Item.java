package api.api.Item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    private ObjectId id;
    private String type;
    private String description;
    private Number price;
    private String address1;
    private String address2;
    private String[] params;
    private String host;
}