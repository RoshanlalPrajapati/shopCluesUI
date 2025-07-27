import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { map } from 'rxjs';
import { env } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getCategories(headerName: any) {
    let url = environment.apiBaseUrl + 'categories/' + encodeURIComponent(headerName);
    return this.http.get(url);
  }

  getDataBasedOnHeaderAndSubCategory(headerName: any, subCategory: any) {
    let url = environment.apiBaseUrl + encodeURIComponent(headerName) + '/' + subCategory;
    return this.http.get(url);
  }

  loginUser(obj: any) {
    let url = environment.apiBaseUrl + 'login';
    return this.http.post(url, obj);
  }

  registerUser(obj: any) {
    let url = environment.apiBaseUrl + 'register';
    return this.http.post(url, obj);
  }

  //same admin wala
  // addCategories(data:any){
  //   let url = environment.apiBaseUrl + '/addCategories';
  //   return this.http.post(url, data);
  // }

  addProducts(formData: FormData) {
    let url = environment.apiBaseUrl + 'addProductDetailsInSubCategoryProductItems';
    return this.http.post(url, formData);
  }

  addToWishList(userId: number, productId: number) {
    let url = environment.apiBaseUrl + 'wishlist/add?userId=' + userId + '&productId=' + productId;
    return this.http.post(url, {});
  }

  getWishListItems(userId: number) {
    let url = environment.apiBaseUrl + 'wishlist/' + userId;
    return this.http.get(url);
  }

  deleteItemFromWishList(productId: any) {
    let url = environment.apiBaseUrl + 'wishlist/delete/' + productId;
    return this.http.post(url, {}, { responseType: 'text' }).pipe(map((res: any) => {
      return res;
    }))
  }

  getAllProductsData() {
    let url = environment.apiBaseUrl + 'getAllProducts';
    return this.http.get(url);
  }

  getAllBagItems(userId: number) {
    let url = environment.apiBaseUrl + 'addToBag/' + userId;
    return this.http.get(url);

  }

  addItemToBag(userId: number, productId: number, size: any) {
    let url = environment.apiBaseUrl + 'addToBag/addItemToBag?size=' + size + '&userId=' + userId + '&productId=' + productId;
    return this.http.post(url, {});
  }

  deleteBagItemByProductId(productId: any) {
    let url = environment.apiBaseUrl + 'addToBag/' + productId;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  postOrderDataToOrderTable(obj: any) {
    let url = environment.apiBaseUrl + 'createOrder';
    return this.http.post(url, obj);
  }

  verifyPayment(payload: any) {
    let url = environment.apiBaseUrl + 'paymentCallback';
    return this.http.post(url, payload, { responseType: 'text' });
  }

  addUserAddress(userId:any, obj:any){
    let url = environment.apiBaseUrl + 'addAddress/' + userId;
    return this.http.post(url, obj);
  }

  getUserAddress(userId:any){
    let url = environment.apiBaseUrl + 'getAddress/' + userId;
    return this.http.get(url);
  }

  deleteAddress(addressId:any){
    let url = environment.apiBaseUrl + 'deleteAddress/' + addressId;
    return this.http.post(url, {}, {responseType: 'text'});
  }

  getAllOrdersData(){
    let url = environment.apiBaseUrl + 'getOrderData'
    return this.http.get(url);
  }

}
