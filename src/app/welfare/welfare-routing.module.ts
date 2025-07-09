import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application/application.component';
import { ApprovalQueueComponent } from './approval-queue/approval-queue.component';
import { DisbursementComponent } from './disbursement/disbursement.component';

const routes: Routes = [

  { path: 'application', component: ApplicationComponent },
  { path: 'approvalqueue', component: ApprovalQueueComponent },
  { path: 'disbursement', component: DisbursementComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfareRoutingModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class WelfareRoutingModule { }
