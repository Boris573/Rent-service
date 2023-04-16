package api.api.domain.dto;

import javax.validation.constraints.NotNull;

public record AuthRequest(
  @NotNull String username,
  @NotNull String password) {

  public AuthRequest() {
    this(null, null);
  }
}
