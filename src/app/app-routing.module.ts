import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { WishListsComponent } from './Components/wish-lists/wish-lists.component';
import { BagItemsComponent } from './Components/bag-items/bag-items.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsPageComponent
  },
  {
    path: '', component: HomeViewComponent
  },
  {
    path: 'wishlist', component: WishListsComponent
  },{
    path: 'bagItem', component: BagItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
