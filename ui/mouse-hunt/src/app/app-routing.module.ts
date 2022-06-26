import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './components/floor/floor.component';
import { MainComponent } from './components/main/main.component';
import { ReportComponent } from './components/report/report.component';
const routes: Routes = [
  {path:"", component:MainComponent},
  {path:"building/:bid/floor/:level", component:FloorComponent},
  {path:"report", component:ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
