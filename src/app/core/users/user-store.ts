import { Injectable } from "@angular/core";
import { Store } from "@core/store";
import { UserState, initialState } from "./user-state";

@Injectable({ providedIn: "root" })
export class UserStore extends Store<UserState> {
  constructor() {
    super(initialState);
  }

  setUser(userToSet) {
    console.log("[User] set Users");

    const newState = {
      authenticated: true,
      loading: false,
      ...userToSet
    };

    this.setState(newState);
  }

    setAuthenticated() {
      console.log("[User] set Authenticated");

      const newState = {
        ...this.state,
        authenticated: true
      };

      this.setState(newState);
    }

    setUnAuthenticated() {
        console.log("[User] set UnAuthenticated");
        this.setState(initialState);
      }

    loadingUser() {
      console.log("[User] loading");

      const newState = {
        ...this.state,
        loading: true
      };

      this.setState(newState);
    }

}
