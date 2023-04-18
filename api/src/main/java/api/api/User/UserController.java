package api.api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import api.api.domain.dto.UserView;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/me")
    public ResponseEntity<UserView> me(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String data = authentication.getName();

        String id = data.substring(0, data.indexOf(","));

        return new ResponseEntity<UserView>(service.getUser(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserView> getUser(@PathVariable String id){
        return new ResponseEntity<UserView>(service.getUser(id), HttpStatus.OK);
    }
}