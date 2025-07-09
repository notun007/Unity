import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utility } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]

})
export class LoginComponent implements OnInit {
  token: any;
  valCheck: string[] = ['remember'];
  password!: string;
  genCaptcha: string = '';
  inCaptcha: string = '';
  loginForm = new FormGroup({
    username: new FormControl(''),
    userPassword: new FormControl(''),
  });
  lodder:boolean=false;
  isMobile: boolean = false;
  constructor(
    private router: Router
    , private auth: AuthService
    , public layoutService: LayoutService
    , private toastrService: ToastrService
    , private _util: Utility) { 
      if (window.screen.width < 541) { // 768px portrait
        this.isMobile = true;
    } else {
        this.isMobile = false;
    }
    }

  ngOnInit(): void {
    this.genCaptcha = this._util.CaptchaNumeric();
  };

  onSubmit(): void {
    this.lodder=true;
    if (this.loginForm.valid && this._util.ValidCaptcha(this.genCaptcha, this.inCaptcha)) {
      this.auth.login(this.loginForm.value).subscribe(
        (result: any) => {
          
          //New: 07.09.2024
          if(result != undefined){
              if(result.isAuhentic){

                this.auth.setToken(result.token);
                this.token = this.auth.decodeToken(result.token);  
              }
              else{
                this.lodder=false;
                this.toastrService.warning(result.message);
                return;
              }
          }
          else{
                this.lodder=false;
                this.toastrService.warning("Unable to Authenticate");
                return;
          }
        
          if (result.isAuhentic == true) {
       
            this.auth.setView(this.isMobile);
            this.auth.setIsSwitch('No');
            this.auth.setlanguage('bn');

            //New: 15032025
            this.auth.setLoanModel(this.token.LnLoanModelId);
            //alert(this.token.LnLoanModelId);
            //Begin
            if(this.token.CompanyTypeShortName == "MSO" && this.token.IsCompanyUser){
              this.auth.setFirstLevelLoginId(this.token.UserName);
            }
            else if(this.token.CompanyTypeShortName == "LSO" && this.token.IsCompanyUser){
              this.auth.setSecondLevelLoginId(this.token.UserName);
            }
            else if(this.token.CompanyTypeShortName == "SLSO" && this.token.IsCompanyUser){
              this.auth.setThirdLevelLoginId(this.token.UserName);
            }
            //End


            //New
            if(this.token.ApplicationId == '1'){
            //Old
            //if(this.auth.getApplicationId() == '1'){
            this.router.navigate(['/home/dashboard/tfdashboard']);
            }
            else{
              this.router.navigate(['/home/dashboard/msodashboard']);
            }           
          } else {
            this.lodder=false;
            this.toastrService.warning("Incorrect User ID or Password");
          }
        },
        (err: Error) => {
          this.lodder=false;
          this.toastrService.error(err.message);
        }
      );
    }else{
      this.lodder=false;
    }
    
  };

  stCap: boolean = false;
  reCaptcha() {
    this.stCap = true;
    setTimeout(() => {
      this.genCaptcha = this._util.CaptchaNumeric();
      this.stCap = false;
    }, 1000);
  }
}
