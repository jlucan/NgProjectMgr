import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProjectService } from './services/project.service';
import { LookupService } from './services/lookup.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { MessageService } from './services/message.service';
import { MessageComponent } from './components/message/message.component';
import { ExampleNavComponent } from './example-nav/example-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { ExampleDashboardComponent } from './example-dashboard/example-dashboard.component';
import { ExampleDataTableComponent } from './example-data-table/example-data-table.component';
import { ExampleFixedHeaderComponent } from './example-fixed-header/example-fixed-header.component';
import { ExampleFixedFooterComponent } from './example-fixed-footer/example-fixed-footer.component';
import { ExampleFixedColumnComponent } from './example-fixed-column/example-fixed-column.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    MessageComponent,
    ExampleNavComponent,
    ExampleDashboardComponent,
    ExampleDataTableComponent,
    ExampleFixedHeaderComponent,
    ExampleFixedFooterComponent,
    ExampleFixedColumnComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [ProjectService, LookupService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
