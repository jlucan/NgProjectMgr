import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { ProjectState } from '../models/project-state';
import { ProjectStatus } from '../models/project-status';
import { ProjectType } from '../models/project-type';
import { PhoneType } from '../models/phone-type';
import { error } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LookupService {

  lookupUrl: string;
  qParam: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private msgService: MessageService) {
    this.lookupUrl = baseUrl + 'api/Lookup/';
  }

  getProjectStates(active?: boolean): Observable<ProjectState[]> {
    //let qStr = ""

    //if (active !== null) 
    //  qStr = '/?active=true';
    //else if (active === true)
    //  qStr = '/?active=true';
    //else
    //  qStr = '/?active=false'

    return this.http.get<ProjectState[]>(`${this.lookupUrl}ProjectStates`); //.pipe(catchError(console.log('getProjectStates')))   //.pipe(catchError(this.handleError('getProjectStates', [])));
  }

  getPhoneTypes(active?: boolean): Observable<PhoneType[]> {
    let qStr = ""

    if (active === true)
      qStr = '/?active=true';
    else if (active === false)
      qStr = '/?active=false'

    return this.http.get<PhoneType[]>(`${this.lookupUrl}PhoneTypes${qStr}`);
  }

  // Add a new phone type
  addPhoneType(phoneType: PhoneType): Observable<PhoneType> {
    const url = `${this.lookupUrl}/PostPhoneType`;

    console.log('About to add phoneType');

    return this.http.post<PhoneType>(url, phoneType, httpOptions)
      .pipe(
        tap(_ => this.log(`Post phoneType success - new id = ${phoneType.id}`)),
        catchError(this.handleError<PhoneType>(`Post phoneType error - ${phoneType.type}`))
      );
  }

  // Update a phone type
  updatePhoneType(phoneType: PhoneType): Observable<PhoneType> {
    const url = `${this.lookupUrl}/PutPhoneType`;

    console.log(`Put phoneType. url = ${url}`)

    return this.http.put<PhoneType>(url, phoneType, httpOptions)
      .pipe(
        tap(_ => this.log(`Put phoneType with id = ${phoneType.id}`)),
        catchError(this.handleError<PhoneType>(`putPhoneType error - phone type id: ${phoneType.id}`))
      );
  }

  deletePhoneType(phoneType: PhoneType | number): Observable<PhoneType> {
    const id = typeof (phoneType) === 'number' ? phoneType : phoneType.id;
    const url = `${this.lookupUrl}/DeletePhoneType/${id}`;

    console.log(`Delete this phoneType. url = ${url}`)

    //return this.http.delete<PhoneType>(url, httpOptions)
    return this.http.delete<PhoneType>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Delete phoneType with id = ${id}`)),
        catchError(this.handleError<PhoneType>(`deletePhoneType - phone type id = ${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {

    let x: T;

    console.error(`Lookup error: ${operation}`);

    return (error: any): Observable<T> => {
      console.log(`the error: ${error.message}`);

    //  // TODO: send the error to remote logging infrastructure
    //  //console.error(error); // log to console instead

    //  // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

    //  // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

    console.log(message);

    this.msgService.add(`PhoneTypeService: ${message}`);
  }


}

