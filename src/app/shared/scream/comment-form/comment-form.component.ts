import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreamService } from '@core/screams/scream.service';
import { UIQueries } from '@core/ui/ui-queries';
import { UserQueries } from '@core/users/user-queries';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
  @Input()
  screamId: string;
  body: string;
  authenticated$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private screamService: ScreamService, private uiQueries: UIQueries, private userQueries: UserQueries) { }

  ngOnInit() {
    this.error$ = this.uiQueries.errors;
    this.authenticated$ = this.userQueries.authenticated;
  }

  submitComment() {
    // this.setError("");
    this.screamService.submitComment(this.screamId, { body: this.body }).subscribe(
      (s) => {
        console.log(s);
      },
      e => {
        console.log(e);
      }
    );
  }

  
}
