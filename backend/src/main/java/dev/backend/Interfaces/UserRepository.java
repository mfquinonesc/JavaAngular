package dev.backend.Interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import dev.backend.Models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long>{

}
