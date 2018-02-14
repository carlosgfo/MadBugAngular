import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgModel,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import {AccountService} from './Services/account.service';

import { AuthGuard } from './guards/auth.guard';
import { BugsModule } from './bugs/bugs.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"welcome",component:WelcomeComponent,canActivate:[AuthGuard]},
      {path:"login",component:LoginComponent},
      {path:"",redirectTo:'welcome', pathMatch:'full',canActivate:[AuthGuard]},
      {path:'**', redirectTo:'welcome', pathMatch:'full',canActivate:[AuthGuard]}
    ],{useHash:true}),
    ReactiveFormsModule,
    BugsModule
  ],
  providers: [AccountService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
