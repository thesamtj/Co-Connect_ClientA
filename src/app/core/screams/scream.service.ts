import { Injectable } from "@angular/core";
import { LogService } from "@core/utils/log.service";
import { ScreamStore } from "./scream-store";
import { Scream } from "./scream";
import { switchMap, catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ScreamService {
  private apiUrl =
    "https://europe-west1-connectapp-5d121.cloudfunctions.net/api/";

  constructor(
    private logService: LogService,
    private screamStore: ScreamStore,
    private http: HttpClient
  ) {}

  getScreams() {
    this.screamStore.loadingData();

    return this.http.get(`${this.apiUrl}screams`).pipe(
      switchMap(screams => {
        this.screamStore.setScreams(screams);
        console.log(`screams loaded successfully`, screams);
        return of(screams);
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  // updateScream(screamToUpdate: Scream) {
  //   screamToUpdate = {
  //     ...screamToUpdate,
  //     itemTotal: screamToUpdate.price * screamToUpdate.quantity
  //   };

  //   this.screamStore.updateScream(screamToUpdate);

  //   return of(screamToUpdate);
  // }

  // removeScream(screamToRemove: Scream) {
  //   this.screamStore.removeCartItem(screamToRemove);

  //   return of(screamToRemove);
  // }

  // clearScream() {
  //   this.screamStore.clearScream();
  // }
}
