import { Injectable } from "@angular/core";
import { LogService } from "@core/utils/log.service";
import { ScreamStore } from "./scream-store";
import { Scream } from "./scream";
import { switchMap, catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserStore } from "@core/users/user-store";
import { UIStore } from '@core/ui/ui-store';

@Injectable({
  providedIn: "root"
})
export class ScreamService {
  private apiUrl =
    "https://europe-west1-connectapp-5d121.cloudfunctions.net/api/";

  constructor(
    private logService: LogService,
    private screamStore: ScreamStore,
    private userStore: UserStore,
    private uiStore: UIStore,
    private http: HttpClient
  ) {}

   // Post a scream
  postScream(screamBody) {
    this.uiStore.loadingUI();
    
    return this.http.post(`${this.apiUrl}scream`, screamBody).pipe(
      switchMap(scream => {
        this.screamStore.postScream(scream);
        console.log(`scream posted successfully`, scream);
        this.uiStore.clearErrors();
        return of(scream);
      }),
      catchError(err => {
        this.uiStore.setErrors(err);
        this.logService.log(`Server error occurred`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  // get screams
  getScreams() {
    this.screamStore.loadingData();

    return this.http.get(`${this.apiUrl}screams`).pipe(
      switchMap(screams => {
        this.screamStore.setScreams(screams);
        console.log(`screams loaded successfully`, screams);
        return of(screams);
      }),
      catchError(err => {
        this.screamStore.setScreams([]);
        this.logService.log(`Server error occurred`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  // get a scream
  getScream(screamId) {
    this.uiStore.loadingUI();

    return this.http.get(`${this.apiUrl}scream/${screamId}`).pipe(
      switchMap(scream => {
        this.screamStore.setScream(scream);
        console.log(`Scream loaded successfully`, scream);
        this.uiStore.stopLoadingUI();
        return of(scream);
      }),
      catchError(err => {
        this.logService.log(`Server error occurred`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  // Like a scream
  likeScream(screamId) {
    return this.http.get<Scream>(`${this.apiUrl}scream/${screamId}/like`).pipe(
      switchMap(scream => {
        this.screamStore.likeScream(scream);
        this.userStore.likeScream(scream);
        console.log(`scream like loaded successfully`, scream);
        return of(scream);
      }),
      catchError(err => {
        this.logService.log(`Server error occurred`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }
  // Unlike a scream
  unlikeScream(screamId) {
    return this.http
      .get<Scream>(`${this.apiUrl}scream/${screamId}/unlike`)
      .pipe(
        switchMap(scream => {
          this.screamStore.unlikeScream(scream);
          this.userStore.unlikeScream(scream);
          console.log(`scream like loaded successfully`, scream);
          return of(scream);
        }),
        catchError(err => {
          this.logService.log(`Server error occurred`, err);
          return throwError("Scream failed please contact admin");
        })
      );
  }

  // Delete a scream
  deleteScream(screamId) {
    return this.http
      .delete(`${this.apiUrl}scream/${screamId}`)
      .pipe(
        switchMap(() => {
          this.screamStore.deleteScream(screamId);
          console.log(`scream deleted successfully`);
          return of("successfully deleted");
        }),
        catchError(err => {
          this.logService.log(`Server error occurred`, err);
          return throwError("Scream failed please contact admin");
        })
      );
  }

  // // Submit a comment
  submitComment(screamId, commentData) {
    return this.http.post(`${this.apiUrl}scream/${screamId}/comment`, commentData).pipe(
      switchMap(comment => {
        this.screamStore.submitComment(comment);
        console.log(`Comment made successfully`, comment);
        this.uiStore.clearErrors();
        return of(comment);
      }),
      catchError(err => {
        this.uiStore.setErrors(err);
        this.logService.log(`Server error occurred`, err);
        return throwError("Scream failed please contact admin");
      })
    );
  }

  // get single user
  getUserData(userHandle) {
    this.screamStore.loadingData();

    return this.http.get<any>(`${this.apiUrl}user/${userHandle}`).pipe(
      switchMap(({user, screams}) => {
        this.screamStore.setScreams(screams);
        console.log(`screams loaded successfully`, screams);
        return of(user);
      }),
      catchError(err => {
        this.screamStore.setScreams(null);
        this.logService.log(`Server error occurred`, err);
        return throwError(null);
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
