import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.userService.setAuthToken(null);
  }
  ngOnDestroy() {
  }

  email: string = "";
  password: string = "";
  
  onSubmitLogin(): void {
    const loginData={
      email:this.email,
      motDePasse: this.password,
    };
    
   
    this.userService.request('POST', 'login', loginData).subscribe(
      (response: any) => {
        this.userService.setAuthToken(response.token);
        
        
        this.router.navigate(['/events']);
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

