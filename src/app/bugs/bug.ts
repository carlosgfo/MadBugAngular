export class Bug 
{
    constructor
    ( 
        public title:string,
        public body:string,
        public isFixed:boolean,
        public stepsToReproduce:string,
        public severity:number
    )
    {}
}
