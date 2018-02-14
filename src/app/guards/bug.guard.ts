import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BugGuard implements CanActivate {
  constructor(private _router:Router)
  {

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let id = +next.url[1].path;
      if(id != null)
      {
        if(isNaN(id) || id < 1)
        {
          this._router.navigate(['/bugs']);
        }
      }
      return true;
  }
}
