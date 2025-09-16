import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    children: [
      {
        path : ':catId',
        loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule),
        canActivate: [AuthGuard]
        }
      ]
  },
  {
    path: 'product',
    children: [
      {
        path : ':productId',
        loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule),
        canActivate: [AuthGuard]
        }
      ]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule),
        canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ordersuccess',
    loadChildren: () => import('./pages/ordersuccess/ordersuccess.module').then( m => m.OrdersuccessPageModule),
    canActivate: [AuthGuard]
  },
    { 
    path: 'orders',
    children: [
      {
        path : '',
        loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule),
        canActivate: [AuthGuard]
      },

      {
        path : ':orderId',
        loadChildren: () => import('./pages/orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
