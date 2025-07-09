import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';

import { AppsettingsComponent } from './appsettings/appsettings.component';


const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'appsettings', component: AppsettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
