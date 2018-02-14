import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ifError } from 'assert';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit 
{

  model:any={name:'', lastName:'', gender:true, photo:"https://angular.io/generated/images/marketing/home/code-icon.svg", photoWidth:200};
  myArray:string[]=["Valor1","Valor2","Valor3","Valor4","Valor5"];

  clicked()
  {
    console.log(this.model.name);
    this.model.lastName = this.model.lastName + "A";
  }

  addItem()
  {
    this.myArray.push("Valor"+ (this.myArray.length + 1));
    this.model.photoWidth += 10;
  }


  removeItem(item)
  {
    this.myArray.pop();
    this.model.photoWidth -= 10;
  }

  selectItem(item)
  {
    alert(item);
  }

  constructor() 
  { }

  ngOnInit()
  {
    
  }
}
