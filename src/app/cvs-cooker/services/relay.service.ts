import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credits } from '../models/credits.model';
import { ReceipeCatalog } from '../models/receipeCatalog.model';
import { SideNav } from '../models/sidenav.model';

const RELAYDATA = '../../assets/data.json';


@Injectable({
  providedIn: 'root'
})
export class RelayService {

  constructor(private http: Http) { }

  getCredits(): Observable<Credits[]> {
    return this.http
    .get(RELAYDATA)
    .pipe(map((response: Response) => response.json()));
  }
  getSideNav(): Observable<SideNav[]> {
    return this.http
    .get(RELAYDATA)
    .pipe(map((response: Response) => response.json()));
  }
  getReceipeCatalog(): Observable<ReceipeCatalog[]> {
    return this.http
    .get(RELAYDATA)
    .pipe(map((response: Response) => response.json()));
  }
  updateReceipCatalog(receipe: ReceipeCatalog): Observable<ReceipeCatalog>{
    return this.http
    .put('${RELAYDATA}/${receipe.id}', receipe)
    .pipe(map((response: Response) => response.json()));
  }

}

