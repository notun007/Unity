import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;

  constructor(private http: HttpClient, private router: Router) {
    //this.token = this.decodeToken(this.getToken());
   }

   ngOnInit(): void {
    //this.token = this.decodeToken(this.getToken());
  };
      
  // Save data to local storage
  save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove data from local storage
  remove(key: string): void {
    localStorage.removeItem(key);
  }
   
  setIsSwitch(isSwitch: string): void {
    sessionStorage.setItem('isSwitch', isSwitch);
  }
    
  isSwitch() {

    //New
    return sessionStorage.getItem('isSwitch') == "Yes" ? true : false;
    
    //Old
    // var user = sessionStorage.getItem('isSwitch');
    // var status = user == "Yes" ? true : false;
    // return status;
  }

  setLoggedInUserId(loggedInUserId: string): void {
    sessionStorage.setItem('loggedInUserId', loggedInUserId);
  }
    
  getLoggedInUserId() {
    this.token = this.decodeToken(this.getToken());
    return this.token.LoggedInUserId;
    

    //Old
    //var user = sessionStorage.getItem('loggedInUserId');
    //return user;
  }



//--------------

setLoanModel(LnLoanModelId: string): void{
  sessionStorage.setItem('LnLoanModelId', LnLoanModelId);
}
getLoanModel(): string | null{
  return sessionStorage.getItem('LnLoanModelId');
}

setFirstLevelLoginId(firstLevelLoginId: string): void {
  sessionStorage.setItem('firstLevelLoginId', firstLevelLoginId);
}
getFirstLevelLoginId(): string | null{
  return sessionStorage.getItem('firstLevelLoginId');
}

setSecondLevelLoginId(secondLevelLoginId: string): void {
  sessionStorage.setItem('secondLevelLoginId', secondLevelLoginId);
}
getSecondLevelLoginId(): string | null{
  return sessionStorage.getItem('secondLevelLoginId');
}

setThirdLevelLoginId(thirdLevelLoginId: string): void {
  sessionStorage.setItem('thirdLevelLoginId', thirdLevelLoginId);
}
getThirdLevelLoginId(): string | null{
  return sessionStorage.getItem('thirdLevelLoginId');
}

