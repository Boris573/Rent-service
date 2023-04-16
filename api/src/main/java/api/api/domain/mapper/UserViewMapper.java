package api.api.domain.mapper;

import api.api.domain.dto.UserView;
import api.api.domain.model.User;
import api.api.User.UserRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ObjectIdMapper.class})
public abstract class UserViewMapper {

  @Autowired
  private UserRepository userRepo;

  public abstract UserView toUserView(User user);
  public abstract UserView toUserView(User user, String token);

  public abstract List<UserView> toUserView(List<User> users);

  public UserView toUserViewById(String id) {
    if (id == null) {
      return null;
    }
    return toUserView(userRepo.getById(id));
  }

}
