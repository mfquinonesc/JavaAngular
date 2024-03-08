package dev.backend.Services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import dev.backend.Interfaces.UserRepository;
import dev.backend.Models.UserModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public UserModel createUser(UserModel user) {
        return this.repository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return this.repository.findAll();
    }

    public Optional<UserModel> getUserById(Long id) {
        return repository.findById(id);
    }

    public UserModel updateUserById(Long id, UserModel user) {
        Optional<UserModel> fuser = repository.findById(id);
        if (fuser.isPresent()) {
            UserModel upuser = fuser.get();
            upuser.setBirth_date(user.getBirth_date());
            upuser.setIdentification(user.getIdentification());
            upuser.setName(user.getName());
            return repository.save(upuser);
        }else{
            return user;
        }
    }

    public void deleteUserById(Long id) {
        repository.deleteById(id);
    }
}
