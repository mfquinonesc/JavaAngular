import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {

  userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    identification: ['', [Validators.required]]
  });

  isUpdate: boolean = false;
  selectedUser: UserModel = new UserModel(0, '', '');

  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.fillForm();
  }

  get name() {
    return this.userForm.controls.name;
  }
  get birthdate() {
    return this.userForm.controls.birthdate;
  }
  get identification() {
    return this.userForm.controls.identification;
  }

  get nameValue() {
    return this.userForm.value.name;
  }
  get birthdateValue() {
    return this.userForm.value.birthdate;
  }
  get identificationValue() {
    return this.userForm.value.identification as unknown as number;
  }

  fillForm() {
    this.userService.getSelectedUser().subscribe({
      next: (value) => {
        this.selectedUser = value as UserModel;
        this.isUpdate = this.selectedUser.id! > 0;
        this.userForm.setValue({
          name: this.selectedUser.name,
          birthdate: this.selectedUser.birth_date.substring(0, 10),
          identification: this.selectedUser.identification.toString(),
        })
      },
    });
  }

  clearForm() {
    this.userForm.setValue({
      name: '',
      birthdate: '',
      identification: ''
    });
  }

  createUser() {
    if (this.userForm.valid) {
      const newUser = new UserModel(this.identificationValue, this.nameValue!, this.birthdateValue!);
      this.userService.createUser(newUser).subscribe({
        next: (value) => {
          this.onSave.emit(value);
          this.clearForm();          
        },
      })
    } else {
      alert('Debe llenar todos los camppos del formulario!');
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const updateUser = new UserModel(this.identificationValue, this.nameValue!, this.birthdateValue!);
      this.userService.updateUserById(this.selectedUser.id!, updateUser).subscribe({
        next: (value) => {
          this.onSave.emit(value);
          this.clearForm();         
        },
      });
    }
  }

  submit(){
    if(this.isUpdate){
      this.updateUser();
    }else{
      this.createUser();
    }   
    this.isUpdate = false;
  }
}
