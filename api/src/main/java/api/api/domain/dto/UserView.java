package api.api.domain.dto;

public record UserView(
  String id,

  String username,
  String fullName,
  String phone,
  String avatar,
  String role,
  String token
) {

}
