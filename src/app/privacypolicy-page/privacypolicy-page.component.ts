import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';
import { XsystbackendService } from '../shared/xsystbackend.service';
@Component({
  selector: 'app-privacypolicy-page',
  templateUrl: './privacypolicy-page.component.html',
  styleUrls: ['./privacypolicy-page.component.css'],
})
export class PrivacypolicyPageComponent implements OnInit {
  privacypolicystring: string;

  constructor(
    private menuBarService: MenuBarService,
    private xsystbackend: XsystbackendService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend.getprivacypolicy().subscribe((jsonObj) => {
      // console.log(jsonObj);
      this.privacypolicystring =
        jsonObj.data.privacy_policy_list[0].privacy_policy_string;
      this.menuBarService.setLoadingAnimation(false);
    });
  }
}
