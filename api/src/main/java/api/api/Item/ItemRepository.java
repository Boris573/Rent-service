package api.api.Item;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ItemRepository extends MongoRepository<Item, ObjectId> {
    Optional<Item> findItemById(ObjectId id);
}