package api.api.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    @Autowired
    private ItemService service;

    @GetMapping
    public ResponseEntity<List<Item>> getItems() {
        return new ResponseEntity<List<Item>>(service.findAllItems(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable String id){
        return new ResponseEntity<Item>(service.findItemById(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Item> updateItem(@RequestBody Item newItem){
        return new ResponseEntity<Item>(service.updateItem(newItem), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item newItem){
        return new ResponseEntity<Item>(service.createItem(newItem), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem(@PathVariable String id){
        service.deleteItem(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}