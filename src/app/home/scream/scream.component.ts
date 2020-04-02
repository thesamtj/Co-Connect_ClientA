import {
  Component,
  OnInit,
  ChangeDetectionStrategy} from "@angular/core";
import { Scream } from "@core/screams/scream";
import { Observable } from "rxjs";
import { ScreamDataService } from "@core/index";

@Component({
  selector: "app-scream",
  templateUrl: "./scream.component.html",
  styleUrls: ["./scream.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreamComponent implements OnInit {
  screams$: Observable<Scream[]>;

  constructor(private screamDataService: ScreamDataService) {
  }

  ngOnInit() {
    this.screams$ = this.screamDataService.screams
  }

  ngOnDestroy() {}
}
