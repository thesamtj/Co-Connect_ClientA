import { Injectable } from "@angular/core";
import { Store } from "@core/store";
import { UIState, initialState } from "./ui-state";

@Injectable({ providedIn: "root" })
export class UIStore extends Store<UIState> {
  constructor() {
    super(initialState);
  }

  setErrors(errorToSet) {
    console.log("[Error] set errors");

    const newState = {
      ...this.state,
      loading: false,
      errors: errorToSet,
    };

    this.setState(newState);
  }

  clearErrors() {
    console.log("[Error] clear errors");

    const newState = {
      ...this.state,
      loading: false,
      errors: null,
    };

    this.setState(newState);
  }

  loadingUI() {
    console.log("[UI] set loading true");

    const newState = {
      ...this.state,
      loading: true,
    };

    this.setState(newState);
  }

  stopLoadingUI() {
    console.log("[UI] set loading false");

    const newState = {
      ...this.state,
      loading: false,
    };

    this.setState(newState);
  }
}
