import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerService {

  constructor() { }

  setUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users'));
  }
}
