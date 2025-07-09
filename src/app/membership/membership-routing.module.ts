import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PaymentMethodComponent } from './payment-method/payment-method.component';
// import { SelfBalanceRechargeComponent } from './self-balance-recharge/self-balance-recharge.component';
import { RegistrationComponent } from './registration/registration.component';
import { UnregistrationComponent } from './unregistration/unregistration.component';

const routes: Routes = [

  { path: 'register', component: RegistrationComponent },
  { path: 'unregister', component: UnregistrationComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }



// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class MembershipRoutingModule { }
