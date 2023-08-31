import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexpageComponent } from './components/indexpage/indexpage.component';
import { ExpencesDashboardComponent } from './components/expences-dashboard/expences-dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '' , redirectTo:"/indexpage", pathMatch:'full'},
  {path:'indexpage' , component: IndexpageComponent },
  {path:'home', component:HomeComponent},
  {path:'dashboard' , component: ExpencesDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
