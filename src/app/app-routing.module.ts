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
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'dashboard' , component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'user' , component: UserComponent , canActivate: [AuthGuard]},
  { path: 'analytics' , component: AnalyticsComponent , canActivate: [AuthGuard]},
  { path: 'settings' , component: SettingsComponent , canActivate: [AuthGuard]},
  { path: 'content' , component: ContentComponent, canActivate: [AuthGuard]},
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
