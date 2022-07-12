import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FloorComponent } from './components/floor/floor.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ReportComponent } from './components/report/report.component';
import { SignupComponent } from './components/signup/signup.component';
const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"/home"},
  {path:"signup", component:SignupComponent,canActivate:[AuthGuard],data:{role:"Admin"}},
  {path:"login", component:LoginComponent},
  {path:"home", component:MainComponent, canActivate:[AuthGuard]},
  {path:"building/:bid/floor/:level", component:FloorComponent, canActivate:[AuthGuard]},
  {path:"report", component:ReportComponent, canActivate:[AuthGuard]},
  {path:"**", pathMatch:"full", redirectTo:"/home"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
