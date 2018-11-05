import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Project } from '../models/project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

  private projectUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private msgService: MessageService) {
    this.projectUrl = baseUrl + 'api/Project';
  }

  getProjects(projState?: number, projStatus?: number): Observable<Project[]> {
    let url: string = `${this.projectUrl}/Projects/`;
    let haveQueryStr: boolean = false;

    let params = new HttpParams();
    if (projState) {
      params = params.set('projstate', String(projState));
    }
    if (projStatus) {
      params = params.set('projstatus', String(projStatus));
    }

    return this.http.get<Project[]>(url, { params })
      .pipe(
        tap(projects => this.log('fetched projects')),
        catchError(this.handleError(`getProjects at: ${url}`, []))
      );
  }

  // GET a project by id. Return undefined if not found
  getProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}/Project/${id}`;

    console.log(`Get project at: ${url}`)

    return this.http.get<Project>(url, httpOptions)
      .pipe(
        tap(projects => this.log(`fetched project with id = ${id}`)),
        catchError(this.handleError<Project>(`getProject : id=${id}`))
      );
  }

  addProject(project: Project): Observable<Project> {
    //const url = this.projectUrl; //`${this.projectUrl}`;
    const url = this.projectUrl;

    console.log('AddProject : ', url, project);

    return this.http.post<Project>(url, "hello", httpOptions)
      .pipe(
        tap((project: Project) => this.log(`added project with id=${project.id}`)),
        catchError(this.handleError<Project>(`addProject with project code = ${project.projectCode}`))
      );
  }

  deleteProject(project: Project | number): Observable<Project> {
    const id = typeof (project) === 'number' ? project : project.id;
    const url = `${this.projectUrl}/DeleteProject/${id}`;

    console.log(`Delete this project. url = ${url}`)

    return this.http.delete<Project>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted project with id = ${id}`)),
        catchError(this.handleError<Project>(`deleteProject : id = ${id}`))
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {

    console.error(operation);

    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

    console.log(message);

    this.msgService.add(`ProjectService: ${message}`);
  }

  //@Injectable()
  //export class CoursesService {

  //constructor(private http: HttpClient) { }

  //findLessons(
  //  courseId: number, filter = '', sortOrder = 'asc',
  //  pageNumber = 0, pageSize = 3): Observable < Lesson[] > {

  //    return this.http.get('/api/lessons', {
  //      params: new HttpParams()
  //        .set('courseId', courseId.toString())
  //        .set('filter', filter)
  //        .set('sortOrder', sortOrder)
  //        .set('pageNumber', pageNumber.toString())
  //        .set('pageSize', pageSize.toString())
  //    }).pipe(
  //      map(res => res["payload"])
  //    );
  //  }
}




