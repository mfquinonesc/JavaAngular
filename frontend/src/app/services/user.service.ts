import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = 'http://localhost:8080/api/v1/user';

  selectedUser = new BehaviorSubject<UserModel>(new UserModel(0, '', ''));

  constructor(private http: HttpClient) { }

  setSelectedUser(value: UserModel) {
    this.selectedUser.next(value);
  }

  getSelectedUser(): Observable<UserModel> {
    return this.selectedUser.asObservable();
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.path);
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(this.path, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }

  updateUserById(id: number, user: UserModel): Observable<any> {
    return this.http.put(`${this.path}/${id}`, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.path}/${id}`);
  }
}
