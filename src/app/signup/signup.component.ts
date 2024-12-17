import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data: User[] = [];
  user: User = new User();

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    
  }
  register(): void {

    this.userService.request('POST', 'register', this.user).subscribe(
      (response: any) => {
        console.log(this.user)
        this.data.push(response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        if (error.status === 401) {
          this.userService.setAuthToken(null);
        } else {
          console.error('Error:', error.status, error.statusText);
        }
      }
    );
  }
}