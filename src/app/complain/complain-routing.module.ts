import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComplainComponent } from './create-complain/create-complain.component';

const routes: Routes = [
  { path: 'create', component: CreateComplainComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplainRoutingModule { }
