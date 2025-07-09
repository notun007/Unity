import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmRoutingModule } from './hrm-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DesignationComponent } from './designation/designation.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

import { ReportViewerModule } from '../reportviewer/reportviewer.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    EmployeeComponent,
    DesignationComponent


  ],
  imports: [
    ReportViewerModule,
    CommonModule,
    HrmRoutingModule,TranslateModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    InputTextModule,InputTextareaModule,MultiSelectModule,CascadeSelectModule,
    InputNumberModule,InputMaskModule,DropdownModule,AutoCompleteModule,CalendarModule,ChipsModule,TableModule,ConfirmDialogModule,
    MessagesModule,DialogModule,CheckboxModule,PanelModule,ProgressSpinnerModule
  ]
})
export class HrmModule { }
