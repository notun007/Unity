import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentStockComponent } from './current-stock/current-stock.component';
import { CurrentStockSummaryComponent } from './current-stock-summary/current-stock-summary.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [

  { path: "current-stock", component: CurrentStockComponent },
  { path: "stock-summary", component: CurrentStockSummaryComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,ProgressSpinnerModule]
})
export class ReportRoutingModule { }
