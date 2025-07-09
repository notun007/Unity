import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PaymentMethodComponent } from './payment-method/payment-method.component';
// import { SelfBalanceRechargeComponent } from './self-balance-recharge/self-balance-recharge.component';
import { DepositComponent } from './deposit/deposit.component';


const routes: Routes = [

  { path: 'deposit', component: DepositComponent }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingRoutingModule { }





// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class SavingRoutingModule { }
