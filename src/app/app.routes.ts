import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404Component } from './utils/error404/error404.component';
import { HomeComponent } from './modules/page/home/home.component';
import { ProductComponent } from './modules/components/product/product.component';

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent},
    { path: 'product', component: ProductComponent},
    { path: '404', component: Error404Component},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
