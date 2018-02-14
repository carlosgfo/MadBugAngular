import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from '../bugs/bug-list/bug-list.component'
import { BugService } from '../Services/bug.service';
import { FromnowPipe } from '../pipes/fromnow.pipe';
import { SeverityComponent } from '../bugs/severity/severity.component';
import { BugDetailsComponent } from '../bugs/bug-details/bug-details.component';
import { BugGuard } from '../guards/bug.guard';
import { AddBugComponent } from '../bugs/add-bug/add-bug.component';

import { HttpClientModule } from'@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { AccountService } from '../Services/account.service';
import { EditBugComponent } from './edit-bug/edit-bug.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:"bugs",component:BugListComponent,canActivate:[AuthGuard]},
      {path:"bugs/:id",component:BugDetailsComponent,canActivate:[AuthGuard,BugGuard]},
      {path:"addbug",component:AddBugComponent,canActivate:[AuthGuard]},
      {path:"editbug/:id",component:EditBugComponent,canActivate:[AuthGuard,BugGuard]},
    ]),
  ],
  providers: [AccountService,AuthGuard, BugService, BugGuard],
  declarations: [
    BugListComponent,
    FromnowPipe,
    SeverityComponent,
    BugDetailsComponent,
    AddBugComponent,
    EditBugComponent]
})

export class BugsModule { }
