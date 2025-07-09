import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utility } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { balanceService } from 'src/app/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-digital-head',
  templateUrl: './self-balance-recharge.component.html',
  styleUrls: ['./self-balance-recharge.component.css'],
  providers: [ConfirmationService]
})
export class SelfBalanceRechargeComponent implements OnInit {
  digitalHeadList: any;

  displayModalHistory: boolean = false;
  viewInfo: any = {};
  formId = 0;
  companies: any;
  frm!: FormGroup;
  selfRechargeFrm!: FormGroup;
  rechargeList: any;
  progressStatus: boolean = true;
  progressStatusSave: boolean = true;
  paymentMethods: any[] = [];//[{name:"Cash",id:1},{name:"Bkash",id:2},{name:"Rocket",id:3},{name:"Nagad",id:3}]
 
  cash: Boolean = false;
  mfs: boolean = true;
  bank: boolean = true;
  balance: number = 0;
  organizationList:any;
  isMso: boolean = this.auth.isMso();
  curloc:any;
  paymentStatusId:string='';
  paymentMsg: string = '';
  PaymentInfoVisible: boolean = false;
  
  isShowSslPay: boolean = false;
  getArray: any = [{ id: 1, name: 'Mobile Banking', chield: [] }, { id: 2, name: 'Internet Banking', chield: [] }, { id: 3, name: 'Card', chield: [] }]
  gateways: any;
  getWayaList: any;
  clientCurrentBalance:any;
  clientAvailableBalance:any;

  constructor(
   
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private gSvc: GeneralService,
    private toastrService: ToastrService,
    private auth: AuthService,
    public util: Utility,
    private route: ActivatedRoute,
    private _location: Location
  ) {
   this.curloc = location.href;
  }
 
  ngOnInit(): void {
    
    debugger
    var currUrl = this.route.snapshot.queryParamMap.get('urlNam');
    if (currUrl != null) {
      var trx = this.route.snapshot.queryParamMap.get('trxID');
      var message = this.route.snapshot.queryParamMap.get('message'); 
      alert(message);
      if (trx != null) {
        var sts:any = this.route.snapshot.queryParamMap.get('status');
        this.paymentMsg = sts == 0 ? 'Something went wrong. Please contact with your service provider.' : sts == 1 ? 'Payment Success!!!' : sts == 2 ? 'Payment Fail!!!' : sts == 3 ? 'Payment Cancel.' : '';
        this.PaymentInfoVisible = true;
        this.paymentStatusId=sts.toString();
      }

      this._location.replaceState(currUrl);
    }
    this.createSelfRechageFrm();
    this.transferCreate();
    this.getActivePaymentMethod();
    this.getRecharge();
    this.getClientByCompanyId();
    this.getClientCurrentRechargeBalance();
    this.getClientAvailableRechargeBalance();

    //alert(this.curloc.split('?')[0]);

  }
  transferCreate() {
    this.frm = this.fb.group({
      id: new FormControl(0),
      date: new FormControl(new Date()),
      refNo: new FormControl("asd"),
      amount: new FormControl('',[Validators.required,Validators.min(0)]),
      payMode: new FormControl(),
      bank: new FormControl(),
      chequeNo: new FormControl(),
      chequeDate: new FormControl(),
      remarks: new FormControl(),
      walletNo: new FormControl(),
      trxId: new FormControl(),
      docFile: new FormControl(),
      filePath: new FormControl(),
      isActive: new FormControl(true),
      balance: new FormControl(0),
      anFPaymentMethodId: new FormControl(5,[Validators.required]),
      // fundSourceId: new FormControl(this.auth.getCompany()),
      // receiverId: new FormControl(1),
      createdBy: new FormControl(this.auth.getUserId()),
      createdDate: new FormControl(new Date()),
      modifiedBy: new FormControl(this.auth.getUserId()),
      modifiedDate: new FormControl(new Date()),
    });
  }
  createSelfRechageFrm(){
    this.selfRechargeFrm = this.fb.group({
      id: new FormControl(0),
      anFPaymentMethodId: new FormControl(5,[Validators.required]),
      date: new FormControl(new Date()),
      amount: new FormControl('',[Validators.required,Validators.min(0)]),
      remarks: new FormControl(''),
      fundSourceId: new FormControl(this.auth.getCompany()),
      //payerId: new FormControl(this.auth.getCompany()),
      //receiverId:new FormControl(1),
      createdBy: new FormControl(this.auth.getUserId()),
      createdDate: new FormControl(new Date()),
      modifiedBy: new FormControl(this.auth.getUserId()),
      modifiedDate: new FormControl(new Date()),
    });
  }

