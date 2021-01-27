import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit, OnDestroy {
  @Input()
  item: string;

  constructor() { }

  ngOnInit() {
    console.log('KeysComponent onInit');
  }

  ngOnDestroy() {
    console.log('KeysComponent onDestroy');
  }

}