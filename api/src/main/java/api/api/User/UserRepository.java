package api.api.User;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import api.api.domain.exception.NotFoundException;
import api.api.domain.model.User;

public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);
  Optional<User> findById(String String);

  default User getById(String id) {
    var optionalUser = findById(id);
    if (optionalUser.isEmpty()) {
      throw new NotFoundException(User.class, id);
    }
    if (!optionalUser.get().isEnabled()) {
      throw new NotFoundException(User.class, id);
    }
    return optionalUser.get();
  }
}