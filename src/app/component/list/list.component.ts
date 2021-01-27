import { Component, OnInit, ContentChild, AfterContentInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input()
  collection: string[];

  @ContentChild('profileTemplate')
  profileTemplate: TemplateRef<any>;
  @ContentChild('keysTemplate')
  keysTemplate: TemplateRef<any>;

  mode = 'profile';

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log('templates: ', this.profileTemplate, this.keysTemplate);
  }

}