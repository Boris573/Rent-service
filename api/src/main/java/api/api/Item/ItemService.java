package api.api.Item;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    public List<Item> findAllItems() {
        return repository.findAll();
    }

    public Optional<Item> findItemById(ObjectId id) {
        return repository.findItemById(id);
    }
}