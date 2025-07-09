
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { empty, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) { 
  }

 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

 // add authorization header to request

 //Get Token data from local storage
 let token = this.authService.getToken();
 
 if (token) {
              request = request.clone({
              setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;charset=utf-8'
              }});  
            }
            else{
            }
            return newRequest.handle(request);
 }
}














//Old
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpInterceptorService {

//   constructor() { }
// }
