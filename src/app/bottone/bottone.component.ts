import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottone',
  templateUrl: './bottone.component.html',
  styleUrls: ['./bottone.component.css'],
})
export class BottoneComponent {
    title = "siumBottone";
    stato2:boolean=false; 
    
    disabilita(){
      if(!this.stato)
      {
      this.stato2= true;
      }
    }
    @Input()
    stato:boolean=true;
}
