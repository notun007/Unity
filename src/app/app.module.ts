import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectButtonModule } from 'primeng/selectbutton';
import { interceptorProviders } from './interceptor/interceptors';
import { ToastrModule } from 'ngx-toastr';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { WebHomeComponent } from './website/home/home.component';
import { WebContactComponent } from './website/contact/contact.component';
import { WebAboutComponent } from './website/about/about.component';
import { WebTramsConditionComponent } from './website/trams-condition/trams-condition.component';
import { WebPackageComponent } from './website/package/package.component';
import { WebReturnRefundComponent } from './website/return-refund/return-refund.component';
import { TopNavBarComponent } from './website/topnavbar/topnavbar.component';
import { FooterComponent } from './website/footer/footer.component';
import { ChieldSliderComponent } from './website/chield-slider/chield-slider.component';
import { ChieldPackagesComponent } from './website/chield-packages/chield-packages.component';
import { ChieldProductComponent } from './website/chield-products/chield-products.component';
import { ChieldTecptrComponent } from './website/chield-tecptr/chield-tecptr.component';
import { ChieldPaywithComponent } from './website/chield-paywith/chield-paywith.component';
import { CarouselModule } from 'primeng/carousel';
import { WebProductsComponent } from './website/products/products.component';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { ChieldPaymentComponent } from './website/chield-payment/chield-payment.component';
import { PaymentComponent } from './website/payment/payment.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { httpInterceptor } from './services/http-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { PrivacyPolicyComponent } from './website/privacy-policy/privacy-policy.component';
//import { RegistrationComponent } from './membership/registration/registration.component';
//import { UnregistrationComponent } from './membership/unregistration/unregistration.component';
//import { ApplicationComponent } from './loan/application/application.component';
//import { DisbursementComponent } from './loan/disbursement/disbursement.component';
//import { CollectionComponent } from './loan/collection/collection.component';
// import { DepositComponent } from './saving/deposit/deposit.component';

//import { LandrecordComponent } from './land/landrecord/landrecord.component';
import { ExpenseComponent } from './expense/expense/expense.component';
//import { ApprovalQueueComponent } from './welfare/approval-queue/approval-queue.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {    return new TranslateHttpLoader(http, './assets/i18n/', '.json');}


@NgModule({
  declarations: [
    AppComponent, 
    NotfoundComponent, 
    LoadingSpinnerComponent,
    WebHomeComponent,
    WebContactComponent,
    WebAboutComponent,
    WebReturnRefundComponent,
    WebTramsConditionComponent,
    WebPackageComponent,
    TopNavBarComponent,
    FooterComponent,
    ChieldSliderComponent,
    ChieldPackagesComponent,
    ChieldProductComponent,
    ChieldTecptrComponent,
    ChieldPaywithComponent,
    WebProductsComponent,
    PaymentComponent,
    PrivacyPolicyComponent,
    ExpenseComponent
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SelectButtonModule,
    AppLayoutModule,
    CarouselModule,
    ConfirmDialogModule,
    TabViewModule, 
    PanelModule,
    DialogModule,
    AccordionModule,
    ProgressSpinnerModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'bn',
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'bn',
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
  ],
  providers: [ interceptorProviders, DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
