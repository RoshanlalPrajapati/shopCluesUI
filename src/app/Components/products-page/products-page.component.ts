import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedServiceService } from '../../Service/shared-service.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {

  allProductsBasedOnCategory:any[] = [];
  header: String = '';

  constructor(private route: ActivatedRoute, private service: ServiceService, private snackBar: MatSnackBar, public sharedService: SharedServiceService){

  }

  ngOnInit(): void {
      this.showDataAsPassedFromHomeView();
      this.callAllWishlistItems()
  }

  showDataAsPassedFromHomeView(){
    this.route?.queryParams.subscribe((data:any)=>{
        this.header = data['header'];
        let subCategory = data['subCategory'];
        if(this.header && subCategory){
          this.service.getDataBasedOnHeaderAndSubCategory(this.header, subCategory).subscribe((res:any)=>{
            this.allProductsBasedOnCategory = res;
          })
        }
      })
  }

  callAllWishlistItems(){
    this.sharedService.getWishListItemsLength();
    this.sharedService.getAllBagItemsLength();
  }

  addToWishlist(productData:any){
    const userData = localStorage.getItem('userData');
    if(!userData){
      return;
    }
    const userId = JSON.parse(userData).id;
    console.log('Wishlist item ID:', this.sharedService.whishlistedItems);
    if(this.sharedService.whishlistedItems?.includes(productData?.id)){
      this.snackBar.open('Product already in wishlist', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }

    this.service.addToWishList(userId, productData.id).subscribe((res:any)=>{
      console.log('Product added to wishlist:', res);
      this.snackBar.open('Product added to wishlist', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.callAllWishlistItems();
    })
  }

}
