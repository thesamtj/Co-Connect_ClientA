import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { User } from "../../core/users/user";
import { AuthService } from "../../core/auth/auth.service";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {
  user$: Observable<User>;
  userSubcription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user;
    this.userSubcription = this.authService.findMe().subscribe(user => {
      if (user === true) {
        this.user$ = user;
      } else {
        this.router.navigate(["/auth"]);
      }
    });
    console.log(`App user details  ${this.user$}`);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    if (this.userSubcription) {
      this.userSubcription.unsubscribe();
    }
  }
}