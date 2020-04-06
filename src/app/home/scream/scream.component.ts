import {
  Component,
  OnInit,
  ChangeDetectionStrategy} from "@angular/core";
import { Scream } from "@core/screams/scream";
import { Observable } from "rxjs";
import { ScreamQueries } from '@core/screams/scream-queries';

@Component({
  selector: "app-scream",
  templateUrl: "./scream.component.html",
  styleUrls: ["./scream.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreamComponent implements OnInit {
  loading: boolean;
  screams$: Observable<Scream[]>;

  constructor(private screamQueries: ScreamQueries) {
  }

  ngOnInit() {
    this.screamQueries.screamState.subscribe(s => {
      this.loading = s.loading;
      console.log("value of loading: ", this.loading);
    });
    
    this.screams$ = this.screamQueries.screams;
    console.log("Screams arrived here safely", this.screams$);
  }

  ngOnDestroy() {}
}
