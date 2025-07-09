import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

interface user {
  id: number;
  name: string;
  isActive: boolean;
}
interface roleUser {
  id: number;
  secUserId: number;
  secRoleId: number;
  isActive: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
}
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles-mapping.component.html',
  styleUrls: ['./user-roles-mapping.component.css'],
  providers: [ConfirmationService]
})
export class UserRolesMappingComponent implements OnInit {
  frm!: FormGroup;
  companyTypeList:any;
  roles: any;
  users: any[] = [];
  //companyId: any = 1;
  //userRolesMappingList: any;
  //userMappingList: roleUser[] = [];
  userRoles: any; 
  selectedUsers: any[] = [];
  isCheck :boolean=true;
  activeUserRoles:any []=[];
  inActiveUserRoles:any []=[];
  progressStatusroleLess:boolean=true;
  progressStatusroleOriented:boolean=true;
  progressStatusSave:boolean=true;
  rolesPgStatus:boolean=true;
  companyListPgStatus:boolean=true;
  companyList:any;
  roleLessUsers: any;
  roleOrientedUsers:any;
  authUserId:any=this.Authser.getUserId();
  constructor(private fb: FormBuilder, private gSvc: GeneralService, private toastrService: ToastrService, private router: Router, private confirmationService: ConfirmationService, private Authser: AuthService) {
  }
  ngOnInit() {
    this.frm = this.fb.group({
      id: new FormControl(0),
      cmnCompanyTypeId: new FormControl(null, Validators.required),
      //role: new FormControl(null, Validators.required),
      role: new FormControl(null),
      companyId:new FormControl(null, Validators.required),
      secUserId: new FormControl(0),
      secRoleId: new FormControl(0),      
      isActive: new FormControl(true),
      createdBy: new FormControl(this.Authser.getUserId()),
      createdDate: new FormControl(new Date),
      modifiedBy: new FormControl(this.Authser.getUserId()),
      modifiedDate: new FormControl(new Date),
    });

    this.getCompanyType();
    //this.roleList();

    //this.getCompany();
  }

  getCompanyType() {
    this.gSvc.postdata("Common/Company/GetAllCompanyType", {}).subscribe(res => {
    this.companyTypeList = res;
    }, err => {
      
      this.toastrService.error(err.message);
    })
  }

  //New 28-05-2024

  getData(){
    
    this.getCompanyByCompanyType();
    this.roleList();
    
  }

  getCompanyByCompanyType() {
    this.companyListPgStatus=false;
    var cmnCompanyTypeId = this.frm.controls["cmnCompanyTypeId"].value;
    this.gSvc.postdata("Common/Company/GetCompanyByCompanyTypeId?companyTypeId="+ cmnCompanyTypeId, {}).subscribe(res => {
         this.companyList = res;
         this.companyListPgStatus=true;
    }, err => {
      this.companyListPgStatus=true;
      this.toastrService.error("Error! Company list not found ");
    })
  }

  //Old 28-05-2024
  // getCompany() {
  //   this.gSvc.postdata("Common/Company/GetSelfAndChildCompanyByCompanyId?companyId="+this.Authser.getCompany(), {}).subscribe(res => {
  //     this.companyList = res;
  //   }, err => {
  //     this.toastrService.error("Error! Company list not found ");
  //   })
  // }

  // old
  // getCompany() {
  //   this.gSvc.postdata("Common/Company/GetCompanyList", {}).subscribe(res => {
  //     this.companyList = res;
  //   }, err => {
  //     this.toastrService.error("Error! Company list not found ");
  //   })
  // }
  toggleItemCheck(user: user): void {
    //user.checked = !user.checked;
  }
   //new 29-04-2024
  roleList() {
    this.rolesPgStatus=false;
      //New: 28.05.2024
      var cmnCompanyTypeId = this.frm.controls["cmnCompanyTypeId"].value;
      this.gSvc.postdata("Security/Role/GetSecRoleByCompanyTypeId?cmnCompanyTypeId=" + cmnCompanyTypeId, {}).subscribe(res => {
      //Old: 28.05.2024
      //this.gSvc.postdata("Security/Role/GetSecRoleByCompanyId?cmnCompanyId="+this.Authser.getCompany(), {}).subscribe(res => {
        this.roles = res;
        this.rolesPgStatus=true;
      }, err => {
        this.rolesPgStatus=true;
        this.toastrService.error("error");
      })
    }

    //new: 11.11.24
    getUserList() {
      var roleId = this.frm.get("role")?.value;  
      if (roleId == null || roleId === '') {
        this.getRoleOrientedUser();
      } else {        
        this.getRoleLessUser();
        this.getRoleOrientedUser();
      }
    }

