import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { UserComponent} from './user/user.component';
import {AnalyticsComponent } from './analytics/analytics.component';
import {SettingsComponent } from './settings/settings.component';
import {ContentComponent} from './content/content.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent },
  { path: 'dashboard' , component: DashboardComponent },
  { path: 'user' , component: UserComponent },
  { path: 'analytics' , component: AnalyticsComponent },
  { path: 'settings' , component: SettingsComponent },
  { path: 'content' , component: ContentComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
