package api.api.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private OrderService service;

    @GetMapping
    public ResponseEntity<List<Order>> getOrders() {
        return new ResponseEntity<List<Order>>(service.findAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable String id){
        return new ResponseEntity<List<Order>>(service.findOrdersByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<List<Order>> getOrdersByItemId(@PathVariable String id){
        return new ResponseEntity<List<Order>>(service.findOrdersByItemId(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Order> updateOrder(@RequestBody Order newOrder){
        return new ResponseEntity<Order>(service.updateOrder(newOrder), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order newOrder){
        return new ResponseEntity<Order>(service.createOrder(newOrder), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteOrder(@PathVariable String id){
        service.deleteOrder(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}