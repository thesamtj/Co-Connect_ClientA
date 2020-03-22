import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ScreamDataService } from "@core/index";
import { LogService } from "@core/utils/log.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(private screamDataService: ScreamDataService) {}

  ngOnInit() {
    this.screamDataService.getScreams().subscribe(screams => {
      console.log(`No.2; ${screams[0].body}`);
    });
  }

  // ngOnDestroy() {
  //   if (this.subscriptions) {
  //     this.subscriptions.forEach(s => s.unsubscribe());
  //   }
  // }
}
