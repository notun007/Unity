import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  providers: [ConfirmationService]
})
export class ModuleComponent {

  modulelist: any;
  frm!: FormGroup;
  displayModal: boolean = false;
  viewInfo: any = {};
  formId = 0;
  progressStatus=true;

  constructor(private fb: FormBuilder,
    private gSvc: GeneralService,
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService) {    
  }
 
  ngOnInit(): void {    
    this.getModuleList();
    this.getFrm();
  }


  getFrm() {
    this.frm = this.fb.group({
    id: new FormControl(0),
    name: new FormControl("",[Validators.required]),   
    nameBn: new FormControl(""),
    serialNo: new FormControl(null,[Validators.required]),
    icon: new FormControl(""),
    isActive: new FormControl(false), 
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
        this.gSvc.postdata("Security/Module/Save", JSON.stringify(this.frm.value)).subscribe(res => {
          if (res != undefined) {
            if (res.success) {
              this.getFrm();
              this.getModuleList();
              this.toastrService.success(res.message);
            }
            else {
              this.toastrService.warning(res.message);
            }
          }
          else {
            this.toastrService.warning('Unable to save Module');
          }
        }, err => {
          this.toastrService.error("Unable to save Module");
        })

        return true;
      },
      reject: () => {
      }
    })
    return false;
  }

  getModuleList() {
    this.progressStatus=false;
    this.gSvc.postdata("Security/Module/GetAll", {}).subscribe(res => {
      this.modulelist = res;
      this.progressStatus=true;
    }, err => {
      this.progressStatus=true;
      this.toastrService.error("Error! List not found");
    })

  }

  edit(res: any) {
    this.frm.patchValue(res);
  } 

  reload() {
    this.formId = 0;
    this.router.navigateByUrl('/admin/appmodules')
  }
  reset() { this.formId = 0; this.frm.reset(); this.frm.controls['id'].setValue(0), this.frm.pristine; }
  clear(table: any) {
    table.clear();
  }
}
