import { Injectable } from '@angular/core';
import { ScreamStore } from './scream-store';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreamQueries {
  constructor(private screamStore: ScreamStore) { }

  get screamState() {
    return this.screamStore.state$;
  }

  get screams() {
    return this.screamState.pipe(
      distinctUntilChanged(),
      map(s => s.screams)
    );
  }

  get scream() {
    return this.screamState.pipe(
      distinctUntilChanged(),
      map(s => s.scream)
    );
  }

  get loading() {
    return this.screamState.pipe(
      distinctUntilChanged(),
      map(s => s.loading)
    );
  }

  
}
