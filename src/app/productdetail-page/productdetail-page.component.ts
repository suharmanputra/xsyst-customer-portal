import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuBarService } from '../shared/menu-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XsystbackendService } from '../shared/xsystbackend.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CounterHistory } from '../interface/productdetailresp';

@Component({
  selector: 'app-productdetail-page',
  templateUrl: './productdetail-page.component.html',
  styleUrls: ['./productdetail-page.component.css'],
})
export class ProductdetailPageComponent implements OnInit {
  discolCounterHistory: string[] = [
    'collection_date',
    'mono_copy',
    'mono_print',
    'mono_large_copy',
    'mono_large_print',
    'color_copy',
    'color_print',
    'color_large_copy',
    'color_large_print',
  ];

  dsCounterHistory: MatTableDataSource<CounterHistory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private actRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend
      .getproductdetail(this.actRouter.snapshot.params['idproduct'])
      .subscribe((jsonObj) => {
        this.dsCounterHistory = new MatTableDataSource(
          jsonObj.data.counter_history
        );
        this.dsCounterHistory.paginator = this.paginator;
        this.dsCounterHistory.sort = this.sort;
        this.menuBarService.setLoadingAnimation(false);
      });
  }

  applyFilterCounterHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCounterHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsCounterHistory.paginator) {
      this.dsCounterHistory.paginator.firstPage();
    }
  }
}
