import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "@core/users/user.service";
import { UIQueries } from '@core/ui/ui-queries';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private router: Router, private userService: UserService, private uiQueries: UIQueries) {}

  ngOnInit() {
      this.loading$ = this.uiQueries.loading;
      this.error$ = this.uiQueries.errors;
      console.log("Login ui state loading: ", this.loading$);
   
  }

  login() {
    // this.setError("");
    this.userService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate([""]);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  
}
