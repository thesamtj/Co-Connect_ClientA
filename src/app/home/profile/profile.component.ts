import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@core/users/user';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.user;
  }

}
