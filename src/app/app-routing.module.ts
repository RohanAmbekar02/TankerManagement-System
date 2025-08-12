import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { DriverTableComponent } from './driver-table/driver-table.component';
import { TankerTableComponent } from './tanker-table/tanker-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { SavewaterComponent } from './savewater/savewater.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path :'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'driverform',
    component :DriverFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'driver-table',
    component:DriverTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tanker-form',
    component:TankerTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tanker-table',
    component:TankerTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent , 
    canActivate: [AuthGuard]
  },
  {
    path : 'location',
    component:LocationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'savewater',
    component: SavewaterComponent,
    canActivate: [AuthGuard]
  },
  {
    path :'report',
    component :ReportComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
