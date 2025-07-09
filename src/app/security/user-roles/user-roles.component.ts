import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
  providers: [ConfirmationService]
})
export class UserRolesComponent implements OnInit {

  rolesList: any;
  displayModal: boolean = false;
  viewInfo: any = {};
  frm!: FormGroup
  progressStatus=true;
  progressStatusSave=true;
  companyTypeList:any;
  constructor(private fb: FormBuilder, private router: Router, private confirmationService: ConfirmationService, private gSvc: GeneralService, private toastrService: ToastrService, private Authser: AuthService) {
    this.getRoles();
  }
  ngOnInit(): void {
    this.getRoles();
    this.createForm();
    this.getAllCompanyType();
   
  }
  createForm() {
    this.frm = this.fb.group({
      id: new FormControl(0),
      name: new FormControl("", Validators.required),
      isActive: new FormControl(true, Validators.required),
      cmnCompanyTypeId: new FormControl(null,Validators.required),
      createdBy: new FormControl(this.Authser.getUserId),
      modifiedBy: new FormControl(this.Authser.getUserId)
    });
  }
  getAllCompanyType() {
    this.gSvc.postdata("Common/Company/GetAllCompanyTypeByCompanyId", this.Authser.getCompany()).subscribe(res => {
      this.companyTypeList = res;
    }, err => {
      this.toastrService.error("Error! Company type list not found");
    })
  }
  save() {
    if (this.frm.invalid) return false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progressStatusSave = false;
        this.gSvc.postdata("Security/Role/Save", JSON.stringify(this.frm.value)).subscribe(res => {
          this.progressStatusSave = true;
          this.toastrService.success(res.message);
          this.createForm();
          this.getRoles();         
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

  getRoles() {
    this.progressStatus=false
    this.gSvc.postdata("Security/Role/GetAllSecRole", {}).subscribe(res => {
      this.progressStatus=true;
      this.rolesList = res;
    }, err => {
      this.progressStatus=true;
      this.toastrService.error("error");
    })

  }
  edit(res: any) {

    this.getRoles();
    this.frm.patchValue(res);
    /*this.gSvc.postdata("api/UserRole/UserRole/" + id, {}).subscribe((res: any) => {
      this.frm.patchValue(res);
      //this.frm.controls['name'].setValue(res.name);
      //this.frm.controls['remarks'].setValue(res.remarks);
      //this.frm.controls['id'].setValue(res.id);
    }, err => {
      this.toastrService.error("error");
    }) */
  }

  showModalDialog(res: any) {
    this.displayModal = true;
    this.reset();
    this.viewInfo = res;

  }

  reload() {
    this.router.navigateByUrl('/user/roles')
  }

  reset() {
    this.frm.reset();
    this.frm.controls['id'].setValue(0);
    this.frm.markAsPristine();
  }
  clear(table: Table) {
    table.clear();
  }

}
