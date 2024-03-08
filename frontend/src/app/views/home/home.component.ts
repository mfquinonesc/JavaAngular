import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userArray: UserModel[] = [];
  selectedUser: UserModel = new UserModel(0, '', '');

  constructor(private userService: UserService) {
    this.updateTable();
  }

  updateTable() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (value) => {
        if (value) {
          this.userArray = value as UserModel[];
        }
      },
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (value) => {
        this.updateTable();
      },
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (value) => {
        this.selectedUser = value as UserModel;
        this.userService.setSelectedUser(this.selectedUser);
      },
    });
  }

}