//--------------


  
  setParentEmail(parentEmail: string): void {
    sessionStorage.setItem('parentEmail', parentEmail);
  }

  getParentEmail(): string | null {
    this.token = this.decodeToken(this.getToken());
    return this.token.ParentEmail;
    //Old
    //return sessionStorage.getItem('parentEmail');
  }
  setOldUserName(oldUserName: string): void {
    sessionStorage.setItem('oldUserName', oldUserName);
  }
  
  getOldUserName(): string | null {
    
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.OldUserName;

    //Old
    //return sessionStorage.getItem('oldUserName');
  }
  setOldPassword(oldPassword: string): void {
    sessionStorage.setItem('oldPassword', oldPassword);
  }
  getOldPassword(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.OldPassword;
    //Old
    //return sessionStorage.getItem('oldPassword');
  }

  setUserName(userName: string): void {
    sessionStorage.setItem('userName', userName);
  }

  getUserName(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.UserName;
    //Old
    //return sessionStorage.getItem('userName');
  }

  setUserId(userId: number): void {
    sessionStorage.setItem('userId', userId.toString());
  }

  getUserId(): number {

    //New
    this.token = this.decodeToken(this.getToken());
    return parseInt(this.token.UserId ?? '0');
    //Old
    //return parseInt(sessionStorage.getItem('userId') ?? '0');
  }
  
  
  setUserLevel(userLevel: number): void {
    sessionStorage.setItem('userLevel', userLevel.toString());
  }

  getUserLevel(): number {
    //New
    this.token = this.decodeToken(this.getToken());
    return parseInt(this.token.UserLevel ?? '0');
    //Old
    //return parseInt(sessionStorage.getItem('userLevel') ?? '0');
  }


  setPhotoUrl(photoUrl: string): void {
    sessionStorage.setItem('photoUrl', photoUrl);
  }

  getPhotoUrl(): string | null {

    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.PhotoUrl;
    //Old
    //return sessionStorage.getItem('photoUrl');
  }

  setView(isMobile: boolean): void {
    sessionStorage.setItem('isMobile', isMobile.toString());
  }

  getView(): boolean {
    return sessionStorage.getItem('isMobile')=='true'? true : false;
  }

  setRole(roleId: string): void {
    sessionStorage.setItem('roleId', roleId);
  }

  getRole(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.RoleId;
    //New
    //return sessionStorage.getItem('roleId');
  }
  
  setCompany(companyId: string): void {
    sessionStorage.setItem('companyId', companyId);
  }

  getCompany(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.CompanyId;

    //Old
    //return sessionStorage.getItem('companyId');
  }

  setCompanyTypeShortName(companyTypeShortName: string): void {
    sessionStorage.setItem('companyTypeShortName', companyTypeShortName);
  }

  getCompanyTypeShortName(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.CompanyTypeShortName;
    //Old
    //return sessionStorage.getItem('companyTypeShortName');
  }

  isMso() {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.CompanyTypeShortName == "MSO" ? true : false;

    //Old
    //var shortName = sessionStorage.getItem('companyTypeShortName');
    //var status = shortName == "MSO" ? true : false;
    //return status;
  }
  isLso() {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.CompanyTypeShortName == "LSO" ? true : false;
    //Old
    //var shortName = sessionStorage.getItem('companyTypeShortName');
    //var status = shortName == "LSO" ? true : false;
    //return status;
  }
  isSubLso() {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.CompanyTypeShortName == "SLSO" ? true : false;
    //Old
    //var shortName = sessionStorage.getItem('companyTypeShortName');
    //var status = shortName == "SLSO" ? true : false;
    //return status;
  }

  setIsCompanyUser(isCompanyUser: string): void {
    sessionStorage.setItem('isCompanyUser', isCompanyUser);
  }

  isCompanyUser() {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.IsCompanyUser == "Yes" ? true : false;
    //Old
    //var user = sessionStorage.getItem('isCompanyUser');
    //var status = user == "Yes" ? true : false;
    //return status;
  }
   
  setDistrict(districtId: string): void {
    sessionStorage.setItem('districtId', districtId);
  }

  getDistrict(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.DistrictId;
    //Old
    //return sessionStorage.getItem('districtId');
  }

  setUpazila(upazilaId: string): void {
    sessionStorage.setItem('upazilaId', upazilaId);
  }

  getUpazila(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.UpazilaId;
    //Old
    //return sessionStorage.getItem('upazilaId');
  }

  setUnion(unionId: string): void {
    sessionStorage.setItem('unionId', unionId);
  }

  setAppSetting(appSetting: any): void{

    sessionStorage.setItem('applicationId', appSetting.applicationId);
    
    if(appSetting.allowAutoSubscriberNumber){
      sessionStorage.setItem('allowAutoSubscriberNumber', 'YES');
    }
    else{
      sessionStorage.setItem('allowAutoSubscriberNumber', 'NO');
    }

    sessionStorage.setItem('subscriberNumberLength', appSetting.subscriberNumberLength);

    if(appSetting.allowPurchase){
      sessionStorage.setItem('allowPurchase', 'YES');
    }
    else{
      sessionStorage.setItem('allowPurchase', 'NO');
    }

    if(appSetting.allowSale){
      sessionStorage.setItem('allowSale', 'YES');
    }
    else{
      sessionStorage.setItem('allowSale', 'NO');
    }
      sessionStorage.setItem('appKey', appSetting.appKey);
  }


  //New: 03.09.2024
  setApplicationId(applicationId: any){
    sessionStorage.setItem('applicationId', applicationId);
  }


  getApplicationId(): string | null{
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.ApplicationId;
    //return "2";
    //Old
    //return sessionStorage.getItem('applicationId');
  }
  isSms(): boolean{
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.ApplicationId === '2' ? true : false;
    //Old
    //var result = sessionStorage.getItem('applicationId') === '2' ? true : false;
    //return result;
  }

  //New: 03.09.2024
  setAllowAutoSubscriberNumber(allowAutoSubscriberNumber: any){
    sessionStorage.setItem('allowAutoSubscriberNumber', allowAutoSubscriberNumber);
  }

    allowAutoSubscriberNumber(): boolean{
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.AllowAutoSubscriberNumber == 'YES' ? true : false;

    //Old
    //var allowAutoSubscriberNumber = sessionStorage.getItem('allowAutoSubscriberNumber');
    //return allowAutoSubscriberNumber == 'YES' ? true : false;
  }

  //New: 03.09.2024
  setSubscriberNumberLength(subscriberNumberLength: any){
    sessionStorage.setItem('subscriberNumberLength', subscriberNumberLength);
  }
  getSubscriberNumberLength(): string | null{
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.SubscriberNumberLength;
    //Old
    //return sessionStorage.getItem('subscriberNumberLength');
  }

  //New: 03.09.2024
  setAllowPurchase(allowPurchase: any){
    sessionStorage.setItem('allowPurchase', allowPurchase);
  }
  allowPurchase(): boolean{
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.AllowPurchase == 'YES' ? true : false;
    //Old
    //var allowPurchase = sessionStorage.getItem('allowPurchase');
    //return allowPurchase == 'YES' ? true : false;
  }

  //New: 03.09.2024
  setAllowSale(allowSale: any){
    sessionStorage.setItem('allowSale', allowSale);
  }
  allowSale(): boolean{

    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.AllowSale == 'YES' ? true : false;
    //Old
    //var allowSale = sessionStorage.getItem('allowSale');
    //return allowSale == 'YES' ? true : false;
  }

  //New: 03.09.2024
  setAppKey(appKey: any){
    sessionStorage.setItem('appKey', appKey);
  }
  getAppKey(): string | null{

    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.AppKey;
    //Old
    //var appKey = sessionStorage.getItem('appKey');
    //return appKey;
  }

  
  getUnion(): string | null {
    //New
    this.token = this.decodeToken(this.getToken());
    return this.token.UnionId;
    //Old
    //return sessionStorage.getItem('unionId');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setmenuload(islaod: string): void {
    sessionStorage.setItem('isload', islaod);
  }

  getMenuLoad() {
    return sessionStorage.getItem('isload');
  }

  setlanguage(language: string): void {
    sessionStorage.setItem('language', language);
  }
  getLanguage() {
    
    //New
    // this.token = this.decodeToken(this.getToken());
    // return this.token.Language;
    //Old
    return sessionStorage.getItem('language');
  }


  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

  login(usercred: any): Observable<any> {
    return this.http.post(environment.baseurl + 'Security/User/Authenticate', usercred);
  }
  
  // Method to decode JWT token
  decodeToken(token: string | null): any {
    let jwtToken = '';

    if(token){
      jwtToken = token
    }

    try {

      const decoded = jwt_decode.jwtDecode(jwtToken);
      
      return decoded;
    } catch (error) {
      
      console.error('Error decoding token:', error);
      return null;
    }

  }

  // Example method to get a specific claim from the token
  getClaimFromToken(token: string, claim: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claim] : null;
  }

}

