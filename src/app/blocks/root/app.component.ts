import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { UserService } from "@core/users/user.service";
import { UserQueries } from "@core/users/user-queries";
import { UserCredentials } from '@core/users/userCredentials';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {
  userCredentials$: Observable<UserCredentials>;
  userSubcription: Subscription;

  constructor(
    private userService: UserService,
    private userQueries: UserQueries,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userCredentials$ = this.userQueries.user;
    this.userSubcription = this.userService.findMe().subscribe(user => {
      if (user === true) {
        this.userCredentials$ = user.userCredentials;
      } else {
        this.router.navigate(["/auth"]);
      }
    });
    console.log(`App user details  ${this.userCredentials$}`);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
  }
}
