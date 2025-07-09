import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandrecordComponent } from './landrecord/landrecord.component';


const routes: Routes = [

  { path: 'landrecord', component: LandrecordComponent }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandRoutingModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class LandRoutingModule { }
