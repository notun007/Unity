import { Location, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { balanceService } from 'src/app/global';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { Utility } from 'src/app/services/utility.service';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  providers: [ConfirmationService]
})
export class MembershipComponent {


activeTabs: boolean[] = [false, false];

  curloc: string = '';
  
  subscriberList: any;
  genderList: any;
  countryList: any;
  divisionList: any;
  districtList: any;
  thanaList: any;
  unionList: any;
  
  subsType: any;
  apiurl: any;
  frm!: FormGroup;

  frmDeviceAssign!: FormGroup;
  frmSpecifyPackage!: FormGroup;

  progressStatus: any = false;

  
  getArray: any = [{ id: 1, name: 'Mobile Banking', chield: [] }, { id: 2, name: 'Internet Banking', chield: [] }, { id: 3, name: 'Card', chield: [] }]
  
  subscribtionTypes: any;
  anFPaymentMethodId: any;
  isShowSslPay: boolean = false;

  _auth: any
  customernumber: any;
  frmsrc!: FormGroup;
  visible: boolean = true;
  
  isAbleToassign: boolean = true;

  viewInfo: any
 
  customerNumber: any;
  visibleDeviceRegistration: any;

  constructor(private fb: FormBuilder
    , private utility: Utility
    , private router: Router
    , private confirmationService: ConfirmationService
    , private gSvc: GeneralService
    , private toastrService: ToastrService
    , private route: ActivatedRoute
    , private auth: AuthService
    , private _location: Location
    , private balService: balanceService
    , private datePipe: DatePipe
  ) {
    this.curloc = location.href;
    this._auth = auth;
    //this.getAppSetting();
  }

   deviceRegistration() {
    this.visibleDeviceRegistration = true;
  }
  refresh(){

  }

  saveSubscriber(){

  }
    
  search(){

  }

  reConnect(row:any){

  }

 

  clear(table: Table) {
    table.clear();
  }
 

}
