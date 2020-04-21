import { Injectable } from "@angular/core";
import { distinctUntilChanged, map } from "rxjs/operators";
import { UIStore } from "./ui-store";

@Injectable({
  providedIn: "root",
})
export class UIQueries {
  constructor(private uiStore: UIStore) {}

  get uiState() {
    return this.uiStore.state$;
  }

  get errors() {
    return this.uiState.pipe(
        distinctUntilChanged(),
        map(s => s.errors)
      );
  }

  get loading() {
    return this.uiState.pipe(
        distinctUntilChanged(),
        map(s => s.loading)
      );
  }

  clearErrors() {
    this.uiStore.clearErrors();
  }
}
