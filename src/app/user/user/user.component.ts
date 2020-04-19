import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ScreamService } from '@core/screams/scream.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCredentials } from '@core/users/userCredentials';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  handle: string;
  user$: Observable<UserCredentials>;

  constructor(
    private screamService: ScreamService,
    private route: ActivatedRoute  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.handle) {
        this.handle = params.handle;
        this.screamService.getUserData(params.handle).subscribe((user) => {
          this.user$ = user;
          console.log(`Static1 User; ${user.handle}`);
        },
        (e) => {
          this.user$ = e;
          console.log(`Static User; ${e}`);
        });
      }
    });

    
  }

}
