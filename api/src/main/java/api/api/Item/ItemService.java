package api.api.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    public List<Item> findAllItems() {
        return repository.findAll();
    }

    public Item findItemById(String itemId) {
        return repository.findItemById(itemId);
    }

    public Item updateItem(Item newItem) {
        return repository.save(newItem);
    }

    public Item createItem(Item newItem) {
        return repository.save(newItem);
    }

    public void deleteItem(String itemId) {
        repository.deleteById(itemId);
    }
}