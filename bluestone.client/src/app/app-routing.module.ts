import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { ProductsComponent } from './products/products.component';
import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { ProductAddEditComponent } from './products/product-add-edit/product-add-edit.component';
import { ProductViewComponent } from './products/product-view/product-view.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/add',
    component: ProductAddEditComponent
  },
  {
    path: 'products/:productId',
    component: ProductViewComponent
  },
  {
    path: 'products/edit/:productId',
    component: ProductAddEditComponent
  },
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
