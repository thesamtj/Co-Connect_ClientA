import { Injectable } from '@angular/core';
import { UserStore } from './user-store';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class UserQueries {
    constructor(private userStore: UserStore) { }

    get userState() {
      return this.userStore.state$;
    }
  
    get user() {
      return this.userState.pipe(
        distinctUntilChanged(),
        map(u => u.userCredentials)
      );
    }

    get authenticated() {
      return this.userState.pipe(
        distinctUntilChanged(),
        map(u => u.authenticated)
      );
    }

    get likes() {
      return this.userState.pipe(
        distinctUntilChanged(),
        map(u => u.likes)
      );
    }
  
    get loading() {
      return this.userState.pipe(
        distinctUntilChanged(),
        map(s => s.loading)
      );
    }

    get notifications() {
      return this.userState.pipe(
        distinctUntilChanged(),
        map(s => s.notifications)
      );
    }

}
