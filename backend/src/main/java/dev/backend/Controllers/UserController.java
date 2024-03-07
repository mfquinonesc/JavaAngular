package dev.backend.Controllers;

import org.springframework.web.bind.annotation.RestController;
import dev.backend.Services.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public List<String> getUsers() {
		return this.userService.getUsers();
	}

}
