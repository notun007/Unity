import { Location, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  membershipList: any;
  genderList: any;
  maritalStatusList: any;
  membershipTypeList: any;
  religionList: any;
  mobileBankingList: any;
  countryList: any;
  divisionList: any;
  districtList: any;
  upazilaList: any;
  unionList: any;
  educationLevelList: any;
  designationList: any;
  serviceDepartmentList: any;
  serviceDivisionList: any;


  apiurl: any;
  frm!: FormGroup;
  frmSearch!: FormGroup;
  
  progressStatus: any = false;

  
  getArray: any = [{ id: 1, name: 'Mobile Banking', chield: [] }, { id: 2, name: 'Internet Banking', chield: [] }, { id: 3, name: 'Card', chield: [] }]
  
  subscribtionTypes: any;
  anFPaymentMethodId: any;
  isShowSslPay: boolean = false;

  _auth: any
  customernumber: any;
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

  ngOnInit(): void {

    var currUrl = this.route.snapshot.queryParamMap.get('urlNam');

    this.membershipForm();
    this.searchForm();

}

  membershipForm() {
      this.frm = this.fb.group({
      id: new FormControl(),
      name: new FormControl("", Validators.required),
      fatherName: new FormControl("", Validators.required),
      motherName: new FormControl("", Validators.required),
      spouseNameName: new FormControl(""),
      membershipNumber: new FormControl("", Validators.required),
      dateOfBirth: new FormControl(null),
      address: new FormControl(""),
      phoneNumber: new FormControl(""),
      alternatePhoneNumber: new FormControl(""),
      emailAddress: new FormControl("", Validators.email),
      shareCapital: new FormControl(0, Validators.required),
      membershipDate: new FormControl(null),
      membershipStatusId: new FormControl(null),
      photoUrl: new FormControl(""),
      nomineeName: new FormControl(""),
      nomineeAddress: new FormControl(""),
      nomineePhoneNumber: new FormControl(""),
      introducedByMemberId: new FormControl(null),
      nationalIdentificationNumber: new FormControl(""),
      genderId: new FormControl(null, Validators.required),
      maritalStatusId: new FormControl(null, Validators.required),
      membershipTypeId: new FormControl(null, Validators.required),
      religionId: new FormControl(null, Validators.required),
      mobileBankingId: new FormControl(null, Validators.required),
      countryId: new FormControl(null),
      divisionId: new FormControl(null),
      districtId: new FormControl(null),
      upazilaId: new FormControl(null),
      unionId: new FormControl(null),
      villageName: new FormControl(""),
      educationLevelId: new FormControl(null, Validators.required),
      designationId: new FormControl(null, Validators.required),
      serviceDepartmentId: new FormControl(null, Validators.required),
      serviceDivisionId: new FormControl(null, Validators.required),
      serviceLocationCountryId: new FormControl(null, Validators.required),
      serviceLocationDivisionId: new FormControl(null, Validators.required),
      serviceLocationDistrictId: new FormControl(null, Validators.required),
      serviceLocationUpazilaId: new FormControl(null, Validators.required),
      isActive: new FormControl(true, Validators.required),
      createBy: new FormControl(this.auth.getUserId()),
      createDate: new FormControl(new Date()),
      deleteBy: new FormControl(null),
      deleteDate: new FormControl(null),
      updateBy: new FormControl(null),
      updateDate: new FormControl(null)
    });
  }

  searchForm() {
    this.frmSearch = this.fb.group({
      membershipNumberSrch: new FormControl('')
    })
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
