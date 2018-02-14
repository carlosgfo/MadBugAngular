import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BugService } from '../../Services/bug.service';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {

  bug:any = {};

  constructor(private _activatedRoute:ActivatedRoute, 
    private _router:Router,
    private _bugService:BugService) { }

  ngOnInit() 
  {
    const param = this._activatedRoute.snapshot.paramMap.get('id');
    if(param)
    {
      this._bugService.getBug(Number(param)).subscribe(
        data=>{this.bug = data},
        error=>{console.log(error)}
      );
    }
  }

}
