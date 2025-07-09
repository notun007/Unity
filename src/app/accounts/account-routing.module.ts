import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { SelfBalanceRechargeComponent } from './self-balance-recharge/self-balance-recharge.component';

const routes: Routes = [

  { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'self-balance-recharge', component: SelfBalanceRechargeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsManagementRoutingModule { }
