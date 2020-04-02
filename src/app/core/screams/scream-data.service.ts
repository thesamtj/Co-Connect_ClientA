import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError, ReplaySubject } from "rxjs";
import { Scream } from "./scream";
import { LogService } from "@core/utils/log.service";
import { switchMap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ScreamDataService {
  screams$ = new ReplaySubject<Scream[]>();
  private apiUrl =
    "https://europe-west1-connectapp-5d121.cloudfunctions.net/api/";

  constructor(private http: HttpClient, private logService: LogService) {}

  getScreams(): Observable<Scream[]> {
    return this.http.get<Scream[]>(`${this.apiUrl}screams`).pipe(
      switchMap(screams => {
        console.log(`screams loaded successfully`, screams);
        this.setScream(screams);
        return of(screams);
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  get screams() {
    return this.screams$.asObservable();
  }

  private setScream(scream) {
    this.screams$.next(scream);
  }

  // Like a scream
  likeScream(screamId) {
    return this.http.get<Scream>(`${this.apiUrl}scream/${screamId}/like`).pipe(
      switchMap((scream: Scream) => {
        console.log(`scream like loaded successfully`, scream);
        this.screams.subscribe(screams => {
          let index = screams.findIndex(
            scream => scream.screamId === scream.screamId
          );
          screams[index] = scream;
        });
        return of(scream);
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }
  // Unlike a scream
  unlikeScream(screamId) {
    return this.http.get<Scream>(`${this.apiUrl}scream/${screamId}/unlike`).pipe(
      switchMap((scream: Scream) => {
        console.log(`scream like loaded successfully`, scream);
        this.screams.subscribe(screams => {
          let index = screams.findIndex(
            scream => scream.screamId === scream.screamId
          );
          screams[index] = scream;
        });
        return of(scream);
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

}
