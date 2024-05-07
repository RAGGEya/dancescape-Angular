import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, ConfirmDialogModule, ButtonModule, DialogModule, CheckboxModule, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('loginFrm') loginFrm!: NgForm;
  @ViewChild('registerFrm') registerFrm!: NgForm;
  productList: any[] = [];
  categoryList: any[] = [];
  cartList: any[] = [];
  loginObj: loginObject = new loginObject();
  userLoginObj: userLoginObject = new userLoginObject();
  registerObj: registerObject = new registerObject();
  profileObj: userProfileObject = new userProfileObject();
  loggedInObj: any = {};
  displayModalLogin: boolean = false;
  displayModalRegistration: boolean = false;
  displayModalProfile: boolean = false;
  rememberMe: boolean = false;
  showLoginPassword: boolean = false;
  showRegisterPassword: boolean = false;
  showProfilePassword: boolean = false;
  isApiCallInProgress: boolean = false;
  phonePattern: string = "^((\\+91-?)|0)?[0-9]{10}$";
  passwordPattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\#?!@$%^&*\-])/;

  constructor(private prodSrv: ProductService, private router: Router, public loginSrv: LoginService, private http: HttpClient, private toastr: ToastrService) {
    const localData = sessionStorage.getItem('bigBasket_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      this.getCartByCustomerId(this.loggedInObj.custId);
    }
    this.prodSrv.cartUpdated$.subscribe((res: any) => {
      if (res) {
        this.getCartByCustomerId(this.loggedInObj.custId);
      }
    });

    const rememberLoginInfo = sessionStorage.getItem('rememberMeUser');
    if (rememberLoginInfo != null) {
      this.loginObj = JSON.parse(rememberLoginInfo);
      this.rememberMe = true;
    }
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategory();
  }

  pp() {
    this.http.get('http://freeapi.gerasim.in/api/User/GetAllUsers').subscribe((res: any) => {
      if (res.result) {
        console.log(res.data);
      }
    }, (err: any) => {
      console.log('Error from api ' + err.message);
    });
  }

  navigateToProducts(id: number) {
    this.router.navigate(['/products', id]);
  }

  remove(cartId: number) {
    this.prodSrv.removeProductByCartId(cartId).subscribe((res: any) => {
    });
  }

  getCartByCustomerId(custId: number) {
    this.prodSrv.getCartDataByCustId(custId).subscribe((res: any) => {
      if (res) {
        this.cartList = res;
        console.log(this.cartList)
      }
    });
  }

  getAllProducts() {
    this.prodSrv.getProductss().subscribe((res: any) => {
       // console.log(JSON.stringify(res));  
        this.productList = res;
      
    });
  }

  updateProfile() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.prodSrv.updateProfile(this.profileObj).subscribe((res: any) => {
        if (res) {
          this.isApiCallInProgress = false;
          this.toastr.success(res.message);
          this.closeProfileModal();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      });
    }
  }

  getCustomerByCustomerId() {
    this.prodSrv.getCustomerById(this.loggedInObj.custId).subscribe((res: any) => {
      if (res) {
        this.profileObj = res.data;
      }
    });
  }

  openLoginModal() {
    this.displayModalLogin = true;
  }

  closeLoginModal() {
    this.displayModalLogin = false;
    if (!this.rememberMe) {
      this.loginFrm.resetForm();
      this.rememberMe = false;
    } else {
      this.rememberMe = true;
    }
  }

  openRegisterModal() {
    this.displayModalRegistration = true;
  }

  closeRegisterModal() {
    this.displayModalRegistration = false;
    this.registerFrm.resetForm();
  }

  openProfileModal() {
    this.displayModalProfile = true;
    this.getCustomerByCustomerId();
  }

  closeProfileModal() {
    this.displayModalProfile = false;
    this.showProfilePassword = false;
  }

  register(registerFrm: NgForm) {
    if (registerFrm.valid) {
      if (!this.isApiCallInProgress) {
        this.isApiCallInProgress = true;
        this.loginSrv.registerCustomer(this.registerObj).subscribe((res: any) => {
          if (res) {
            this.isApiCallInProgress = false;
            this.loggedInObj = res.data;
            this.toastr.success('Registration SUCCESSFUL', 'SUCCESS');
            this.closeRegisterModal();
          } else {
            this.isApiCallInProgress = false;
            this.toastr.error(res.message);
          }
        }, (err: any) => {
          this.isApiCallInProgress = false;
          this.toastr.error(err.message);
        });
      }
    } else {
      Object.values(registerFrm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  refreshPage() {
  // Get the current URL
  const currentUrl = this.router.url;
  // Navigate to the same URL to refresh the page
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
login(loginFrm: NgForm) {
  if (loginFrm.valid) {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      // Hardcoded user details
      const hardcodedUser = {
        username: '1234567891',
        password: 'Testpassword22*'
      };
      
      // Check if the provided credentials match the hardcoded user
      if (this.loginObj.UserName === hardcodedUser.username && this.loginObj.UserPassword === hardcodedUser.password) {
        this.isApiCallInProgress = false;
        // If the credentials match, set the logged-in user object and perform necessary actions
        this.loggedInObj = {
          custId: 1,
          name: 'Test User',
          mobileNo: '1234567890',
          emailId: 'testuser@example.com'
        };
        sessionStorage.setItem('bigBasket_user', JSON.stringify(this.loggedInObj));
        this.toastr.success('LOGIN SUCCESSFUL', 'SUCCESS');
        if (this.rememberMe) {
          sessionStorage.setItem('rememberMeUser', JSON.stringify(this.loginObj));
        } else {
          sessionStorage.removeItem('rememberMeUser');
        }
        this.closeLoginModal();
        this.getCartByCustomerId(this.loggedInObj.custId);
      } else {
        // If the credentials do not match, show error message
        this.isApiCallInProgress = false;
        this.toastr.error('Invalid username or password');
      }
    }
  } else {
    // If form is invalid, mark all controls as touched
    Object.values(loginFrm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

  login1(loginFrm: NgForm) {
    if (loginFrm.valid) {
      const username = '1234567891'; // Hardcoded username
      const password = 'UserPassword22*'; // Hardcoded password
      if (!this.isApiCallInProgress) {
        this.isApiCallInProgress = true;
        this.loginSrv.login(username, password).subscribe((res: any) => {
          if (res.result) {
            this.isApiCallInProgress = false;
            this.toastr.success('LOGIN SUCCESSFUL', 'SUCCESS');
            sessionStorage.setItem('bigBasket_user', JSON.stringify(res.data));
            console.log(this.productList)
            // Store token in sessionStorage or localStorage if needed
            // Redirect or perform necessary actions upon successful login
            // For example:
            this.refreshPage(); // Navigate to the user page (replace '/checkout' with the actual path to the user page)
          } else {
            this.isApiCallInProgress = false;
            this.toastr.error(res.message);
            // Handle login failure
          }
        }, (err: any) => {
          this.isApiCallInProgress = false;
          this.toastr.error(err.message);
          // Handle login error
        });
      }
    } else {
      Object.values(loginFrm.controls).forEach(control => {
        control.markAsTouched();
      });
      // Handle form validation errors, if needed
    }
  }

  resetLoginModal() {
    this.loginObj = new loginObject();
  }

  resetRegisterModal() {
    this.registerObj = new registerObject();
  }

  onEyeClick() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  onRegisterEyeClick() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  onProfileEyeClick() {
    this.showProfilePassword = !this.showProfilePassword;
  }

  calculateTotalSubtotal() {
    let totalSubtotal = 0;
    for (const item of this.cartList) {
      totalSubtotal += (item.productPrice * item.quantity);
    }
    return totalSubtotal;
  }

  getAllCategory() {
    this.prodSrv.getCategorry().subscribe((res: any) => {
      // Get top-level categories (parentCategoryId = 0)
      this.categoryList = res.filter((list: any) => list.parentCategoryId === 0);
    });
  }

  loadSubcategories(parentCategory: any) {
    // Reset subcategories for all other parent categories
    this.categoryList.forEach((category: any) => {
      if (category !== parentCategory) {
        category.subcategories = undefined;
      }
    });
    // Fetch subcategories for the given parentCategoryId
    if (!parentCategory.subcategories) {
      setTimeout(() => {
        this.prodSrv.getCategory().subscribe((res: any) => {
          const subcategories = res.filter((list: any) => list.parentCategoryId === parentCategory.categoryId);
          // Update the corresponding parent category with subcategories
          parentCategory.subcategories = subcategories;
          // console.log(subcategories);
        });
      }, 100);
    }
  }

  resetSubcategories() {
    // Reset subcategories for all parent categories
    this.categoryList.forEach((category: any) => {
      category.subcategories = undefined;
    });
  }
  addToCart(product: any) {
    const localData = sessionStorage.getItem('bigBasket_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      const addToCartObj = {
        "cartId": 0,
        "custId": this.loggedInObj.custId,
        "productId": product.productId,
        "quantity": product.quantity || 1,
        "addedDate": new Date()
      };
      if (!product.isAddToCartApiCallInProgress) {
        product.isAddToCartApiCallInProgress = true;
        this.prodSrv.addToCart(addToCartObj).subscribe((res: any) => {
          if (res) {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.success("Product Added to cart");
            this.prodSrv.cartUpdated$.next(true);
           
          } else {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.error(res.message ? res.message : "Error adding product to cart");
          }
             
        },
      
          (err: any) => {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.error(err.message ? err.message : "An error occurred while adding the product to the cart. Please try again later.");
          }
          
          );
      }
    }
    else {
      this.toastr.warning("Please Login To Add Product");
    }
  }
}

export class loginObject {
  UserName: string;
  UserPassword: string;

  constructor() {
    this.UserName = '';
    this.UserPassword = '';
  }
}

export class userLoginObject {
  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = 'rinku@gmail.com';
    this.Password = 'Rinku@1';
  }
}

export class registerObject {
  CustId: number;
  Name: string;
  MobileNo: string;
  Password: string;

  constructor() {
    this.CustId = 0;
    this.Name = '';
    this.MobileNo = '';
    this.Password = '';
  }
}

export class userProfileObject {
  custId: number;
  name: string;
  mobileNo: string;
  password: string;

  constructor() {
    this.custId = 0;
    this.name = '';
    this.mobileNo = '';
    this.password = '';
  }
}