package api.api.Item;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ItemRepository extends MongoRepository<Item, String> {
    Optional<Item> findItemById(String id);
}