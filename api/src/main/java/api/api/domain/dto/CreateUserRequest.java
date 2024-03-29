package api.api.domain.dto;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public record CreateUserRequest(
  @NotBlank String username,
  @NotBlank String fullName,
  @NotBlank String password,
  @NotBlank String phone,
  @NotBlank String avatar,
  Set<String> authorities) {

  public CreateUserRequest {
    if (authorities == null) {
      authorities = new HashSet<>();
    }
  }

  public CreateUserRequest(
    String username,
    String fullName,
    String password,
    String phone,
    String avatar
  ) {
    this(username, fullName, password, phone, avatar, new HashSet<>());
  }
}
