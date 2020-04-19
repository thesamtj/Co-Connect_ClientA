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

  likeScream(scream) {
    console.log("[UserLike] loading");

    const newState = {
      ...this.state,
      likes: [
        ...this.state.likes,
        {
          userHandle: this.state.userCredentials.handle,
          screamId: scream.screamId
        }
      ]
    };

    this.setState(newState);
  }

  unlikeScream(scream) {
    console.log("[UserUnlike] loading");

    const newState = {
        ...this.state,
        likes: this.state.likes.filter(
          like => like.screamId !== scream.screamId
        )
    };

    this.setState(newState);
  }

  markNotificationsRead() {
    console.log("[Notifications] set to read");

    this.state.notifications.forEach(not => (not.read = true));
    const newState = {
      ...this.state 
    };
    
    this.setState(newState);
  }

}
