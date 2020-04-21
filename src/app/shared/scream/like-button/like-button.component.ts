import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { UserQueries } from "@core/users/user-queries";
import { ScreamService } from "@core/screams/scream.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
  styleUrls: ["./like-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeButtonComponent implements OnInit {
  @Input()
  screamId: string;
  likes$: Observable<any[]>;
  authenticated$: Observable<boolean>;

  constructor(
    private screamService: ScreamService,
    private userQueries: UserQueries
  ) {}

  ngOnInit() {
    this.likes$ = this.userQueries.likes;
    this.authenticated$ = this.userQueries.authenticated;
  }

  likedScream() {
    if (
      this.likes$ &&
      this.likes$.subscribe((likes) =>
        likes.find((like) => like.screamId === this.screamId)
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  likeScream() {
    this.screamService.likeScream(this.screamId).subscribe(
      (s) => {
        console.log(s);
      },
      (e) => console.log(e)
    );
  }
  unlikeScream() {
    this.screamService.unlikeScream(this.screamId).subscribe(
      (s) => {
        console.log(s);
      },
      (e) => console.log(e)
    );
  }
}