  getClientByCompanyId() {
    this.gSvc.postdata("Common/Company/GetClientByCompanyId/" + this.auth.getCompany(), {}).subscribe((res: any) => {
      this.organizationList = res;
    }, err => {
      this.toastrService.error("Error! Data Not Found");
    })
  }

  // save() {
    
  //   if(this.auth.isMso())
  //       {
  //        var comId=this.frm.controls['payerId'].value;
  //         if( comId ==null || comId ==='undefined' || comId==0){
  //           this.toastrService.error("Please select company.");
  //         return;
  //         }
  //       }else{
         
  //         this.frm.controls['payerId'].setValue( this.auth.getCompany());
  //       }
    
  //   if (this.frm.invalid) return false;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {     
  //       var objReq={
  //         obj:this.frm.value,
  //         isMso: this.auth.isMso()
  //       }
  //       this.progressStatusSave = false;
  //       this.gSvc.postdata("api/ClientRecharge/Save", JSON.stringify(objReq)).subscribe(res => {
  //         this.progressStatusSave = true;
  //         if (res.success) {
  //           this.getRecharge();
  //           this.toastrService.success("Data Saved Success");
            
  //           this.reset();
  //           if (this.fileToUpload) {
  //             this.submitForm(res.operationId);

  //           }
  //         } else {
  //           this.toastrService.error("Error! Data Not Saved");
  //         }
  //         this.progressStatusSave = true;
  //       }, err => {
  //         this.progressStatusSave = true;
  //         this.toastrService.error("Error! Data Not Saved");
  //       })

  //     },
  //     reject: () => {

  //     }
  //   })
  //   return false;
  // }

  clickOnBtnFile() {
   
    this._fileInput.nativeElement.value = "";
    this._fileInput.nativeElement.click();
  }

  public fileSrc: any;
  fileToUpload: any;
  @ViewChild('fileInput') _fileInput!: ElementRef;
  onFileChange() {
    debugger;
    if (this._fileInput.nativeElement.files.length > 0) {
      let file = this._fileInput.nativeElement.files[0];
      var arryext = file.name.split(".");
      var ext = arryext[arryext.length - 1];
      var extlwr = ext.toLowerCase();
      var fileIndex = this.fileTypes.indexOf(extlwr);
      var fileSize = file.size / 1024 / 1024; // in MB
      if (fileSize > 5) {
        this.toastrService.error('File size exceeds 5 MB', 'File Upload Error!');
      } else if (fileIndex === -1) {
        this.toastrService.error('File type not supported. Valid file types are ' + this.fileTypes, 'File Type Error!');
      } else {
        this.fileSrc = this.util.openSanitizedReportByFile(file);
        this.fileToUpload = file;
      }
    }
  }

  public fileTypes: any = ["jpg", "jpeg", "png", "gif"];

  submitForm(rechargeId: string) {
    const formData: FormData = new FormData();
    formData.append('fileSource', this.fileToUpload);
    formData.append('rechargeId', rechargeId.toString());
    return this.gSvc.postdatafile('api/ClientRecharge/UploadFile', formData).subscribe(() => alert("File uploaded"));
  }
  

  //New:28.12.2024
  getActivePaymentMethod() {
    this.gSvc.postdata("api/PaymentMethod/GetActivePaymentMethod", {}).subscribe((res: any) => {       
      const filteredMethod = res.find((method: any) => method.id === 5); // Replace 'desired_id' with the actual value.
      
      // If the value is found, assign it; otherwise, set an empty array.
      this.paymentMethods = filteredMethod ? [filteredMethod] : [];

    }, err => {
      this.toastrService.error("Error! Data Not Found");
    });
}

  //Old:28.12.2024
  //Useful
  // getActivePaymentMethod() {
  //   this.gSvc.postdata("api/PaymentMethod/GetActivePaymentMethod", {}).subscribe((res: any) => {
  //     this.paymentMethods = res;
  //   }, err => {
  //     this.toastrService.error("Error! Data Not Found");
  //   })
  // }

  getRecharge() {
    this.progressStatus = false;
    var comId=null;
    comId=this.auth.getCompany();
    var obj = { 
      cmnCompanyId :  comId,
      paymentMethodId:5,
    }
    this.gSvc.postdata("api/ClientRecharge/GetClientRechargeHistoryByAnyKey", JSON.stringify(obj)).subscribe((res: any) => {
      this.rechargeList = res;
      this.progressStatus = true;
    }, err => {
      this.progressStatus = true;
      this.toastrService.error("Error! Data Not Found");
    })
  }
 
