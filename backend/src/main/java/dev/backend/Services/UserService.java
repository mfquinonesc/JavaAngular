package dev.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public List<String> getUsers() {
        return List.of("crig", "sdfsd");
    }
}
