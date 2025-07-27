import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedServiceService } from '../../Service/shared-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {


  loginForm: FormGroup;
  registerForm: FormGroup;
  hidePassword = true;
  hideRegisterPassword = true;
  selectedTabIndex = 0;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceService, private router: Router, private dialogRef: MatDialogRef<RegisterPageComponent>, public sharedService: SharedServiceService) {
    this.selectedTabIndex = data?.defaultTab ?? 0;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', Validators.required],
      acceptPolicy: [true, Validators.requiredTrue],
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    
  }

  callAllWishlistItems(){
    this.sharedService.getWishListItemsLength()
    this.sharedService.getAllBagItemsLength();
  }

  onLogin() {
    if (this.loginForm.valid && this.loginForm.get('email')?.value && this.loginForm.get('password')?.value) {
      let obj = {
        emailId : this.loginForm.get('email')?.value,
        password : this.loginForm.get('password')?.value
      }
      this.service.loginUser(obj).subscribe((data:any)=>{
        if(data){
          localStorage.setItem('userData', JSON.stringify(data));
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.callAllWishlistItems();
          this.sharedService.getAllBagItemsLength().subscribe((res:any)=>{})
          this.loginForm.reset();
          this.dialogRef.close(data);
        }
      }, (error:any)=>{
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      })
    }else if(this.loginForm.get('email')?.invalid || this.loginForm.get('password')?.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      let obj = {
        emailId: this.registerForm.get('email')?.value,
        mobileNo: Number(this.registerForm.get('mobile')?.value),
        password: this.registerForm.get('password')?.value,
        username: this.registerForm.get('username')?.value
      }
      this.service.registerUser(obj).subscribe((data:any)=>{
        if(data){
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.registerForm.reset();
          this.selectedTabIndex = 0;
        }
      }, (error:any)=>{
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      })
    }
  }

}
