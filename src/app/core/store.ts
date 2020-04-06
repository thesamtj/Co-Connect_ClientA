import { Observable, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';

export class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  select(callBackFunction) {
    return this.state$.pipe(map(callBackFunction));
  }

  // sync
  get state() {
    return this._state$.getValue();
  }

  protected setState(nextState: T): void {
    console.log("--------------------------");
    console.log("Previous State", this.state);

    this._state$.next(nextState);

    console.log("Current State", this.state);
    console.log("--------------------------");
  }
}
