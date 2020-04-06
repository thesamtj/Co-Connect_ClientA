import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { UserService } from "@core/users/user.service";
import { UserQueries } from '@core/users/user-queries';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean;
  error: BehaviorSubject<string>;

  constructor(private router: Router, private userService: UserService, private userQueries: UserQueries) {}

  ngOnInit() {
    this.error = new BehaviorSubject("");
    this.userQueries.userState.subscribe(s => {
      this.loading = s.loading;
      console.log("login user state loading: ", this.loading);
    });
  }

  login() {
    this.setError("");
    this.loading = true;
    this.userService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate([""]);
      },
      e => {
        this.setError(e);
      }
    );
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }
}
