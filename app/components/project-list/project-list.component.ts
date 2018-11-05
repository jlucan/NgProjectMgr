import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, Sort, MatSort, MatTableDataSource } from "@angular/material";
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { of } from 'rxjs/Observable/of';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';

import { Project } from '../../models/project';
import { ProjectState } from '../../models/project-state';
import { PhoneType } from '../../models/phone-type'
import { ProjectService } from '../../services/project.service';
import { LookupService } from '../../services/lookup.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public project: Project;
  public phoneType: PhoneType;
  public projects: Project[];
  public sortedProjects: Project[];
  public searchedProjects: Project[];
  public selectedProject: Project;
  public projectStates: ProjectState[];
  public phoneTypes: PhoneType[];
  public showFilter: boolean = false;
  public selProjState?: number;
  public selProjStatus?: number;
  public selectedRows = [];

  public displayedColumns = ["id", "name", "code", "duedate", "description", "wklysched"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private lookupService: LookupService) {
  }

  ngOnInit() {
    //this.projects.sort = this.sort;
    this.getProjects();
    this.getProjectStates();
    this.getPhoneTypes();
  }

  searchProjects(searchStr = '') {

  }

  sortData(sort: Sort) {
    if (sort.active && sort.direction !== '') {
      const data = this.projects.slice();
      const sortDir: number = (sort.direction === 'asc') ? 1 : -1;
      this.projects = data.sort((a, b) => {
        switch (sort.active) {
          case 'id': return this.compare(a.id, b.id, sortDir);
          case 'name': return this.compare(a.projectName, b.projectName, sortDir);
          case 'code': return this.compare(a.projectCode, b.projectCode, sortDir);
          case 'duedate': return this.compareNullable(a.projectDueDate, b.projectDueDate, sortDir);
          case 'description': return this.compareNullable(a.projectDescription, b.projectDescription, sortDir);
          case 'wklysched': return this.compare(a.wklySched, b.wklySched, sortDir);
          default: return this.compare(a.projectCode, b.projectCode, sortDir);
        }
      });
    }
  }

  compare(a, b, sortDir: number) {
    return ((a === b) ? 0 : +(a > b) || -(a < b)) * sortDir;
  }

  compareNullable(a, b, sortDir: number) {
    return ((a === b) ? 0 : +(b === null) || -(a === null) || +(a > b) || -(a < b)) * sortDir;    return ((a === b) ? 0 : ((a === null) ? -1 : ((b === null) ? 1 : (a < b ? -1 : 1)))) * sortDir;
  }



  getProjects(): void {
    this.projectService.getProjects().subscribe(result => this.projects = result);

  }

  getProjectStates(): void {
    this.lookupService.getProjectStates(true).subscribe(result => this.projectStates = result);
  }

  getPhoneTypes(): void {
    this.lookupService.getPhoneTypes(true).subscribe(result => this.phoneTypes = result);
  }

  addPhoneType(): void {
    const pType = {
      id: 0,
      type: 'cell24',
      active: true
    };

    console.log('Add phone type', pType);

    this.lookupService.addPhoneType(pType).subscribe(result => this.phoneType = result);
  }

  onSelect(project: Project) {
    let phoneType: PhoneType = { id: 110, type: "cell5", active: true };


    console.log(`Select project with code: ${project.projectCode}`);
    //console.log(this.projectStates);
    //console.log(phoneType);
    //this.lookupService.addPhoneType(phoneType);
    //this.projectService.addProject(project);
    this.selectedProject = project;
    //this.projectService.deleteProject(project.id).subscribe(result => { this.project = result });
    //this.lookupService.deletePhoneType(phoneType).subscribe(result => { this.phoneType = result });
    this.addPhoneType();
  }

  filterProjects(filterval: number) {
    this.selProjState = filterval;
    console.log(this.selProjState);
    this.projectService.getProjects(this.selProjState, this.selProjStatus).subscribe(result => this.projects = result);

  }

}




  //constructor(http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
  //  http.get<Project[]>(baseUrl + 'api/ProjectValues/Projects').subscribe(result => {
  //    this.projects = result;
  //  }, error => console.error(error));
  //}

//  ngOnInit() {
//    this.getProjects();
//  }

//  getProjects(): void {
//    this.projectService.getProjects().subscribe(result => this.projects = result);
//  }

//  onSelect(project: Project) {
//    console.log(project);
//    this.selectedProject = project;
//  }
//}






////import { Component, Inject, OnInit } from '@angular/core';
////import { HttpClient } from '@angular/common/http';
////import { Observable } from 'rxjs/Observable'
////import { of } from 'rxjs/Observable/of'

////import { Project } from '../../models/project';
////import { ProjectService } from '../../services/project.service';
////import { LookupService } from '../../services/lookup.service';
////import { ProjectState } from '../../models/project-state';

////@Component({
////  selector: 'app-project-list',
////  templateUrl: './project-list.component.html',
////  styleUrls: ['./project-list.component.css']
////})
////export class ProjectListComponent implements OnInit {
////  public projects: Project[];
////  public selectedProject: Project;
////  public projectStates: ProjectState[];


////  constructor(private projectService: ProjectService, private lookupService: LookupService) { }

////  //constructor(http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
////  //  http.get<Project[]>(baseUrl + 'api/ProjectValues/Projects').subscribe(result => {
////  //    this.projects = result;
////  //  }, error => console.error(error));
////  //}

////  ngOnInit() {
////    console.log("OnInit1")
////    this.getProjects();
////    //this.getProjectStates();
////    //console.log(this.projectStates)
////    console.log("OnInit2")

////  }

////  getProjects(): void {
////    this.projectService.getProjects().subscribe(result => { this.projects = result });
////  }

////  //getProjectStates(): void {
////  //  this.lookupService.getProjectStates().subscribe(result => { this.projectStates = result });
////  //}

////  onSelect(project: Project) {
////    this.selectedProject = project;
////    console.log("single click")
////    console.log(project);
////    console.log(this.projectStates)
////  }

////  //onEdit(project: Project) {
////  //  console.log('dblclick');
////  //  console.log(project);
////  //}
////}



