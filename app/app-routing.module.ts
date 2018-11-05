import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectDetailComponent } from "./components/project-detail/project-detail.component";
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ExampleNavComponent } from './example-nav/example-nav.component';
import { ExampleDashboardComponent } from './example-dashboard/example-dashboard.component';
import { ExampleDataTableComponent } from './example-data-table/example-data-table.component';
import { ExampleFixedHeaderComponent } from './example-fixed-header/example-fixed-header.component';
import { ExampleFixedFooterComponent } from './example-fixed-footer/example-fixed-footer.component';
import { ExampleFixedColumnComponent } from './example-fixed-column/example-fixed-column.component';

const routes: Routes = [
//  { path: '', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'dashboard', component: ExampleDashboardComponent },
  { path: 'navbar', component: ExampleNavComponent },
  { path: 'datatable', component: ExampleDataTableComponent },
  { path: 'fixed-hdr-datatable', component: ExampleFixedHeaderComponent },
  { path: 'fixed-footer-datatable', component: ExampleFixedFooterComponent },
  { path: 'fixed-column-datatable', component: ExampleFixedColumnComponent },
//{ path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
