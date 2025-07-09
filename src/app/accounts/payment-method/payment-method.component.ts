import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
  providers: [ConfirmationService]
})
export class PaymentMethodComponent {

  list: any;  
  serviceProvider: any;
  paymentChannel: any;
  displayModal: boolean = false;
  formId = 0; 
  progressStatus: boolean = true;
  frm!: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private gSvc: GeneralService,
    private toastrService: ToastrService,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getFrm();
    this.getMethod();
    this.getServiceProvider();
    this.getPaymentChannel();
  }

  getFrm() {
    this.frm = this.fb.group({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
      anFFinancialServiceProviderId: new FormControl(),
      anFPaymentChannelId: new FormControl(),
      financialServiceProvider: new FormControl(),
      paymentChannel: new FormControl(),
      isActive: new FormControl(false),
      createdBy:new FormControl(this.auth.getUserId()),
      createdDate:new FormControl(new Date()),
      modifiedBy:new FormControl(this.auth.getUserId()),
      modifiedDate:new FormControl(new Date()),
    });
  }

  save() {
    debugger
    if (this.frm.invalid) return false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(JSON.stringify(this.frm.value))
        this.gSvc.postdata("api/PaymentMethod/Save", JSON.stringify(this.frm.value)).subscribe(res => {
          this.getFrm();
          this.getMethod();
          this.toastrService.success("Payment Method Saved");
        }, err => {
          this.toastrService.error("Error! Payment Method Not Saved");
        })
        return true;
      },
      reject: () => {

      }

    })
    return false;
  }

  getMethod() {
    this.progressStatus = false;
    this.gSvc.postdata("api/PaymentMethod/GetList", {}).subscribe(res => {
      this.list = res;
    }, err => {
      this.toastrService.error("Error! Data list Not Found");
    })
    this.progressStatus = true;
  }

  getServiceProvider() {
    this.progressStatus = false;
    this.gSvc.postdata("api/FinancialServiceProvider/GetAll", {}).subscribe(res => {
      this.serviceProvider = res;
    }, err => {
      this.toastrService.error("Error! Data list Not Found");
    })
    this.progressStatus = true;
  }

  getPaymentChannel() {
    this.progressStatus = false;
    this.gSvc.postdata("api/PaymentChannel/GetAll", {}).subscribe(res => {
      this.paymentChannel = res;
    }, err => {
      this.toastrService.error("Error! Data list Not Found");
    })
    this.progressStatus = true;
  }

  edit(res: any) {
    this.frm.patchValue(res);
  }

  reset() {
    this.frm.reset();
    this.frm.controls['id'].setValue(0);
  }
}
