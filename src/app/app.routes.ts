import { Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { ProductComponent } from './module/product/product.component';
import { Error4004Component } from './shared/error4004/error4004.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent}, 
    { path: 'cost', component: ProductComponent},
    { path: '404', component: Error4004Component},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];
