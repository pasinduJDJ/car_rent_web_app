import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  userpassword: string = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  constructor(private userSerivce: UserService, private router: Router) { }

  login() {
    if (this.username == null || this.username === '') {
      this.alertMessage = 'Please Enter user name ';
      this.alertType = 'danger';
    } else if (this.userpassword == null || this.userpassword === '') {
      this.alertMessage = 'Please Enter password ';
      this.alertType = 'danger';
    } else {
      if (this.userpassword == 'sample@gmail.com' && this.userpassword == 'sample@gmail.com') {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
        this.alertMessage = 'Invalid Username or Password ';
        this.alertType = 'danger';
      }
    }
  }
}
