import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterPageComponent } from './LoginOrSignUp/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { WishListsComponent } from './Components/wish-lists/wish-lists.component';
import { BagItemsComponent } from './Components/bag-items/bag-items.component';
import { AdminPanelScreenComponent } from './admin-panel-screen/admin-panel-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    NavBarComponent,
    FooterComponent,
    RegisterPageComponent,
    ProductsPageComponent,
    WishListsComponent,
    BagItemsComponent,
    AdminPanelScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
