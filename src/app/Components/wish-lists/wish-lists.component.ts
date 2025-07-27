import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { SharedServiceService } from '../../Service/shared-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-wish-lists',
  templateUrl: './wish-lists.component.html',
  styleUrl: './wish-lists.component.css'
})
export class WishListsComponent implements OnInit {
  isModalOpen = false;
  openModalAsPerItemSelected: any
  size:any = ['S', 'M', 'L', 'XL'];
  selectedSizeByUser:any;

  constructor(public service: ServiceService, public sharedService: SharedServiceService, public snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.sharedService.callAllWishlistItems();
  }

  deleteItemFromWishlist(productId: any) {
    this.service.deleteItemFromWishList(productId).subscribe((res: any) => {
      if (res) {
        this.sharedService.callAllWishlistItems(); // as i delete some product then in real time data reflect sp i call callAllWishlistItems
        this.snackBar.open('Item Removed Successfully', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.sharedService.getWishListItemsLength(); // to update the wishlist count
      }
    }, (error: any) => {
      console.error('Error removing item from wishlist:', error);
      this.snackBar.open('Failed to remove item', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  }

  openPopupForMoveToBag(product: any) {
    this.isModalOpen = true;
    console.log('Product to move to bag:', product);
    this.openModalAsPerItemSelected = product;
  }

  closePopup() {
    this.isModalOpen = false;
  }

  selectedSizeByUserInWishList(data:any){
    this.selectedSizeByUser = data
  }

  addItemToBag(){
    const userData = localStorage.getItem('userData');
    if(!userData){
      return;
    }
    const userId = JSON.parse(userData).id;
    this.service.addItemToBag(userId,this.openModalAsPerItemSelected?.productId, this.selectedSizeByUser).subscribe((res:any)=>{
      this.closePopup();
      this.sharedService.getAllBagItemsLength().subscribe((res: any) => {})
      this.snackBar.open('Item added to bag successfully', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }

}
