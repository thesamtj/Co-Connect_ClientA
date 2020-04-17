import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserCredentials } from '@core/users/userCredentials';

@Component({
  selector: 'app-profile-markup',
  templateUrl: './profile-markup.component.html',
  styleUrls: ['./profile-markup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMarkupComponent implements OnInit {
  @Input()
  user: UserCredentials;

  constructor() { }

  ngOnInit() {
  }

}
