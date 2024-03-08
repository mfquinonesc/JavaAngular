package dev.backend.Controllers;

import org.springframework.web.bind.annotation.RestController;
import dev.backend.Models.UserModel;
import dev.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path = "api/v1/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@GetMapping
	public List<UserModel> getAllUsers() {
		return this.userService.getAllUsers();
	}

	@PostMapping
	public UserModel createUser(@RequestBody UserModel user) {
		return this.userService.createUser(user);
	}

	@GetMapping("/{id}")
	public Optional<UserModel> getUserById(@PathVariable("id") Long id) {
		return this.userService.getUserById(id);
	}

	@PutMapping("/{id}")
	public UserModel updateUserById(@PathVariable("id") Long id, @RequestBody UserModel user) {
		return this.userService.updateUserById(id, user);
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable("id") Long id) {
		this.userService.deleteUserById(id);
	}

}
