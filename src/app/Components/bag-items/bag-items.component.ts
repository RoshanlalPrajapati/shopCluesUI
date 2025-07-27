import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../Service/shared-service.service';
import { ServiceService } from '../../Service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag-items',
  templateUrl: './bag-items.component.html',
  styleUrl: './bag-items.component.css'
})
export class BagItemsComponent implements OnInit {

  size: any = ['S', 'M', 'L', 'XL', 'XXL'];
  quantity: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  totalPriceOfBagItems: number = 0;
  couponDiscount: number = 100;
  platformFee: number = 10;
  selectedItems: number[] = [];
  selectedAllProducts: any[] = [];
  isAddressAlreadyPresent: any = [];
  isAddressModalOpen: boolean = false;
  pincode: any
  addressline: any
  country: any
  state: any
  city: any
  phoneNo: any
  name: any
  isAddressModalOpenForChangeAddress: boolean = false;

  constructor(public sharedService: SharedServiceService, public service: ServiceService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.sharedService.getAllBagItemsLength().subscribe((res: any) => {

    })
    this.getUserAddress()
  }

  changeSize(event: Event, item: any) {
    const selectedSize = (event.target as HTMLSelectElement).value;
    item['size'] = selectedSize;
  }

  changeQuantity(event: Event, item: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    item['quantity'] = selectedValue;
    this.methodForCalculation();
  }

  deleteBagItems(productData: any) {
    this.service.deleteBagItemByProductId(productData?.productId).subscribe((res: any) => {
      this.snackBar.open('Item removed from bag successfully', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
      this.sharedService.getAllBagItemsLength().subscribe((res: any) => { })
    })
  }

  methodForCalculation() {
    this.totalPriceOfBagItems = this.sharedService.allBagItems.reduce((acc: number, item: any) => {
      if (this.selectedItems.includes(item.productId)) {
        const qty = item.quantity || 1;
        return acc + (item.price * qty);
      }
      return acc;
    }, 0);

    if (this.selectedItems.length > 0) {
      this.totalPriceOfBagItems = this.totalPriceOfBagItems + this.platformFee - this.couponDiscount;
    } else {
      this.totalPriceOfBagItems = 0;
    }

  }

  moveToWishListPage() {
    this.router.navigate(['/wishlist']);
  }

  checkedProductItems(item: any, event: any) {
    const checked = event.target.checked;
    this.selectedAllProducts.push(item);
    if (checked) {
      if (!this.selectedItems.includes(item.productId)) {
        this.selectedItems.push(item.productId);
      }
      const exists = this.selectedAllProducts.some(i => i.productId === item.productId);
      if (!exists) {
        this.selectedAllProducts.push(item);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(id => id !== item.productId);
      this.selectedAllProducts = this.selectedAllProducts.filter(i => i.productId !== item.productId);
    }
    this.methodForCalculation();
  }

  placeOrder() {
    console.log(this.selectedAllProducts);
    console.log("address: ", this.isAddressAlreadyPresent[0])

    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userId = JSON.parse(userData).id;
    const userEmail = JSON.parse(userData).emailId;

    const orderData = this.selectedAllProducts.map(item => ({
      user: {
        id: userId,
      },
      product: {
        id: item.productId,
      },
      quantity: item.quantity || 1,
      size: item.size,
      totalAmount: this.totalPriceOfBagItems,
    }));
    this.service.postOrderDataToOrderTable(orderData).subscribe((data: any) => {
      console.log("post data: ", data);
      const order = data[0]; // only accept one order, for dynamically we will change it later
      let option = {
        key: 'rzp_test_CDWMJaELnuBV17',
        amount: order.totalAmount * 100,
        currency: 'INR',
        name: 'E-Commerce',
        description: 'Order Payment',
        order_id: order.razorpayOrderId,

        handler: (response: any) => {
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };
          this.service.verifyPayment(payload).subscribe(res => {
            console.log("Payment verified:", res);
            this.snackBar.open('Payment successful!', 'Close', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
            this.service.deleteBagItemByProductId(order.product.id).subscribe((res: any) => {
              this.router.navigate(['/']);
            })
          }, (error: any) => {
            console.error('Payment verification failed:', error);
            this.snackBar.open('Payment verification failed. Please try again.', 'Close', {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
          });
        },

        receipt: data?.user?.emailId || userEmail,
        prefill: {
          name: "Roshan",
          email: data?.user?.emailId || userEmail,
        },
        theme: '#339900',
      }
      if (!(window as any).Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }
      let rzp = new Razorpay(option);
      rzp.open();
    })
  }


  openModalForAddress(addressDetails?: any) {
    if (this.isAddressModalOpenForChangeAddress) {
      this.isAddressModalOpenForChangeAddress = false
    }
    this.isAddressModalOpen = true;
    this.pincode = addressDetails?.pincode
    this.addressline = addressDetails?.addressLine1
    this.city = addressDetails.city
    this.state = addressDetails.state
    this.name = addressDetails.name
    this.phoneNo = addressDetails.phoneNo
    this.country = addressDetails.country
  }

  addAddress() {
    let obj = {
      addressLine1: this.addressline,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      phoneNo: this.phoneNo,
      name: this.name
    }
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userId = JSON.parse(userData).id;
    this.service.addUserAddress(userId, obj).subscribe((res: any) => {
      console.log("address: ", res);
      this.isAddressModalOpen = false;
      this.getUserAddress();
    })
  }

  getUserAddress() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userId = JSON.parse(userData).id;
    this.service.getUserAddress(userId).subscribe((res: any) => {
      console.log("get address:", res)
      this.isAddressAlreadyPresent = res
    })
  }

  openModalForChangeAddress() {
    this.isAddressModalOpenForChangeAddress = true;
  }

  closeModal() {
    this.isAddressModalOpen = false;
    this.isAddressModalOpenForChangeAddress = false;
  }

  deleteAddress(addressId: any) {
    this.service.deleteAddress(addressId).subscribe((res: any) => {
      console.log("address deleted: ", res);
      this.isAddressModalOpenForChangeAddress = false;
      this.getUserAddress();
    })
  }
  updateAddress(addressDetails: any) {
    this.isAddressAlreadyPresent[0].pincode = addressDetails?.pincode
    this.isAddressAlreadyPresent[0].addressline = addressDetails?.addressLine1
    this.isAddressAlreadyPresent[0].city = addressDetails.city
    this.isAddressAlreadyPresent[0].state = addressDetails.state
    this.isAddressAlreadyPresent[0].name = addressDetails.name
    this.isAddressAlreadyPresent[0].phoneNo = addressDetails.phoneNo
    this.isAddressAlreadyPresent[0].country = addressDetails.country
    this.isAddressModalOpenForChangeAddress = false;
  }

}
