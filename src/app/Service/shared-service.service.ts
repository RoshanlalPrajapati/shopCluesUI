import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  whishlistedItems: any[] = [];
  allBagItems: any[] = [];
  allWishListProducts: any[] = [];
  allProductsData: any[] = [];

  constructor(public service: ServiceService) { }

  callAllWishlistItems() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userId = JSON.parse(userData).id;
    this.service.getWishListItems(userId).subscribe((res: any) => {
      this.allWishListProducts = res;
    })
  }

  getAllProductsData() {
    this.service.getAllProductsData().subscribe((res: any) => {
      this.allProductsData = res;
    })
  }

  getWishListItemsLength() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userId = JSON.parse(userData).id;
    this.service.getWishListItems(userId).subscribe((res: any) => {
      console.log('Wishlist items:', res);
      this.whishlistedItems = [];
      res.forEach((item: any) => {
        this.whishlistedItems.push(item?.productId);
      })
    })
  }

  getAllBagItemsLength() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return of([]);
    }
    const userId = JSON.parse(userData).id;
    return this.service.getAllBagItems(userId).pipe(
      tap((res: any) => {
        this.allBagItems = res;
      })
    );
  }
}
