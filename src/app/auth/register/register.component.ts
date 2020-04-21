import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "@core/users/user.service";
import { UIQueries } from '@core/ui/ui-queries';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  handle: string = "";
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private userService: UserService,
    private uiQueries: UIQueries,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loading$ = this.uiQueries.loading;
      this.error$ = this.uiQueries.errors;
      console.log("Registration ui state loading: ", this.loading$);
    
    // To initialize FormGroup
    this.userForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
      confirmPassword: [
        null,
        Validators.compose([Validators.required, this.passwordsMatch]),
      ],
      handle: [null, Validators.required],
    });
  }

  passwordsMatch(control: FormControl) {
    let password = control.root.get("password");
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  register() {
    // this.setError("");

    if (!this.userForm.valid) {
      return;
    }

    const user = this.userForm.value;
    
    this.userService.register(user).subscribe(
      () => {
        this.router.navigate([""]);
      },
      (e) => {
        console.log(e);
      }
    );
  }

}
