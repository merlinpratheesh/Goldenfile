import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface projectControls {
  publicprojectControl?: FormControl;//1-User selects a public project    
}

@Injectable({
  providedIn: 'root'
})

export class UserdataService {

 


  constructor() {
 
   }
}
