import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from '../../Services/bug.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {
  
  addBugForm: FormGroup;
  errorMessage:string="";

  constructor(private _formBuilder:FormBuilder, private _bugService:BugService, private _router:Router) 
  {
    this.addBugForm = this._formBuilder.group({
      'title':['',Validators.compose([ Validators.required, Validators.min(5),Validators.maxLength(120)])],
      'body':['',Validators.compose([ Validators.required, Validators.min(5),Validators.maxLength(500)])],
      'isFixed':false,
      'stepsToReproduce':['',],
      'severity':1,
    });
  }

  save()
  {
    this._bugService.saveBug(this.addBugForm.value).subscribe
    (
      data=>{this._router.navigate(['/bugs'])},
      error=>{}
    );
  }

  ngOnInit() 
  {
    $('.ui.dropdown')
      .dropdown();
  }

}
