import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPageComponent } from '../../LoginOrSignUp/register-page/register-page.component';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../Service/shared-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  headers = ['MOBILES & MORE', 'Men', 'Women', 'Home & Kitchen', 'SPORTS & MORE'];
  categoryToShowOnUIBasedOnHeader:any[] = [];
  activeHeader: string = '';
  toShowOrHideHeaderData:boolean = false
  loggedInData:any;
  showModal:boolean = false;
  name:any;
  price:any;
  desc:any
  subCategory:any
  header:any
  selectedFile: File | null = null;

  constructor(private dialog: MatDialog, public service: ServiceService, private router: Router, public sharedService: SharedServiceService){
  }

  ngOnInit(): void {
    const isUserLoggedIn = localStorage.getItem('userData');
    if(isUserLoggedIn){
      this.loggedInData = JSON.parse(isUserLoggedIn);
    }
  }

  moveToHomePage(){
    this.router.navigate(['/']);
  }

  openModalForLoginRegister(event:any){
    if(event === 'Log out'){
      localStorage.removeItem('userData');
      this.loggedInData = null;
      this.sharedService.whishlistedItems = [];
      this.sharedService.allBagItems = [];
      this.router.navigate(['/']);
      return;
    }
    const tabIndex = event?.target?.innerHTML === 'Log in' ? 0 : 1;
    if(event?.target?.innerHTML === 'Log in' || event === 'register' || event === 'Log out'){
    const dialogRef = this.dialog.open(RegisterPageComponent, {
      data: { defaultTab: tabIndex },
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: false,
    })

    dialogRef.afterClosed().subscribe((data:any) => {
      if (data) {
        this.loggedInData = data;
      }
    });
  }
  }

  getCategoriesData(headerName:any){
    this.categoryToShowOnUIBasedOnHeader = [];
    if (this.activeHeader === headerName && this.toShowOrHideHeaderData) {
      this.toShowOrHideHeaderData = false;
      this.activeHeader = '';
      return;
    }
    this.activeHeader = headerName;
    this.toShowOrHideHeaderData = true;
    this.service.getCategories(headerName).subscribe((data:any)=>{
        this.categoryToShowOnUIBasedOnHeader = data;
      })
  }

  getDataBasedOnHeaderAnsSubCategory(header:any, event:any){
    let subCategoryName = event?.target?.outerText;
    this.service.getDataBasedOnHeaderAndSubCategory(header, subCategoryName).subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['/products'], {
        queryParams: { header: header, subCategory: subCategoryName }
      })
    })
  }



  //ye tb uncomment krenge jb admin wala section bn jyeaga
  // header:any;
  // subSubbHeader:any;
  // postService(){
  //   let obj = {
  //     header: this.header,
  //     subCategory: this.subSubbHeader
  //   }
  //   this.service.addCategories(obj).subscribe((data:any)=>{
  //     console.log(obj)
  //   })
  // }

  addProductsModal(){
    this.showModal = !this.showModal;
  }

  addProducts(){
    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('name', this.name);
    formData.append('price', this.price);
    formData.append('desc', this.desc);
    formData.append('subCategory', this.subCategory);
    formData.append('header', this.header);
    this.service.addProducts(formData).subscribe((data:any)=>{
      console.log("data: ", data);
    })
  }

onFileSelected(event: any) {
  if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
  }
}

goToWishlist(){
  this.router.navigate(['/wishlist']);
}

goToBagItemPage(){
  this.router.navigate(['/bagItem']);
}

}
