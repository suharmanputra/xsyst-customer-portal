import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ContractPageComponent } from './contract-page/contract-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductdetailPageComponent } from './productdetail-page/productdetail-page.component';
import { PrivacypolicyPageComponent } from './privacypolicy-page/privacypolicy-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'dashboard/contract', component: ContractPageComponent },
  { path: 'dashboard/contract/product', component: ProductPageComponent },
  {
    path: 'dashboard/contract/product/:idcontract',
    component: ProductPageComponent,
  },
  {
    path: 'dashboard/contract/product/:idcontract/detail',
    component: ProductdetailPageComponent,
  },
  {
    path: 'dashboard/contract/product/:ididcontract/detail/:idproduct',
    component: ProductdetailPageComponent,
  },
  {
    path: 'privacypolicy',
    component: PrivacypolicyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
