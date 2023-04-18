package api.api.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Order> findAllOrders() {
        return repository.findAll();
    }

    public List<Order> findOrdersByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(userId));
        return mongoTemplate.find(query, Order.class);
    }

    public List<Order> findOrdersByItemId(String itemId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("item").is(itemId));
        return mongoTemplate.find(query, Order.class);
    }

    public Order updateOrder(Order newOrder) {
        return repository.save(newOrder);
    }

    public Order createOrder(Order newOrder) {
        return repository.save(newOrder);
    }

    public void deleteOrder(String orderId) {
        repository.deleteById(orderId);
    }
}