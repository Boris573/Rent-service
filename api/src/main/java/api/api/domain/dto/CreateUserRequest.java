package api.api.domain.dto;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public record CreateUserRequest(
  @NotBlank String username,
  @NotBlank String fullName,
  @NotBlank String password,
  Set<String> authorities) {

  public CreateUserRequest {
    if (authorities == null) {
      authorities = new HashSet<>();
    }
  }

  public CreateUserRequest(
    String username,
    String fullName,
    String password
  ) {
    this(username, fullName, password, new HashSet<>());
  }
}
