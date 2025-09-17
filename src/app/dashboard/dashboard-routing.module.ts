import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsoDashboardComponent } from './mso-dashboard/mso-dashboard.component';
import { SubsDashboardComponent } from './subs-dashboard/subs-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from '../layout/app.layout.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },  
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'msodashboard', component: MsoDashboardComponent },  
  { path: 'msodashboard/:id', component: MsoDashboardComponent },
  { path: 'subsdashboard', component: SubsDashboardComponent },
  

// {
//   path: 'home',
//   component: MsoDashboardComponent,
//   children: [
//     {
//       path: 'msodashboard',
//       loadChildren: () => import('./mso-dashboard/mso-dashboard.component').then(m => m.MsoDashboardComponent)
//     }
//   ]
// }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
