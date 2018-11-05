import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';

import { Project } from '../../models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private location: Location) { }

  ngOnInit() {
    this.getProjectDetails();
  }

  getProjectDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.deleteProject(id).subscribe(result => { this.project = result });
  }
}



//import { Component, OnInit, Input } from '@angular/core';


//@Component({
//  selector: 'app-project-detail',
//  templateUrl: './project-detail.component.html',
//  styleUrls: ['./project-detail.component.css']
//})
//export class ProjectDetailComponent implements OnInit {
//  @Input() project: Project;

//  constructor() { }

//  ngOnInit() {
//  }

//}





//import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';
//import { ProjectService } from '../../services/project.service';


//import { Project } from '../../models/project';

//@Component({
//  selector: 'app-project-detail',
//  templateUrl: './project-detail.component.html',
//  styleUrls: ['./project-detail.component.css']
//})
//export class ProjectDetailComponent implements OnInit {
//  //@Input() project: Project;
//  project: Project;

//  constructor(private route: ActivatedRoute, private projectService: ProjectService, private location: Location) { }

//  ngOnInit() {
//    this.getTheProject();
//  }

//  getTheProject(): void {
//    const id = +this.route.snapshot.paramMap.get('id');
//    this.projectService.getProject(id).subscribe(result => { this.project = result });
//  }

//}


