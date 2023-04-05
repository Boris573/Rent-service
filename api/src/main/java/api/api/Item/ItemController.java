package api.api.Item;
// package api.api.controllers;

import org.bson.types.ObjectId;

// import java.util.List;
// import java.util.Optional;
// import java.util.UUID;

// import api.api.entities.Item;
// import api.api.repositories.ItemRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RequestMapping("items")
// @RestController
// public class ItemController {

//     @Autowired
//     private ItemRepository itemRepository;

//     @GetMapping
//     public List<Item> items(){
//         return itemRepository.findAll();
//     }

//     @GetMapping(value = "/{id}")
//     public Item getItemById(@PathVariable("id") UUID id){
//         Optional<Item> item = itemRepository.findById(id);

//         if(item.isPresent()){
//             return item.get();
//         }else{
//             return null;
//         }
//     }

//     @PostMapping
//     public Item addItem(@RequestBody Item item){
//         Item newItem = itemRepository.save(item);
        
//         return newItem;
//     }

//     @PutMapping
//     public Item updateItem(@RequestBody Item newItem){
//         Item item = itemRepository.getReferenceById(newItem.getId());

//         item = newItem;

//         return itemRepository.save(item);

//     }


//     @DeleteMapping(value = "/{id}")
//     public void deleteItem(@PathVariable("id") UUID id){
//         itemRepository.deleteById(id);
//     }
// }

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService service;

    @GetMapping
    public ResponseEntity<List<Item>> getItems() {
        return new ResponseEntity<List<Item>>(service.findAllItems(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Item>> getSingleItem(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Item>>(service.findItemById(id), HttpStatus.OK);
    }
}