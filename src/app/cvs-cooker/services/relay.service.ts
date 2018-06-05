import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credits } from '../models/credits.model';

const CREDITDATA = '../../assets/data.json';


@Injectable({
  providedIn: 'root'
})
export class RelayService {

  constructor(private http: Http) { }

  getCredits(): Observable<Credits[]> {
    return this.http
    .get(CREDITDATA)
    .pipe(map((response: Response) => response.json()));
  }

}