  //Useful
  paymentMethodChange() {

    var paymentMethod = this.frm.get('anFPaymentMethodId')?.value;

    if (paymentMethod == 1) {     //Cash
      this.cash = false;
      this.mfs = true;
      this.bank = true;
    }
    else if (paymentMethod == 2) { //MFS
      this.cash = true;
      this.mfs = false;
      this.bank = true;
    }
    else if (paymentMethod == 3) { //MFS
      this.cash = true;
      this.mfs = false;
      this.bank = true;
    }
    else if (paymentMethod == 4) { //MFS
      this.cash = true;
      this.mfs = false;
      this.bank = true;
    }
    else if (paymentMethod == 5) { //Bank
      this.cash = true;
      this.mfs = true;
      this.bank = false;
    }
  }

  edit(res: any) {
    this.formId = 1;
    this.frm.patchValue(res);
    this.fileSrc = this.util.openSanitizedReportByUrl(environment.baseurl + res.filePath);
  }

  approveHistories: any[] = [];
  loadHistory(res: any) {
    debugger;
    this.approveHistories = res.approveHistories;
    this.displayModalHistory = true;
  }

  reload() {
    this.formId = 0;
    this.router.navigateByUrl('/account/balance-recharge')
  }
  clear(table: Table) {
    table.clear();
  }
  reset() {
    this.formId = 0;
    this.createSelfRechageFrm();
    this.selfRechargeFrm.markAsPristine();
  }

  rechargeMyWallet() {
    
    this.getPaymentList();   
  }
  getRechargeList(){

  }
  getClientCurrentRechargeBalance() {
    //New: 25.06.2024
    this.gSvc.postdata("api/ClientRecharge/GetScpClientCurrentRechargeBalanceByClientId?companyId=" + this.auth.getCompany(), {}).subscribe(res => {
    //Old: : 25.06.2024
    //this.gSvc.postdata("api/ClientRecharge/GetLastRechargeByClientId?companyId=" + this.auth.getCompany(), {}).subscribe(res => {
    if (res != null) {
        this.clientCurrentBalance = res.balance;
    }
}, err => {
})
}
getClientAvailableRechargeBalance() {
  this.gSvc.postdata("api/ClientRecharge/GetScpClientAvailableRechargeBalanceByClientId?companyId=" + this.auth.getCompany(), {}).subscribe(res => {
  if (res != null) {
      this.clientAvailableBalance = res.balance;
  }
}, err => {
this.toastrService.error(err);
})
}
  getPaymentList() {
    
    var param = {
        fundSourceId: this.selfRechargeFrm.controls["fundSourceId"].value,
        //receiverId: this.selfRechargeFrm.controls['receiverId'].value,
        amount: this.selfRechargeFrm.controls["amount"].value,
        remarks: this.selfRechargeFrm.controls['remarks'].value,
        paymentMethodId: this.selfRechargeFrm.controls["anFPaymentMethodId"].value,
        createdBy: this.selfRechargeFrm.controls['createdBy'].value,
        retUrl: this.curloc.split('?')[0]
    };
    
    //New: 02.11.2024
    var url = "api/ClientRecharge/GetSSLCommerzGrantToken";
    //Old: 02.11.2024
    //var url = "api/MFSPGW/GetSSLCommerzGrantToken";
    this.gSvc.postparam(url, param).subscribe(res => {
      this.gateways = res.desc;
      this.getData();

      if (this.gateways.length > 0) {
        this.isShowSslPay = true;
      } else {
        this.isShowSslPay = false;
      }
    })
   
  }

  getData() {
   
    this.gateways.forEach((element: any) => {
      if (element.type == 'internetbanking') {
        var mb = this.getArray.filter((x: any) => x.id == 2)[0];
        mb.chield.push(element);
      } else if (element.type == 'mobilebanking') {
        var mb = this.getArray.filter((x: any) => x.id == 1)[0];
        mb.chield.push(element);
      } else {
        var mb = this.getArray.filter((x: any) => x.id == 3)[0];
        mb.chield.push(element);
      }
    });
  }
  getWayaLists(data: any) {
   
    var dt = this.getArray.find((x: { id: any; }) => x.id == data);
    this.getWayaList = dt.chield;
  }
}