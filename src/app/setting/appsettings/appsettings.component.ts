import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-appsettings',
  templateUrl: './appsettings.component.html',
  styleUrls: ['./appsettings.component.css'],
  providers: [ConfirmationService]
})
export class AppsettingsComponent {
  activeTabs: any;
  list: any;
  loanModelList: any;
  allowAutoSubscriberNumber: boolean = false;
  allowPurchase: boolean = false;
  allowSale: boolean = false;
  allowRenewableArrear: boolean = false;
  allowMigration: boolean = false;
  isProduction: boolean = false;
  frm!: FormGroup; 

  constructor(private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private gSvc: GeneralService,
    private toastrService: ToastrService,
    private auth: AuthService) {

  }
  ngOnInit(): void {
    this.getFrm();
    this.getAppSetting();
    this.getLoanModel();
  }

  getFrm() {
    this.frm = new FormGroup({
      id: new FormControl(0),
      applicationId: new FormControl(),
      allowSubscriberNumberWithPrefix: new FormControl(false,Validators.required),
      allowAutoSubscriberNumber: new FormControl(false,Validators.required),
      subscriberNumberLength: new FormControl(0,[Validators.required]),
      initialSubscriberNumber: new FormControl(null,[Validators.required]),
      allowPurchase: new FormControl(false,Validators.required),
      allowSale: new FormControl(false,Validators.required),
      allowRenewableArrear: new FormControl(null),
      allowNewPackageWithCash: new FormControl(false,Validators.required),
      allowPackageRenewalWithCash: new FormControl(false,Validators.required),
      isGlobalBalance: new FormControl(false,Validators.required),
      lnLoanModelId: new FormControl(),    
      allowDeviceLoanAtCash: new FormControl(),    
      allowDeviceLoanAtBkash: new FormControl(),    
      allowMigration: new FormControl(),
      isProduction: new FormControl(false,Validators.required),
      appKey: new FormControl(), 
      createdBy: new FormControl(this.auth.getUserId()),
      createdDate: new FormControl(new Date()),
      modifiedBy: new FormControl(this.auth.getUserId()),
      modifiedDate: new FormControl(new Date())
    });
  }

  saveAppSetting() {    
    if (this.frm.invalid) return false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(JSON.stringify(this.frm.value));
        debugger
        this.gSvc.postdata("Common/CmnAppSetting/UpdateAppSetting", JSON.stringify(this.frm.value)).subscribe(res => {
          //this.frm.reset();
          this.getAppSetting();        
          this.toastrService.success(res.message);
        }, err => {        
          this.toastrService.error("Error! Data Not Saved.");
        })
        return true;
      },
      reject: () => {
      }
    })
    return false;
  }


  getAppSetting() {
    this.gSvc.postdata("Common/CmnAppSetting/GetCmnAppSetting", {}).subscribe(res => {
      this.list = res;
      if (res) {
        this.frm.patchValue(res);
      } else {
        this.toastrService.error("No data found");
      }
    }, err => {
      this.toastrService.error("List not found");
    });
  }
  
  // getAppSetting() {
  //   this.gSvc.postdata("Common/CmnAppSetting/GetCmnAppSetting", {}).subscribe(res => {
  //     this.list = res;
  //   }, err => {
  //     this.toastrService.error("List not found");
  //   })
  // }

  getLoanModel() {
    this.gSvc.postdata("api/LnLoanModel/GetAll", {}).subscribe(res => {
      this.loanModelList = res;
    }, err => {
      this.toastrService.error("List not found");
    })
  }

  edit(res: any): void {
    this.getAppSetting();
    this.frm.patchValue(res);
  }

  reset() {
    this.frm.reset();
    this.frm.controls['id'].setValue(0);
    this.frm.markAsPristine();
  }
}

