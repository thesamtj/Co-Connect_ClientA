import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Scream } from "@core/screams/scream";
import { ScreamQueries } from "@core/screams/scream-queries";

@Component({
  selector: "app-screams-markup",
  templateUrl: "./screams-markup.component.html",
  styleUrls: ["./screams-markup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreamsMarkupComponent implements OnInit {
  loading: boolean;
  screams$: Observable<Scream[]>;

  constructor(
    private screamQueries: ScreamQueries
  ) {}

  ngOnInit() {
    this.screams$ = this.screamQueries.screams;
    console.log("Markup Screams arrived here safely", this.screams$);

    this.screamQueries.screamState.subscribe((s) => {
      this.loading = s.loading;
      console.log("Markup Scream value of loading: ", this.loading);
    });
  }
}
