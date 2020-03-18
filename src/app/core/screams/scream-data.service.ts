import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Scream } from './scream';

@Injectable({
  providedIn: 'root'
})
export class ScreamDataService {

  constructor(private http: HttpClient) { }

  getAllScreams(): Observable<Scream[]> {
    return this.http.get('Screams.json').pipe(delay(2000)) as Observable<Scream[]>;
  }

}
