import { Component, OnInit } from '@angular/core';
import { BugService } from '../../Services/bug.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {

  bugs:any[];
  constructor(private _bugService:BugService) { }

  ngOnInit() 
  {
    this._bugService.getBugs().subscribe
    (data=>{this.bugs = data},
    error=>{console.log(error)});    
    
  }

}
