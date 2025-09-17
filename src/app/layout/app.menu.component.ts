import { Component, OnInit, OnDestroy} from '@angular/core';
import { GeneralService } from '../services/general.service';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {

    // token: any;

    // loginId: any;

    model: any[] = [];
    // model1: any[] = [];
    link: string[] = []

     log!: FormGroup;
    // nullValue:any=null;
    //  //**Asad-17092025*//
    // //show:any= this.auth.getOldUserName();
    pMenu: any = {
        label: "",
        items: []
    };
    ModuleMenu: any = {
        label: "",
        items: []
    };

    menulist: any[] = [];

    childMenu = {
        label: "",
        icon: "",
        routerLink: this.link
    }
    // childMenuArry: any[] = [];
    // parentsMenu: any[] = [];
    // Module: any[] = [];
    
     isMobile: boolean = false;
    // secUser:any

    // switchAllow: boolean = false;

    constructor(
                private toastrService: ToastrService,
                public layoutService: LayoutService,
                private router: Router,
                private fb: FormBuilder, 
                private gSvc: GeneralService,
                private auth: AuthService
            ) {
                this.log= this.fb.group({
                username: new FormControl(),
                userPassword: new FormControl(),
          })

            if (window.screen.width < 541) { // 768px portrait
                this.isMobile = true;
                } else {
                        this.isMobile = false;
            }
    
        //**Asad-17092025*//
        //this.getSecUserByLoginId();
        //New Addition on 18092025
        this.loadMenu('12fb1f96-b3cf-481b-bc4a-a52e26b0f33b');    
     }

     ngOnInit(): void {
      
        alert('menu calling');

    }


    //   ngOnInit(): void {
    //     alert('menu calling');

                 
    //    // this.loadMenu('12fb1f96-b3cf-481b-bc4a-a52e26b0f33b');        

    //     //**Asad-17092025*// 
    //     //this.loadMenu(this.auth.getRole());
        
    // }
      
      loadMenu(id: any) {

        
        this.gSvc.getdata("api/MenuPermission/GetModuleMenuByRole?roleId=" + id).subscribe((res: any) => {
        //this.gSvc.getdata("Security/MenuPermission/ModuleMenuByRole?id=" + id).subscribe((res: any) => {
           
        // console.log(JSON.stringify(res));
        // alert(JSON.stringify(res));

               
        if(this.auth.getLanguage()=='bn'){
            for (var item of res) {
                this.ModuleMenu.label = item.labelBn;
                this.ModuleMenu.icon = item.icon;

                this.ModuleMenu.items = [];
                for (var m of item.items) {
                    this.pMenu.label = m.labelBn;                 
                    this.pMenu.items = [];
                    for (let child of m.items) {
                        this.childMenu.label = child.labelBn;
                        this.childMenu.icon = child.icon;
                        this.childMenu.routerLink = [child.routerLink];
                        this.pMenu.items.push({ label: child.labelBn, icon: child.icon, routerLink: [child.routerLink] });
                    }
                    this.ModuleMenu.items.push({ label: m.labelBn, icon: item.icon, items: this.pMenu.items });
                }
                this.menulist.push({ label: item.label, items: this.ModuleMenu.items });
            }
           }else{
            for (var item of res) {

                alert('got it: ' + res.length);

                this.ModuleMenu.label = item.label;

                this.ModuleMenu.icon = item.icon;
                this.ModuleMenu.items = [];
                for (var m of item.items) {
                    this.pMenu.label = m.label;                    
                    this.pMenu.items = [];
                    for (let child of m.items) {
                        this.childMenu.label = child.label;
                        this.childMenu.icon = child.icon;
                        this.childMenu.routerLink = [child.routerLink];
                        this.pMenu.items.push({ label: child.label, icon: child.icon, routerLink: [child.routerLink] });
                    }
                    this.ModuleMenu.items.push({ label: m.label, icon: item.icon, items: this.pMenu.items });
                }
                this.menulist.push({ label: item.label, items: this.ModuleMenu.items });

            }

           }
           
            
            this.model = this.menulist;
        }, (err: any) => {
          
        })
    }
    
    // getSecUserByLoginId() {
       
    //     //New
    //     if(this.auth.getCompanyTypeShortName() == 'SLSO'){
    //         this.loginId = this.auth.getSecondLevelLoginId();
    //     }
    //     else if(this.auth.getCompanyTypeShortName() == 'LSO'){
    //         this.loginId = this.auth.getFirstLevelLoginId();
    //     }

    //     this.gSvc.postdata("Security/User/GetSecUserByLoginId?loginId=" + this.loginId, {}).subscribe(res => {
    //       this.secUser= res;
    //       this.log.patchValue({
    //         username: this.secUser.loginID,
    //         userPassword: this.secUser.password
    //         });
    //     }, err => {
    //       this.toastrService.error("Error! Company list not found ");
    //     })
    //   }
   

    logout() {
        this.auth.logout();
    }
   
}
