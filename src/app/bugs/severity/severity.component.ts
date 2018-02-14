import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {

  @Input() severityRange:number;

  constructor() { }

  ngOnInit() 
  {

  }

}
