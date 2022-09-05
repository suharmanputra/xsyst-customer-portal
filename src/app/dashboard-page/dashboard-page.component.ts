import { Component, OnInit } from '@angular/core';
import { MenuBarService } from '../shared/menu-bar.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  username: string;
  constructor(private menuBarService: MenuBarService, private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe((result) => {
      if (result === false) {
        this.router.navigateByUrl('/');
      } else {
      }
    });
  }
}
