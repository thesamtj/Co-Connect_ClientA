import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ScreamService } from "@core/screams/scream.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    private screamService: ScreamService  ) {}

  ngOnInit() {
    this.screamService.getScreams().subscribe(screams => {
      console.log(`No.2; ${screams[0].body}`);
    });
  }

  // ngOnDestroy() {
  //   if (this.subscriptions) {
  //     this.subscriptions.forEach(s => s.unsubscribe());
  //   }
  // }
}
