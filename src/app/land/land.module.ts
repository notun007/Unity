import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandRoutingModule } from './land-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';

import { PanelModule } from 'primeng/panel';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReportViewerModule } from '../reportviewer/reportviewer.module';
import { TabViewModule } from 'primeng/tabview';

import { LandrecordComponent } from './landrecord/landrecord.component';



@NgModule({
  declarations: [
    LandrecordComponent
  ],
  imports: [
    ReportViewerModule,
    
    CommonModule, TranslateModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    InputTextModule, InputTextareaModule, MultiSelectModule, CascadeSelectModule,
    InputNumberModule, InputMaskModule, DropdownModule, AutoCompleteModule, CalendarModule, ChipsModule, TableModule, ConfirmDialogModule,
    MessagesModule, DialogModule,
    LandRoutingModule, PanelModule,ProgressSpinnerModule,TabViewModule
  ]
})
export class LandModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class LandModule { }
