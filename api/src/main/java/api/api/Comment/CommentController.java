package api.api.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    @Autowired
    private CommentService service;

    @GetMapping
    public ResponseEntity<List<Comment>> getComments() {
        return new ResponseEntity<List<Comment>>(service.findAllComments(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Comment>> getCommentsByUserId(@PathVariable String id){
        return new ResponseEntity<List<Comment>>(service.findCommentsByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<List<Comment>> getCommentsByItemId(@PathVariable String id){
        return new ResponseEntity<List<Comment>>(service.findCommentsByItemId(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Comment> updateComment(@RequestBody Comment newComment){
        return new ResponseEntity<Comment>(service.updateComment(newComment), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment newComment){
        return new ResponseEntity<Comment>(service.createComment(newComment), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteComment(@PathVariable String id){
        service.deleteComment(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}