    //old
//  getUserList() {
//   this.getRoleLessUser();
//   this.getRoleOrientedUser();

//   //  if (this.frm.invalid) return false;
//   //   this.progressStatus=false;

//   //   var companyId = this.frm.get("companyId")?.value;
//   //   var roleId = this.frm.get("role")?.value;

//   //   this.gSvc.postdata("Security/UserRole/GetUserRolesByCompanyAndRoleId?companyId=" + companyId + "&roleId="+ roleId, {})
//   //   .subscribe(res => {     
//   //     this.users = res;
//   //     this.progressStatus=true;

//   //     this.activeUserRoles = this.users.filter((user: {
//   //       secRoleId: any; isActive: any;
//   //       }) => user.isActive==true && user.secRoleId==this.frm.get("role")?.value);
      
//   //       this.inActiveUserRoles = this.users.filter((user: {
//   //       secRoleId: any; isActive: any; 
//   //     }) => user.isActive==false && user.secRoleId==0);
//   //   }, err => {
//   //     this.progressStatus=true;
//   //     this.toastrService.error("error");
//   //   })

//   //   return true;
//   }

  
  getRoleLessUser() {
    this.progressStatusroleLess = false;
    var companyId = this.frm.get("companyId")?.value;
    this.gSvc.postdata("Security/UserRole/GetRoleLessUserByCompanyId?companyId="+ companyId, {}).subscribe(res => {
     this.roleLessUsers = res;
     this.users = this.roleLessUsers;
     this.progressStatusroleLess = true;
   }, err => {
    this.progressStatusroleLess = true;
     this.toastrService.error("error");
   })
 }

 getRoleOrientedUser() {
  this.progressStatusroleOriented = false;
  var companyId = this.frm.get("companyId")?.value;  
  var roleId = this.frm.get("role")?.value;
  //this.gSvc.postdata("Security/UserRole/GetRoleOrientedUserByCompanyRoleId?companyId="+companyId, {}).subscribe(res => {
    this.gSvc.postdata("Security/UserRole/GetRoleOrientedUserByCompanyRoleId?companyId="+companyId + "&roleId="+ roleId, {}).subscribe(res => {
   this.roleOrientedUsers = res;
   this.progressStatusroleOriented = true;
 }, err => {
  this.progressStatusroleOriented = true;
   this.toastrService.error(err);
 })
}



  userRolelist() {
    this.gSvc.postdata("Security/UserRole/GetByRoleId?roleid=" + this.frm.get('role')?.value, {}).subscribe(res => {
      this.userRoles = res;

    }, err => {
      this.toastrService.error("error");
    })
    
     // this.activeUserRoles= this.userRoles.forEach((list: {isActive: string;})=>{list.isActive=='true'});
     //this.inActiveUserRoles= this.userRoles.forEach((list: {isActive: string;})=>{list.isActive=='false'});
  }
  
  save() {
    
    this.selectedUsers=[];  
    
    const transformedList = this.users.map(item => ({

      id: 0,
      secUserId: item.secUserId,
      secRoleId: this.frm.get("role")?.value,
      isActive: item.isActive, //this.frm.get("isActive")?.value,
      createdBy: this.Authser.getUserId(),
      createdDate: new Date(),
      modifiedBy: this.Authser.getUserId(),
      modifiedDate: new Date()
    }));

    
    if (this.frm.invalid) return false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progressStatusSave = false;
        let reqestbody = {
          list: transformedList,
          roleId: this.frm.get("role")?.value,
        }

        this.gSvc.postdata("Security/UserRole/Save", JSON.stringify(reqestbody)).subscribe(res => {

          
          this.getUserList();
          this.toastrService.success("Saved success");
          this.progressStatusSave = true;
        }, err => {
          this.progressStatusSave = true;
          this.toastrService.error("Error ! User role is not saved . ");
        })

      },
      reject: () => {
      }

    })
    return false;
  }
  reset() {
    this.router.navigateByUrl('/home/security/userrolesmapping')
    this.frm.reset();
  }
  remove(res: any) {
    if(this.Authser.getRole()== this.frm.get("role")?.value){
      this.toastrService.error("Error ! You can not remove this . ");
      
    }else{          
    this.gSvc.postdata("Security/UserRole/Delete?Id="+ res.id,{}).subscribe(res => {
            
      if(res.success)
      {
        this.getUserList();
        this.toastrService.success(res.message);
      }
      else{
        this.toastrService.error(res.message);
      }
    }, err => {
      this.toastrService.error('Unable to complete operation, please try again later');
    })
    }
    
  }
  selectAll() {
    if(this.isCheck==true){
       this.isCheck=false;
      this.users.forEach(user => (user.isActive = true));
    }else{
      this.isCheck=true;
      this.users.forEach(user => (user.isActive = false));
      
    }
  }

}
