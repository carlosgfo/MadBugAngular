import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from'@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import {IToken} from '../auth/i-token';

@Injectable()
export class AccountService {

    apiURL:string = environment.apiURL + "/token";
    private key = CryptoJS.enc.Utf8.parse('7061737323313233');
  private iv = CryptoJS.enc.Utf8.parse('7061737323313233');

  constructor(private _http:HttpClient) { }

  public doLogin(email:string, password:string):Observable<any>
  {
      //alert(email + password);
      let body = new URLSearchParams();
      body.set("username",email);
      body.set("password",password);
      body.set("client_id","web");
      body.set("grant_type","password");

      let options ={
          headers:new HttpHeaders().set('Content-Type',"application/x-www-form-urlencoded")
      };

      return this._http.post(this.apiURL,body.toString(),options)
      .do(data=>
        {
          var tokenString = JSON.stringify(data);
          var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(tokenString), this.key,{keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});          
          localStorage.setItem("token",encrypted);
      })
      .catch(this.handledError);
  }  
  
  handledError(errorResponse:HttpErrorResponse)
  {
      return Observable.throw(errorResponse.error.error_description);
  }

  public getCurrentSession():IToken
  {
    var sessionString = localStorage.getItem("token");
    if(sessionString == undefined) 
      return null;
    var encryptedSession = sessionString;
    var decrypted = CryptoJS.AES.decrypt(encryptedSession, this.key, {keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    var session = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)); 
    return session;     
  }

  public getSessionToken():string
  {
    var currentSession = this.getCurrentSession();
    if(currentSession!= null)
        return currentSession.access_token;
    
  }

  public doLogout()
  {
      localStorage.removeItem("token");
  }
  //promises
    /*this._http.get<any>("http://co.sa").subscribe(
        data=>{},
        error=>{}
    );*/
}
