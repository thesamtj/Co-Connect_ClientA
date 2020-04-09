import { Injectable } from "@angular/core";
import { LogService } from "@core/utils/log.service";
import jwtDecode from "jwt-decode";
import { HttpClient } from "@angular/common/http";
import { TokenStorageService } from "@core/auth/token-storage.service";
import { switchMap, catchError } from "rxjs/operators";
import { throwError, of, EMPTY } from "rxjs";
import { UserStore } from "./user-store";
import { User } from "./user";
import { UserCredentials } from "./userCredentials";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl =
    "https://europe-west1-connectapp-5d121.cloudfunctions.net/api/";

  constructor(
    private logService: LogService,
    private http: HttpClient,
    private userStore: UserStore,
    private tokenStorage: TokenStorageService
  ) {}

  register(userToSave: any) {
    // dispatch({ type: LOADING_UI });

    return this.http.post<any>(`${this.apiUrl}signup`, userToSave).pipe(
      switchMap(({ idToken }) => {
        this.tokenStorage.setToken(idToken);
        return this.getUserData();
        // dispatch({ type: CLEAR_ERRORS });
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Registration failed please contact admin");
      })
    );
  }

  login(email: string, password: string) {
    // dispatch({ type: LOADING_UI });

    const loginCredentials = { email, password };
    return this.http.post<any>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(({ idToken }) => {
        this.tokenStorage.setToken(idToken);
        return this.getUserData();
        // dispatch({ type: CLEAR_ERRORS });
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Login failed please contact admin");
      })
    );
  }

  getUserData() {
    this.userStore.loadingUser();

    return this.http.get<any>(`${this.apiUrl}user`).pipe(
      switchMap(user => {
        console.log(`Auth user found`, user);
        this.userStore.setUser(user);
        return of(user);
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Getting user failed please contact admin");
      })
    );
  }

  logout() {
    // remove user from suject
    // remove token from localstorage

    this.tokenStorage.removeToken();
    this.userStore.setUnAuthenticated();
    console.log("user did logout successfull");
  }

  findMe() {
    const token = this.tokenStorage.getToken();
    if (!token) {
      return EMPTY;
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.logout();
        return EMPTY;
      } else {
        this.userStore.setAuthenticated();
        return this.getUserData();
      }
    }
  }

  uploadImage(formData) {
    this.userStore.loadingUser();

    return this.http.post<any>(`${this.apiUrl}user/image`, formData).pipe(
      switchMap(() => {
        return this.getUserData();
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Image upload failed");
      })
    );
  }

  // editUserDetails(userDetails: {
  //   bio: string;
  //   website: string;
  //   location: string;
  // }) {
  //   return this.httpClient.post<any>(`${this.apiUrl}user`, userDetails).pipe(
  //     switchMap(() => {
  //       return this.getUserData();
  //     }),
  //     catchError(err => {
  //       this.logService.log(`Server error occured`, err);
  //       return throwError("Image upload failed");
  //     })
  //   );
  // }

  
}
