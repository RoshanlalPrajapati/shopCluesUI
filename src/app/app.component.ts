import { Component, OnInit } from '@angular/core';
import { ServiceService } from './Service/service.service';
import { SharedServiceService } from './Service/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAdminOrUser:boolean = false;

  constructor(public service: ServiceService, public sharedService: SharedServiceService){}

  ngOnInit(): void {
    this.callAllWishlistItems();
  }
  
  callAllWishlistItems(){
    this.sharedService.getWishListItemsLength();
    this.sharedService.getAllBagItemsLength();
    this.sharedService.getAllBagItemsLength().subscribe((res:any)=>{})
    this.isUserOrAdmin();
  }

  isUserOrAdmin(){
    const userData = localStorage.getItem('userData');
    if(!userData){
      return;
    }
    return JSON.parse(userData)?.userRole === 'Admin';
  }
}
