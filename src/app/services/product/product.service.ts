import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable, Subject, map, retry, take, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class ProductService {

  constructor(private http: HttpClient) { }

  public cartUpdated$: Subject<boolean> = new Subject();
  private baseUrl = 'http://localhost:8081/api/products'; 
  private baseUrl1 = 'http://localhost:8081/api/categories';
  private baseUrl2 = 'http://localhost:8081/api/cart-items'; 
  private baseUrl3 = 'http://localhost:8081/api/carts/api/addToCart'; 
  private baseUrl4 = 'http://localhost:8081/api/carts/byCart'; 
  private baseUr5 = 'http://localhost:8081/api/products/deleteProduct'; 
  private baseUr7 = 'http://localhost:8081/api/orders'; 
  private baseUrl41 = 'http://localhost:8081/api/orders/GetAllSaleByCustomerId'; 
  private payementurl = 'http://localhost:8081/api/orders/payment-intent'; 
  private sale = 'http://localhost:8081/api/orders/OpenSaleBySaleId';
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }
  getCategorry(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl1);
  }

  createCategory(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT_CATEGORY + Constant.METHODS.CREATE_NEW_CATEGORY, obj);
  }

  getProductsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT_BY_CATEGORY + id);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT);
  }
  getProductss(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
    
  

  getProductById(productId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT_PRODUCTS + Constant.METHODS.GET_PRODUCT_BY_ID + productId);
  }

  saveProduct(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT_PRODUCTS + Constant.METHODS.CREATE_PRODUCT, obj);
  }

  updateProduct(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT_PRODUCTS + Constant.METHODS.UPDATE_PRODUCT, obj);
  }
  /*deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl1}/${productId}`);
  }*/
  /*deleteProduct(id: any): Observable<any[]> {
    return this.http.delete<any[]>(Constant.API_END_POINT_PRODUCTS + Constant.METHODS.DELETE_PRODUCT + id);
  }*/
  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUr5}/${id}`).pipe(
    );
  }
  

  addToCart1(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT_Cart + Constant.METHODS.ADD_TO_CART, obj);
  }
  addToCart(obj: any): Observable<any> {
    return this.http.post<any[]>(this.baseUrl3, obj);
  }

  getCartDataByCustId1(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CART_BY_CUST + custId);
  }
  getCartDataByCustId(custId: number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl4}/${custId}`)
  }
  removeProductByCartId(cartId: number): Observable<any[]> {
    return this.http.delete<any>(`${this.baseUrl2}/${cartId}`).pipe(
    );
  }
  removeProductByCartId1(cartId: number): Observable<any> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.REMOVE_CART + cartId);
  }
  //635463546464654654654654654
  placeOrder(obj: any): Observable<any> {
    return this.http.post<any[]>(this.baseUr7, obj);
  }

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_OFFERS).pipe(map((res: any) => res.data));
  }

  createNewOffer(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.CREATE_NEW_OFFER, obj)
  }

  getCustomerById(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CUSTOMER_BY_ID + custId);
  }

  updateProfile(obj: any): Observable<any> {
    return this.http.put<any>(Constant.API_END_POINT + Constant.METHODS.UPDATE_PROFILE, obj);
  }

  getAllSalesByCustomerId(custId: number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl41}/${custId}`)
  }

  cancelOrder(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.CANCEL_ORDER_BY_SALE_ID + saleId);
  }

  openSaleBySaleId(saleId: number): Observable<any[]> {
    return this.http.get<any>(`${this.sale}/${saleId}`)
  }

  createPaymentIntent(paymentInfo: any): Observable<any> {
    return this.http.post<any>(
      this.payementurl,
      paymentInfo
    );
  }
}
