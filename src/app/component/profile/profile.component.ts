import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  @Input()
  item: string;

  constructor() { }

  ngOnInit() {
    console.log('ProfileComponent onInit');
  }

  ngOnDestroy() {
    console.log('ProfileComponent onDestroy');
  }

}