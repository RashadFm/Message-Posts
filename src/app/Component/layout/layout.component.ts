import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/Services/layout/layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/DataManager/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentPageName: Observable<string>;

  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentPageName = this.layoutService.pageTitle;
  }

  get isLogged(): boolean {
    return this.authService.getActiveUserInfo()?.isLogged;
  }

  get getUserStatusText(): string {
    const username: string = this.authService.getActiveUserInfo()?.username;
    return this.isLogged ? `Welcome ${username}` : 'You are not login';
  }

  goToHomePage(): void {
    if (this.layoutService.isDataChange.getValue()) {
      if (window.confirm('Are you sure to leave?')) {
        this.router.navigate(['/Home']);
      }
    } else {
      this.router.navigate(['/Home']);
    }
  }

  logOut(): void {
    this.userService.logOut();
  }
}
