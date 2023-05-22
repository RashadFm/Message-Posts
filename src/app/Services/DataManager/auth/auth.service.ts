import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setActiveUserInfo(user: any): void {
    localStorage.setItem('activeUser', JSON.stringify(user));
  }

  getActiveUserInfo(): any {
    return JSON.parse(localStorage.getItem('activeUser'));
  }

  reflesh(): void {
    localStorage.setItem('activeUser', JSON.stringify({ id: 0, username: '', website: '', fullName: '', isLogged: false }));
  }
}
