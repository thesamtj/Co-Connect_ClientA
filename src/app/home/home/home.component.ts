import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Scream } from "@core/screams/scream";
import { ScreamDataService } from "@core/index";
import { LogService } from "@core/utils/log.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private screamDataService: ScreamDataService,
    private logService: LogService
  ) {}

  ngOnInit() {
    // this.subscriptions.push(
    //   this.screamDataService.getScreams().subscribe(screams => {
    //     this.logService.log(`No.2; ${this.screams[0].body}`);
    //     this.onDataLoad(screams);
    //   })
    // );

    this.screamDataService.getScreams().subscribe(screams => {
      console.log(`No.2; ${screams[0].body}`);
    });
  }

  // ngOnDestroy() {
  //   if (this.subscriptions) {
  //     this.subscriptions.forEach(s => s.unsubscribe());
  //   }
  // }

  // onDataLoad(screams: Scream[]) {
  //   this.loading = false;
  //   this.screams = screams;
  //   this.logService.log(`No.3; ${this.screams[0].body}`);
  // }
}
