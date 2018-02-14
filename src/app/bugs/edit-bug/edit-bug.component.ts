import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from '../../Services/bug.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.css']
})
export class EditBugComponent implements OnInit {

  editBugForm: FormGroup;
  errorMessage:string="";
  bug:any = {};
  paramId:any;

  constructor(private _activatedRoute:ActivatedRoute,private _formBuilder:FormBuilder,private _bugService:BugService, private _router:Router) 
  { 
    this.editBugForm = this._formBuilder.group({
      'title':['',Validators.compose([ Validators.required, Validators.min(5),Validators.maxLength(120)])],
      'body':['',Validators.compose([ Validators.required, Validators.min(5),Validators.maxLength(500)])],
      'isFixed':false,
      'stepsToReproduce':['',],
      'severity':1,
    });
  }


  put()
  {  
    var temp = this.editBugForm.value;
    temp.id = this.bug.id;
    temp.rowVersion = this.bug.rowVersion;
    temp.createdById = this.bug.createdById;
    temp.createdAt= this.bug.createdAt;
    console.log(temp.createdAt);
    this._bugService.putBug(this.editBugForm.value,this.paramId).subscribe
    (
      data=>{this._router.navigate(['/bugs'])},
      error=>{
      }
    );
  }

  ngOnInit() 
  {
    this.paramId = this._activatedRoute.snapshot.paramMap.get('id');
    if(this.paramId)
    {
      this._bugService.getBug(Number(this.paramId)).subscribe(
        data=>
        {
          this.bug = data;
          // this.editBugForm.setValue(this.bug);
          this.editBugForm.setValue({title:data.title,
            body:data.body,
            stepsToReproduce:data.stepsToReproduce,
            isFixed:data.isFixed,
            severity:data.severity});
        },
        error=>{console.log(error)}
      );
    }
    else{
      this._router.navigate(['/bugs']);
    }

    $('.ui.dropdown')
      .dropdown();
  }

}
