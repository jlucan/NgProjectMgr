import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatInput } from '@angular/material';
import { ExampleDataTableDataSource } from './example-data-table-datasource';

@Component({
  selector: 'example-data-table',
  templateUrl: './example-data-table.component.html',
  styleUrls: ['./example-data-table.component.css']
})
export class ExampleDataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) input: MatInput;
  dataSource: ExampleDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'symbol'];

  ngOnInit() {
    this.dataSource = new ExampleDataTableDataSource(this.paginator, this.sort);
  }
}
