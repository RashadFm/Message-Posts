import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/DataManager/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [' ', Validators.required],
    });
  }

  login(): void {
    if (this.userForm.invalid) {
      this.errorMessage = 'Please input valid username';
      return;
    }

    const user = this.userService.checkUser(this.userForm.value.username);

    if (user) {
      this.authService.setActiveUserInfo({
        id: user.id,
        username: user.username,
        website: user.website,
        fullName: user.name,
        isLogged: true
      });
      this.router.navigate(['/Home']);
    } else {
      this.errorMessage = 'Please input valid username';
    }
  }
}
