import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { projectControls, projectDetails, UserdataService, userProfile } from './service/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Goldenfile';


}
