import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';
import { XsystbackendService } from '../shared/xsystbackend.service';
@Component({
  selector: 'app-privacypolicy-page',
  templateUrl: './privacypolicy-page.component.html',
  styleUrls: ['./privacypolicy-page.component.css'],
})
export class PrivacypolicyPageComponent implements OnInit {
  constructor(
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService
  ) {}

  ngOnInit() {}
}
