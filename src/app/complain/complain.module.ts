import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';

import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DirectiveModule } from '../directives/directive.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ReportViewerModule } from '../reportviewer/reportviewer.module';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { CreateComplainComponent } from './create-complain/create-complain.component';
import { ComplainRoutingModule } from './complain-routing.module';


@NgModule({
  declarations: [
    CreateComplainComponent
  ],
  exports: [
  ],
  imports: [
    ReportViewerModule,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ComplainRoutingModule,
    FormsModule, ReactiveFormsModule,
    InputTextModule, InputTextareaModule, MultiSelectModule, CascadeSelectModule,
    InputNumberModule, InputMaskModule, DropdownModule, AutoCompleteModule, CalendarModule, ChipsModule, TableModule, ConfirmDialogModule,
    MessagesModule, DialogModule, RadioButtonModule,
    TabViewModule, PanelModule, DirectiveModule,SelectButtonModule,AccordionModule
  ],
  
})
export class ComplainModule { }