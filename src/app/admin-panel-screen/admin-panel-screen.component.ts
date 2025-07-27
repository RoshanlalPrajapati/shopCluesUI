import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { SharedServiceService } from '../Service/shared-service.service';

@Component({
  selector: 'app-admin-panel-screen',
  templateUrl: './admin-panel-screen.component.html',
  styleUrl: './admin-panel-screen.component.css'
})
export class AdminPanelScreenComponent implements OnInit {

  orders: any[] = [];

  constructor(
    public service: ServiceService,
    public sharedService: SharedServiceService
  ){}

  ngOnInit(): void {
      this.getAllOrdersDetails();
  }

  getAllOrdersDetails() {
  this.service.getAllOrdersData().subscribe((res: any) => {
    this.orders = res;
    console.log("All Orders Data: ", res);
  });
}

}
