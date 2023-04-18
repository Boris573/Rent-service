package api.api.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;
    
    @Autowired
    MongoTemplate mongoTemplate;

    public List<Comment> findAllComments() {
        return repository.findAll();
    }

    public List<Comment> findCommentsByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(userId));
        return mongoTemplate.find(query, Comment.class);
    }

    public List<Comment> findCommentsByItemId(String itemId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("item").is(itemId));
        return mongoTemplate.find(query, Comment.class);
    }

    public Comment updateComment(Comment newComment) {
        return repository.save(newComment);
    }

    public Comment createComment(Comment newComment) {
        return repository.save(newComment);
    }

    public void deleteComment(String commentId) {
        repository.deleteById(commentId);
    }
}