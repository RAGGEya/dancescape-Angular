import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  searchBox: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  login(username: string, password: string): Observable<{ result: boolean; message: string; data: any }> {
    // Check the hardcoded username and password
    if (username === '1234567891' && password === 'UserPassword22*') {
      // Return a successful response with hardcoded user data
      return of({
        result: true,
        message: 'LOGIN SUCCESSFUL',
        data: {
          // Add any user data you want to simulate here
          userId: 1,
          username: 'exampleuser',
          email: 'example@example.com',
          // Add more properties as needed
        }
      });
    } else {
      // Return a failed response if the credentials are incorrect
      return of({
        result: false,
        message: 'Invalid username or password',
        data: null
      });
    }
  }


  // Method to simulate logout
  logout() {
    // Here you can perform any logout actions, like clearing session data
    // For example:
    // sessionStorage.removeItem('bigBasket_user');
    // sessionStorage.removeItem('token');
  }

  // Method to simulate registering a customer
  registerCustomer(obj: any) {
    // Implement registration logic if needed
    // Here you can simulate registration by returning a successful response
    return of({
      result: true,
      message: 'Registration successful',
      data: obj // Return the registered user data if needed
    });
  }

  // Method to simulate user token login
  userTokenLogin(obj: any) {
    // Implement user token login logic if needed
    // Here you can simulate a successful user token login by returning a successful response
    return of({
      result: true,
      message: 'User token login successful',
      data: obj // Return the user data fetched using the token if needed
    });
  }
}
