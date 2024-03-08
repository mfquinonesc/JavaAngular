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
  isSortedById: boolean = false;
  isSortedByName: Boolean = false;
  isSortedByDate: Boolean = false;
  searchText: string = '';

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

  sortByIdUp(a: UserModel, b: UserModel) {
    return a.identification - b.identification;
  }

  sortByIdDown(a: UserModel, b: UserModel) {
    return b.identification - a.identification;
  }

  sortById() {
    this.isSortedById = !this.isSortedById;
    if (this.isSortedById) {
      this.userArray.sort(this.sortByIdUp);
    } else {
      this.userArray.sort(this.sortByIdDown);
    }
  }

  filter() {
    if (this.searchText != '') {
      this.userArray = this.userArray.filter((e) => {
        return e.name.includes(this.searchText) ||
          e.birth_date.includes(this.searchText) ||
          e.identification.toString().includes(this.searchText);
      });
    } else {
      this.updateTable();
    }
  }

  sortByName(a: UserModel, b: UserModel) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  }

  sortByNames(){
    this.userArray.sort(this.sortByName);
  }

}
