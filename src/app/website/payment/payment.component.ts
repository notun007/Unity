import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { WebMenuComponent } from 'src/app/website/menu/menu.component';
import { TopNavBarComponent } from '../topnavbar/topnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { ConfirmationService } from 'primeng/api';
import { Utility } from 'src/app/services/utility.service';

@Component({
  selector: 'app-web',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ConfirmationService]
})
export class PaymentComponent implements OnInit {

  @ViewChild(TopNavBarComponent) topNavBar!: TopNavBarComponent;
  @ViewChild(FooterComponent) footer!: FooterComponent;
  curloc: string = '';
  
  paymentMsg:any
  paymentInfoVisible: boolean = false;
  paymentStatusId:string='';
  assignedDevices:any[]=[];
  info: any;
  subscriberDevices: any;
  devicesPackageInfo: any;

  customerNo:string='';
  subscriberName:string='';
  userInfos: any;
  userInfoList:any[]=[];

  frmPackageRenew!: FormGroup;
  isShowSslPay: boolean = false;
  getArray: any = [{ id: 1, name: 'Mobile Banking', chield: [] }, { id: 2, name: 'Internet Banking', chield: [] }, { id: 3, name: 'Card', chield: [] }]
  gateways: any;
  getWayaList: any;
  trams:boolean = false;
  textColor:any
  constructor(private router: Router
    , public layoutService: LayoutService
    , private toastrService: ToastrService
    , private gSvc: GeneralService
    , private confirmationService: ConfirmationService
    , private fb: FormBuilder
    , private route: ActivatedRoute
    , private _location: Location
    , public util: Utility,) {
    this.curloc = location.href;
  }
  
  ngOnInit(): void {
    var currUrl = this.route.snapshot.queryParamMap.get('urlNam');
 
    if (currUrl != null) {
      //var trx = this.route.snapshot.queryParamMap.get('trxID');
      var message = this.route.snapshot.queryParamMap.get('message'); 
      this.paymentMsg = message;
      var sts:any = this.route.snapshot.queryParamMap.get('status');
      this.textColor = sts == 1 ? 'text-success' : 'text-warning';
      this._location.replaceState(currUrl);
    }    
    this.createPackageRenew();
   
  };

  

  createPackageRenew() {
    this.frmPackageRenew = this.fb.group({
      scpSubscriberInvoiceDetailId: new FormControl(),
      packageName: new FormControl(),
      scpSubscriberId: new FormControl(),
      prdDeviceNumberId: new FormControl(),
      amount: new FormControl(),
      discount: new FormControl(),
      endDate: new FormControl(),
      scpPackageId: new FormControl(),
      deviceNumber: new FormControl(''),
      period: new FormControl(),
      packageType: new FormControl(),
      value: new FormControl([Validators.required, Validators.min(0)]),
      expDate: new FormControl(),
      isActive: new FormControl(true),
      createdBy: new FormControl(),
      createdDate: new FormControl(new Date()),
      modifiedBy: new FormControl(),
      modifiedDate: new FormControl(),
      packageValue: new FormControl(),
      paymentType: new FormControl(),
      anFPaymentMethodId: new FormControl(),
      trams: new FormControl(false),
    });
  }
  getSubscriptionInfoByCustomerNo() {
    this.createPackageRenew(); 
    this.subscriberName = '';
    this.paymentMsg = null;
    if (this.customerNo == '' || this.customerNo == null || this.customerNo == undefined) {
      return;
    }
    this.assignedDevices = [];
    var url = "api/SubscriberPackage/GetSubscriptionInfoByCustomerNo?customerNo="+this.customerNo;
    this.gSvc.postdata(url, {}).subscribe(res => {
      if(res != null ||res != undefined){

        if(res == undefined){
          return;
        }

        this.assignedDevices = res;
        this.subscriberName = res.package.subscriberName;
        this.frmPackageRenew.controls['scpSubscriberId'].setValue(res.id);
        this.frmPackageRenew.controls['scpSubscriberInvoiceDetailId'].setValue(res.scpSubscriberInvoiceDetailId);
        
        this.frmPackageRenew.controls['deviceNumber'].setValue(res.package.deviceNumber);

        this.frmPackageRenew.controls['packageName'].setValue(res.package.packageName);
        this.frmPackageRenew.controls['prdDeviceNumberId'].setValue(res.package.prdDeviceNumberId);
        this.frmPackageRenew.controls['amount'].setValue(res.package.rate);
        this.frmPackageRenew.controls['expDate'].setValue(res.package.endDate);
        this.frmPackageRenew.controls['anFPaymentMethodId'].setValue( 5);
        
      }
    }, err => {
     
    })
  }

  //Garbage Code: 03022025
  // getInfoOnChange() {
  //   var dvcNumber = this.frmPackageRenew.controls['deviceNumber'].value;
  //   if(dvcNumber == ''){
  //       this.frmPackageRenew.setValue({
  //       packageName:'',
  //       prdDeviceNumberId: null,
  //       amount: null,
  //       expDate: null,
  //       anFPaymentMethodId: 5,
  //     });    
  //   }
  //   else
  //   {
  //   if(this.assignedDevices.length > 0){
  //   var model= this.assignedDevices.filter(x=> x.deviceNumber==dvcNumber)[0];
  //    this.frmPackageRenew.controls['packageName'].setValue(model.package.packageName);
  //   this.frmPackageRenew.controls['prdDeviceNumberId'].setValue(model.package.prdDeviceNumberId);
  //   this.frmPackageRenew.controls['amount'].setValue(model.package.rate);
  //   this.frmPackageRenew.controls['expDate'].setValue(model.package.endDate);
  //   this.frmPackageRenew.controls['anFPaymentMethodId'].setValue( 5);
  //   }
  //   }
  // }

  //Commented On 03.11.2024
  savePackageRenew() {
    if(this.frmPackageRenew.controls['trams'].value == false ){
      this.toastrService.warning('Please  read the trams & conditions and tick the check box.')
      return;
    }

    this.getPaymentList();   
  }
 

  getPaymentList() {
    var param = {
      scpSubscriberInvoiceDetailId: this.frmPackageRenew.controls["scpSubscriberInvoiceDetailId"].value,
      scpSubscriberId:this.frmPackageRenew.controls["scpSubscriberId"].value,
      paymentMethodId: this.frmPackageRenew.controls['anFPaymentMethodId'].value,
      retUrl: this.curloc.split('?')[0]
    };

    var url = "api/SubscriberPackage/GetSSLCommerzGrantToken";
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
    debugger;
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
    debugger
    var dt = this.getArray.find((x: { id: any; }) => x.id == data);
    this.getWayaList = dt.chield;
  }
}
