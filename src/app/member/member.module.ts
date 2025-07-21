import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';

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

import { MembershipComponent } from './membership/membership.component';
import { RegistrationComponent } from './registration/registration.component';
import { UnregistrationComponent } from './unregistration/unregistration.component';

import { AccordionModule } from 'primeng/accordion'; // <-- Import here
import { ConfirmationService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
// import { ButtonModule } from 'primeng/button';
import { DirectiveModule } from '../directives/directive.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    RegistrationComponent,
    UnregistrationComponent,
    MembershipComponent
    
  ],
  imports: [
    ReportViewerModule,
    
    CommonModule, TranslateModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    InputTextModule, InputTextareaModule, MultiSelectModule, CascadeSelectModule,
    InputNumberModule, InputMaskModule, DropdownModule, AutoCompleteModule, CalendarModule, ChipsModule, TableModule, ConfirmDialogModule,
    MessagesModule, DialogModule,
    MemberRoutingModule, PanelModule,ProgressSpinnerModule,TabViewModule,
    // ButtonModule,
    PanelModule, DirectiveModule,SelectButtonModule,RadioButtonModule, AccordionModule,PaginatorModule
  ],
  providers: [ConfirmationService]
})
export class MemberModule { }

