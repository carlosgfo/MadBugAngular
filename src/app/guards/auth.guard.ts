import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../Services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _accountService:AccountService, private _router:Router)
  {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._accountService.getCurrentSession()==null)
    {
      this._router.navigate(['/login']);
    }
    return true;
  }
}
