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
import { ProductList } from '../interface/productlistresp';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'note', 'active', 'detail'];
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  expandedElement: any;

  dataSource: MatTableDataSource<ProductList>;

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
      .getallproduct(this.actRouter.snapshot.params['idcontract'])
      .subscribe((jsonObj) => {
        this.dataSource = new MatTableDataSource(jsonObj.data.product_list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.menuBarService.setLoadingAnimation(false);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showdetail(id_product: number) {
    let url = (
      window.location.href.split('#')[1] +
      '/detail/' +
      id_product
    ).substring(1);
    // console.log(url);
    this.menuBarService.navigatepage(url);
  }
}
