import { Injectable } from "@angular/core";
import { of, throwError, EMPTY, BehaviorSubject } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import jwtDecode from "jwt-decode";
import { User } from "../users/user";
import { HttpClient } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";
import { LogService } from "../utils/log.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);
  private apiUrl =
    "https://europe-west1-connectapp-5d121.cloudfunctions.net/api/";

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private logService: LogService
  ) {}

  register(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}signup`, userToSave).pipe(
      switchMap(({ idToken }) => {
        this.tokenStorage.setToken(idToken);
        return this.getUserData();
      }),
      catchError(err => {
        this.logService.log(`Server error occured`, err);
        return throwError("Registration failed please contact admin");
      })
    );
  }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    return this.httpClient
      .post<any>(`${this.apiUrl}login`, loginCredentials)
      .pipe(
        switchMap(({ idToken }) => {
          this.tokenStorage.setToken(idToken);
          return this.getUserData();
        }),
        catchError(err => {
          this.logService.log(`Server error occured`, err);
          return throwError("Login failed please contact admin");
        })
      );
  }

  getUserData() {
    return this.httpClient.get<any>(`${this.apiUrl}user`).pipe(
      switchMap(user => {
        console.log(`Auth user found`, user);
        this.setUser(user);
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
    this.setUser(null);
    console.log("user did logout successfull");
  }

  get user() {
    return this.user$.asObservable();
  }

  private setUser(user) {
    this.user$.next(user);
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
        return this.getUserData();
      }
    }
  }

  uploadImage(formData) {
    return this.httpClient
      .post<any>(`${this.apiUrl}user/image`, formData)
      .pipe(
        switchMap(() => {
          return this.getUserData();
        }),
        catchError(err => {
          this.logService.log(`Server error occured`, err);
          return throwError("Image upload failed");
        })
      );
  }

  editUserDetails(userDetails: { bio: string; website: string; location: string; }) {
    return this.httpClient
      .post<any>(`${this.apiUrl}user`, userDetails)
      .pipe(
        switchMap(() => {
          return this.getUserData();
        }),
        catchError(err => {
          this.logService.log(`Server error occured`, err);
          return throwError("Image upload failed");
        })
      );
  }

  likeScream(scream) {
    this.user.subscribe(user => {
      const likeScream = {
        userHandle: user.userCredentials.handle,
        screamId: scream.screamId
      };
      const updatedUser = user;
      updatedUser.likes.push(likeScream);
      console.log('The like updatedUser', updatedUser)
      this.setUser(updatedUser);
      console.log('user successfully updated with likes', updatedUser);
    })
  }

  unlikeScream(scream) {
    this.user.subscribe(user => {
      const updatedUser = user;
      updatedUser.likes.filter(
        like => like.screamId !== scream.screamId
      );
      this.setUser(updatedUser);
      console.log('user successfully updated with unlikes', updatedUser)
    })
  }

}
