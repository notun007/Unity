
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Rx'; //Old
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 constructor(private authService: AuthService, private router: Router) { }

 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

 return newRequest.handle(request).pipe(catchError(err =>{
 if (err.status === 401) {
 //if 401 response returned from api, logout from application & redirect to login page.
 this.authService.logout();
 }

 const error = err.error.message || err.statusText;
 
 throw new Error(error);
 //Old
// return Observable.throw(error);

 }));
 }
}











// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ErrorInterceptorService {

//   constructor() { }
// }
