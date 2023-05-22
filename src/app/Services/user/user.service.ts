import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'app.config';
import { User } from '../../Models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../DataManager/auth/auth.service';
import { UserDataManagerService } from '../DataManager/userDataManager/user-data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private userDataManageService: UserDataManagerService,
    private router: Router,
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<any>(AppConfig.settings.baseUrl + 'users');
  }

  checkUser(username: string): User {
    const users: User[] = this.userDataManageService.getUsers();
    return users.filter(user => user.username === username).find(Boolean);
  }

  logOut(): void {
    this.authService.reflesh();
    this.router.navigate(['/Home']);
  }
}
