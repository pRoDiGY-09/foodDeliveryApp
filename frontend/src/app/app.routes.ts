import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'**', redirectTo: 'home', pathMatch: 'full'}
];
