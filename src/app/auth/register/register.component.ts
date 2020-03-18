import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  fullname: string = '';
  email: string = '';
  repeatPassword: string = '';
  error: BehaviorSubject<string>;

  
  constructor(private router: Router, 
    private authService: AuthService, private fb: FormBuilder) {
      console.log('userform', this.userForm);
     }

  ngOnInit() {
    this.error = new BehaviorSubject('');

     // To initialize FormGroup
     this.userForm = this.fb.group({
      fullname: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.compose([Validators.required, this.passwordsMatch])]
    });
  }

  passwordsMatch(control: FormControl) {
    let password = control.root.get('password');
    return password && control.value !== password.value
        ? {
            passwordMatch: true
          }
        : null;
  }

  register() {
    this.setError('');
    if (!this.userForm.valid) {
      return;
    }

    const user = this.userForm.value;
    this.authService
      .register(user)
      .subscribe(s=> this.router.navigate(['/auth']), e => (this.setError(e)));
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }

 
}
