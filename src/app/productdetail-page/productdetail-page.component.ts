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
import { TableUtil } from '../shared/table-util';
import { CounterHistory } from '../interface/productdetailresp';
import { DeviceDeliveryHistory } from '../interface/productdetailresp';
import { ServiceHistory } from '../interface/productdetailresp';
import { AdditionalItemHistory } from '../interface/productdetailresp';

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

  discolDeviceDelivery: string[] = ['doc_date', 'delivery_type', 'doc_no'];
  discolServiceHistory: string[] = ['req_date', 'svo_type', 'svo_no'];
  discolAdditionalItemHistory: string[] = ['doc_date', 'doc_no'];

  dsCounterHistory: MatTableDataSource<CounterHistory>;
  dsDeviceDelivery: MatTableDataSource<DeviceDeliveryHistory>;
  dsServiceHistory: MatTableDataSource<ServiceHistory>;
  dsAddtionalItemHistory: MatTableDataSource<AdditionalItemHistory>;

  @ViewChild(MatPaginator) paginatorcounter: MatPaginator;
  @ViewChild(MatPaginator) paginatordelivery: MatPaginator;
  @ViewChild(MatPaginator) paginatorservice: MatPaginator;
  @ViewChild(MatPaginator) paginatoradditionalitem: MatPaginator;

  @ViewChild(MatSort) sortcounter: MatSort;
  @ViewChild(MatSort) sortdelivery: MatSort;
  @ViewChild(MatSort) sortservice: MatSort;
  @ViewChild(MatSort) sortadditionalitem: MatSort;

  constructor(
    private actRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    public menuBarService: MenuBarService,
    public xsystbackend: XsystbackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.setLoadingAnimation(true);
    this.xsystbackend
      .getproductdetail(this.actRouter.snapshot.params['idproduct'])
      .subscribe((jsonObj) => {
        //counter history
        this.dsCounterHistory = new MatTableDataSource(
          jsonObj.data.counter_history
        );
        this.dsCounterHistory.paginator = this.paginatorcounter;
        this.dsCounterHistory.sort = this.sortcounter;

        //device delivery
        this.dsDeviceDelivery = new MatTableDataSource(
          jsonObj.data.device_delivery_history
        );
        this.dsDeviceDelivery.paginator = this.paginatordelivery;
        this.dsDeviceDelivery.sort = this.sortcounter;

        //Service History
        this.dsServiceHistory = new MatTableDataSource(
          jsonObj.data.service_history
        );
        this.dsServiceHistory.paginator = this.paginatorservice;
        this.dsServiceHistory.sort = this.sortservice;

        //additional item
        this.dsAddtionalItemHistory = new MatTableDataSource(
          jsonObj.data.additional_item_history
        );
        this.dsAddtionalItemHistory.paginator = this.paginatoradditionalitem;
        this.dsAddtionalItemHistory.sort = this.sortadditionalitem;

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

  applyFilterDeviceDelivery(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsDeviceDelivery.filter = filterValue.trim().toLowerCase();
    if (this.dsDeviceDelivery.paginator) {
      this.dsDeviceDelivery.paginator.firstPage();
    }
  }

  applyFilterServiceHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsServiceHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsServiceHistory.paginator) {
      this.dsServiceHistory.paginator.firstPage();
    }
  }

  applyFilterPartHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsAddtionalItemHistory.filter = filterValue.trim().toLowerCase();
    if (this.dsAddtionalItemHistory.paginator) {
      this.dsAddtionalItemHistory.paginator.firstPage();
    }
  }

  exporttable(tableid: string) {
    TableUtil.exportTableToExcel(tableid, tableid);
  }
}
