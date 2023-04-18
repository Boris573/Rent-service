package api.api.User;

import static java.lang.String.format;

import api.api.domain.dto.CreateUserRequest;
import api.api.domain.dto.UpdateUserRequest;
import api.api.domain.dto.UserView;
import api.api.domain.mapper.UserEditMapper;
import api.api.domain.mapper.UserViewMapper;

import javax.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepo;
  private final UserEditMapper userEditMapper;
  private final UserViewMapper userViewMapper;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  MongoTemplate mongoTemplate;

  @Transactional
  public UserView create(CreateUserRequest request, String... token) {
    if (userRepo.findByUsername(request.username()).isPresent()) {
      throw new ValidationException("Username exists!");
    }

    var user = userEditMapper.create(request);
    user.setPassword(passwordEncoder.encode(request.password()));

    user = userRepo.save(user);

    return token.length > 0 ? userViewMapper.toUserView(user, token[0]) : userViewMapper.toUserView(user);
  }

  @Transactional
  public UserView update(String id, UpdateUserRequest request) {
    var user = userRepo.getById(id);
    userEditMapper.update(request, user);

    user = userRepo.save(user);

    return userViewMapper.toUserView(user);
  }

  @Transactional
  public UserView upsert(CreateUserRequest request) {
    var optionalUser = userRepo.findByUsername(request.username());

    if (optionalUser.isEmpty()) {
      return create(request);
    } else {
      UpdateUserRequest updateUserRequest = new UpdateUserRequest(request.fullName(), request.authorities());
      return update(optionalUser.get().getId(), updateUserRequest);
    }
  }

  @Transactional
  public UserView delete(String id) {
    var user = userRepo.getById(id);

    user.setUsername(
        user.getUsername().replace("@", String.format("_%s@", user.getId().toString())));
    user.setEnabled(false);
    user = userRepo.save(user);

    return userViewMapper.toUserView(user);
  }

  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepo
        .findByUsername(username)
        .orElseThrow(
            () -> new UsernameNotFoundException(
                format("User with username - %s, not found", username)));
  }

  public boolean usernameExists(String username) {
    return userRepo.findByUsername(username).isPresent();
  }

  public UserView getUser(String id) {
    return userViewMapper.toUserView(userRepo.getById(id));
  }
}
