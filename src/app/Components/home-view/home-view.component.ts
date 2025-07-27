import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../Service/shared-service.service';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent implements OnInit {

  carouselImages = [
    'assets/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.webp',
    'assets/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.webp',
    'assets/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.webp',
    'assets/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.webp',
    'assets/c3beb3ae-6895-458f-b1e0-f97becf05c5d1750618551514-Desktop-Banner--2---1-.webp',
  ];
  currentIndex = 0;
  intervalId: any;

  constructor(public service: ServiceService, private router: Router, public sharedService: SharedServiceService){

  }

  ngOnInit(): void {
    this.sharedService.getAllProductsData();
    this.sharedService.getAllBagItemsLength().subscribe((res:any)=>{})
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 3000);
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

}
