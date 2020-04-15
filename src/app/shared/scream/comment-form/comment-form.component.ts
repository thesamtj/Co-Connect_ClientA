import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScreamService } from '@core/screams/scream.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input()
  screamId: string;
  body: string;
  authenticated: boolean;
  error: BehaviorSubject<string>;

  constructor(private screamService: ScreamService) { }

  ngOnInit() {
    this.error = new BehaviorSubject("");
  }

  submitComment() {
    this.setError("");
    this.screamService.submitComment(this.screamId, { body: this.body }).subscribe(
      (s) => {
        console.log(s);
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
