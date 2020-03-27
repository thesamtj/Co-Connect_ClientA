import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading = false;
  error: BehaviorSubject<string>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.error = new BehaviorSubject("");
  }

  login() {
    this.setError("");
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      s => {
        this.router.navigate([""]);
        this.loading = false;
      },
      e => {
        this.setError(e);
        this.loading = false;
      }
    );
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }
}
