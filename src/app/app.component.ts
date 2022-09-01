import { Component, VERSION } from '@angular/core';
import { FontService } from './font.service';

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

  constructor(private fontService: FontService) {
    this.setPair();
  }

  setPair() {
    this.selected = this.pairs[this.idx];
    this.fontService.loadFont(this.selected);
  }
}
