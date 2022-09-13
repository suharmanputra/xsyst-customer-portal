import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  selected;
  idx = 0;
  pairs = [{ header: 'Oswald', body: 'EB Garamond' }];

  constructor() {}
}
