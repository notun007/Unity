import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
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

    token: any;

    loginId: any;

    model: any[] = [];
    model1: any[] = [];
    link: string[] = []

    log!: FormGroup;
    nullValue:any=null;
    show:any= this.auth.getOldUserName();
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
    childMenuArry: any[] = [];
    parentsMenu: any[] = [];
    Module: any[] = [];
    
    isMobile: boolean = false;
    secUser:any

    switchAllow: boolean = false;

    constructor(private toastrService: ToastrService,public layoutService: LayoutService,private router: Router,private fb: FormBuilder, private gSvc: GeneralService,private auth: AuthService) {
        this.log= this.fb.group({
            username: new FormControl(),
            userPassword: new FormControl(),
          })
          if (window.screen.width < 541) { // 768px portrait
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        //Commented On 8.9.2024
        this.getSecUserByLoginId();
     }

    logout() {
        this.auth.logout();
    }
    getSecUserByLoginId() {
       
        //New
        if(this.auth.getCompanyTypeShortName() == 'SLSO'){
            this.loginId = this.auth.getSecondLevelLoginId();
        }
        else if(this.auth.getCompanyTypeShortName() == 'LSO'){
            this.loginId = this.auth.getFirstLevelLoginId();
        }

        //New
        this.gSvc.postdata("Security/User/GetSecUserByLoginId?loginId=" + this.loginId, {}).subscribe(res => {
        //Old
        //this.gSvc.postdata("Security/User/GetSecUserByLoginId?loginId=" + this.auth.getParentEmail(), {}).subscribe(res => {
          this.secUser= res;
          this.log.patchValue({
            username: this.secUser.loginID,
            userPassword: this.secUser.password
            });
        }, err => {
          this.toastrService.error("Error! Company list not found ");
        })
      }
    switchToMso(){
        
      
          this.show=false;
         
            if (this.log.valid) {
             
                this.auth.login(this.log.value).subscribe(
                  (result:any) => {        
                                    
                    if(result.isAuhentic){
                    
                          this.auth.setToken(result.token);
                          this.token = this.auth.decodeToken(result.token);  
                                            
                          //New: 15032025
                          this.auth.setLoanModel(this.token.LnLoanModelId);
                          //alert(this.token.LnLoanModelId);

                          //Start- Switch Logic
                          if( this.token.CompanyTypeShortName != "MSO" && (this.auth.isCompanyUser() || this.auth.getUserLevel() == 2)){
                              this.auth.setIsSwitch('Yes');
                          }
                          else{
                              this.auth.setIsSwitch('No');
                          }

                        this.auth.setView(this.isMobile);
                        this.auth.setlanguage('bn');
                        this.router.navigate(['/home/dashboard/msodashboard']);
                    }else{
                      this.toastrService.warning("Incorrect User ID or Password");
                    }
                  },
                  (err: Error) => {
                    this.toastrService.error("Error! internal problem");
                  }
                );
              }

            //End
          //End- Old and Original

    }
    loadMenu(id: any) {
        this.gSvc.getdata("Security/MenuPermission/ModuleMenuByRole?id=" + id).subscribe((res: any) => {
           if(this.auth.getLanguage()=='bn'){
            for (var item of res) {
                this.ModuleMenu.label = item.labelBn;
                //new
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
                this.ModuleMenu.label = item.label;

                //new
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
            //this.toastrService.error("error");
        })
    }

   
    ngOnInit() {

        if(this.auth.isSwitch()){
            this.switchAllow = true;
        }
        else{
            this.switchAllow = false;
        }

        //Start: Asad Added and Commented on 08.09.2024
        // if(this.auth.isMso() || this.auth.getLoggedInUserId() == this.auth.getUserName() || !this.auth.isSwitch()){

        //     this.switchAllow = false;
        // }
        // else{

        //     if(this.auth.isCompanyUser() || this.auth.getUserLevel() == 2){
        //         this.switchAllow = true;
        //     }
        //     else{
        //         this.switchAllow = false;
        //     }
        // }
               
        this.loadMenu(this.auth.getRole());
        this.model1 = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
                ]
            },
            {
                label: 'Master Setup',
                items: [
                    {
                        label: 'Organization Setting', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Organization Type',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['setting/organizationType']

                            },
                            {
                                label: 'Organization',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['setting/organization']

                            }


                        ]
                    },
                    {
                        label: 'Service Type',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['setting/servicetype']

                    },
                    {
                        label: 'Party Type',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['setting/partytype']

                    },

                    {
                        label: 'Add Party',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['setting/partyInfo']

                    },

                    {
                        label: 'Load Cas Network',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['setting/network']

                    },





                ]
            },
            {
                label: 'Inventory',
                items: [

                    {
                        label: 'Item Manage', icon: 'pi pi-fw pi-bars',
                        items: [
                            {
                                label: 'Card Type',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/cardtype']

                            },
                            {
                                label: 'Item',
                                icon: 'pi pi-fw pi-bars',
                                routerLink: ['inventory/item']

                            },
                            {
                                label: 'Item Type',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/itemtype']

                            },
                            {
                                label: 'Item Brand',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/itembrand']

                            },
                            {
                                label: 'Item Model',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/itemmodel']

                            },
                            {
                                label: 'Item Receive',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/receive']

                            },
                            {
                                label: 'Item Transfer',
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['inventory/transfer']

                            },




                        ]
                    },

                    {
                        label: 'Purchased Order',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['inventory/purchasedOrder']

                    },
                    {
                        label: 'Sales Order',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['inventory/salesOrder']

                    },

                ]
            },
            {

                label: 'Subscriber Management',
                items: [
                    {
                        label: 'Subscriber',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['subscriber/addSubscriber']

                    },
                    {
                        label: 'Subscriber List',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['subscriber/subscribers']

                    },
                    {
                        label: 'STB Assign',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['subscriber/stbassign']

                    },
                    {
                        label: 'Package Assign',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['subscriber/packageassign']

                    },


                ]
            },

            {
                label: 'Accounts Management',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {

                        label: 'Setting',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Digital Head',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['account/digitalhead']
                            },
                            {
                                label: 'Charge Config',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['account/chargeconfig']
                            },

                        ]
                    },
                    {
                        label: 'Digital Money',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['account/digitalmoney']
                    },
                    {
                        label: 'Transaction Detail',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['account/transdetail']
                    },





                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {

                        label: 'Setting',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'User Role',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['user/roles']
                            },

                        ]
                    },

                    {
                        label: 'Add User',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['user/addUser']
                    },


                ]
            },

            {
                label: 'Menu Management',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Modules',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['menu/appmodules']
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'Add Menu',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['menu/appMenu']
                            },
                            {
                                label: 'Rolebase Menu',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['menu/rolebaseMenu']
                            },

                        ]
                    },


                ]
            },


        ];
    }
}
