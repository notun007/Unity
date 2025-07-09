import { Injectable, OnDestroy } from '@angular/core';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from './general.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScheduledTaskService implements OnDestroy {
  private stop$ = new Subject<void>();
  private taskSubscription: Subscription;

  constructor(private gSvc: GeneralService, private auth: AuthService, private router: Router, private toastrService: ToastrService) {
    // Example: Run a task every 5 seconds
    this.taskSubscription = interval(60000)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => this.runScheduledTask());

      this.taskSubscription = interval(60000)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => this.runScheduledTask2());
  }

  runScheduledTask(): void {

    var appKey = this.auth.getAppKey();
    if(this.auth.isLoggedIn() && this.auth.isSms() && appKey!= null ){
    this.verifyClientPackageByAppKey(appKey);
    }
  }

  verifyClientPackageByAppKey(appKey: any) {
    
    this.gSvc.getdata("Security/User/VerifyClientByAppKey?appKey=" + appKey).subscribe((res: any) => {
    
      if(res === 'undefined' || res === null){
        this.toastrService.warning('Something went wrong.');
      }

      if(res != undefined){
          if(!res.success){
            this.auth.logout();
            this.router.navigateByUrl('/auth/login');
            this.toastrService.warning(res.message);
          }
      }
    }, err => {
      this.toastrService.error('scheduler: ' + err.message);
    })
  }

  runScheduledTask2(): void {
    
    //console.log('Scheduled task executed at:', new Date());
    //alert('Scheduled task executed at:', new Date());
  }

  ngOnDestroy(): void {
    // Cleanup the interval when the service is destroyed
    this.stop$.next();
    this.stop$.complete();
  }
}
