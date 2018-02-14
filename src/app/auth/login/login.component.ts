import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account.service';

import{Router, Route} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  isLoading: boolean = false;
  model:any={email:'',password:''}
  errorMessage:string;

  constructor(private _accountService:AccountService, private _router:Router) { }

  ngOnInit() {
    // var token = this._accountService.getSessionToken();
    // console.log(token);
  }

  loginFormSubmit(loginForm)
  {
    this.isLoading = true;
    this._accountService.doLogin(loginForm.value.email,loginForm.value.password)
    .subscribe(
    data=>
    {
      this.isLoading = false;/*redirect*/ 
      this.errorMessage = "";
      this._router.navigate([("/welcome")]);
    },
      error=>{this.isLoading = false; this.errorMessage = error;});
  }

}
